import { spawn } from 'node:child_process';
import { basename, join } from 'node:path';
import { atomicWrite, hashFile, readCache, writeJson } from './io.js';
import { isObject, PLATFORMS } from './gamedata.js';

export function validateBinaries(config) {
  if (!Array.isArray(config) || config.length === 0) throw new Error('binaries.json must be a nonempty array');
  const keys = new Set();
  for (const entry of config) {
    const key = `${entry?.platform}/${entry?.library}`;
    if (!isObject(entry) || !PLATFORMS.includes(entry.platform) || !/^[A-Za-z0-9_-]+$/.test(entry.library ?? '') || keys.has(key)) {
      throw new Error('Invalid or duplicate binary platform/library');
    }
    keys.add(key);
    if (typeof entry.depot !== 'string' || !/^\d+$/.test(entry.depot)) throw new Error(`${key}: depot must be a digit string`);
    if (typeof entry.file !== 'string' || entry.file.includes('\\') || entry.file.split('/').some(part => !part || part === '.' || part === '..' || part.includes(':'))) {
      throw new Error(`${key}: invalid depot file path`);
    }
  }
  return config;
}

export async function fetchGame(config, workdir, options = {}) {
  const executable = options.downloader ?? process.env.DEPOT_DOWNLOADER ?? (process.platform === 'win32' ? 'DepotDownloader.exe' : 'DepotDownloader');
  const manifests = {};
  for (const depot of new Set(config.map(entry => entry.depot))) {
    console.log(`Checking depot ${depot}...`);
    const output = await (options.runDownloader ?? runDownloader)(executable, [
      '-app', '730', '-depot', depot, '-branch', 'public', '-manifest-only',
      '-dir', join(workdir, 'manifests', depot),
    ]);
    const match = output.match(/^Manifest\s+(\d+)\s+\(/m);
    if (!match) throw new Error(`Depot ${depot}: no manifest ID in DepotDownloader output`);
    manifests[depot] = match[1];
    console.log(`Depot ${depot}: manifest ${match[1]}`);
  }
  return { source: 'steam', app_id: '730', build_id: null, manifests };
}

export function runDownloader(executable, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(executable, args, { stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true, timeout: args.includes('-manifest-only') ? 3 * 60_000 : 15 * 60_000 });
    let output = '';
    for (const stream of [child.stdout, child.stderr]) {
      stream.setEncoding('utf8');
      stream.on('data', chunk => { output += chunk; });
    }
    child.once('error', () => reject(new Error('Cannot start DepotDownloader; install it or set --depot-downloader to its executable')));
    child.once('close', (code, signal) => {
      if (code === 0) resolve(output);
      else reject(new Error(`DepotDownloader failed (${signal ?? code})`));
    });
  });
}

async function localBinaries(config, binaryDir) {
  const binaries = [];
  for (const entry of config) {
    const path = join(binaryDir, entry.platform, basename(entry.file));
    try {
      binaries.push({ ...entry, path, sha256: await hashFile(path), status: 'READY', manifest: null });
    } catch {
      binaries.push({ ...entry, path, status: 'ERROR', error: `Cannot read local module: ${path}` });
    }
  }
  return { game: { source: 'local', build_id: null, manifests: {} }, binaries };
}

export async function prepareBinaries(config, workdir, options = {}) {
  if (options.binaryDir) return await localBinaries(config, options.binaryDir);
  let game;
  try {
    game = await fetchGame(config, workdir, options);
  } catch (error) {
    return { game: { source: 'steam', build_id: null, manifests: {} }, binaries: config.map(entry => ({ ...entry, status: 'ERROR', error: error.message })) };
  }
  const binaries = [];
  for (const depot of new Set(config.map(entry => entry.depot))) {
    const entries = config.filter(entry => entry.depot === depot);
    const manifest = game.manifests[depot];
    const directory = join(workdir, 'binaries', depot, manifest);
    try {
      const cachePath = join(directory, 'tracker-files.json');
      const previous = await readCache(cachePath);
      const hashes = {};
      let valid = true;
      for (const entry of entries) {
        try {
          hashes[entry.file] = await hashFile(join(directory, entry.file));
          if (hashes[entry.file] !== previous?.[entry.file]) valid = false;
        } catch {
          valid = false;
        }
      }
      if (!valid) {
        const filelist = join(directory, 'tracker-filelist.txt');
        await atomicWrite(filelist, `${entries.map(entry => entry.file).join('\n')}\n`);
        const executable = options.downloader ?? process.env.DEPOT_DOWNLOADER ?? (process.platform === 'win32' ? 'DepotDownloader.exe' : 'DepotDownloader');
        console.log(`Downloading depot ${depot} (${manifest})...`);
        await (options.runDownloader ?? runDownloader)(executable, [
          '-app', '730', '-depot', depot, '-manifest', manifest,
          '-filelist', filelist, '-dir', directory, '-validate',
        ]);
        for (const entry of entries) hashes[entry.file] = await hashFile(join(directory, entry.file));
        await writeJson(cachePath, hashes);
      }
      for (const entry of entries) {
        const path = join(directory, entry.file);
        binaries.push({ ...entry, path, sha256: hashes[entry.file], manifest, status: 'READY' });
      }
    } catch (error) {
      binaries.push(...entries.map(entry => ({ ...entry, manifest, status: 'ERROR', error: error.message })));
    }
  }
  return { game, binaries };
}
