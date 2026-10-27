import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchSource, validateSources } from './sources.js';
import { prepareBinaries, validateBinaries } from './binaries.js';
import { PLATFORMS } from './gamedata.js';
import { scanFile } from './scan.js';
import { atomicWrite, readCache, sha256, writeJson } from './io.js';
import { markdownIndex, markdownProject } from './report.js';

export const PROJECT_ROOT = fileURLToPath(new URL('../', import.meta.url));

function projectStatus(project) {
  if (project.error || project.signatures.some(row => row.status === 'ERROR')) return 'ERROR';
  if (project.signatures.some(row => ['MISSING', 'AMBIGUOUS'].includes(row.status))) return 'FAIL';
  if (project.signatures.some(row => row.status === 'UNSUPPORTED')) return 'PARTIAL';
  return 'PASS';
}

async function writeReport(root, report) {
  const reportdir = join(root, 'reports');
  await writeJson(join(reportdir, 'latest.json'), report);
  await atomicWrite(join(reportdir, 'README.md'), markdownIndex(report, '../.github/docs'));
  await atomicWrite(join(root, 'README.md'), markdownIndex(report));
  for (const project of report.projects) {
    await atomicWrite(join(root, '.github', 'docs', `${project.id}.md`), markdownProject(report, project));
  }
}

export async function runTracker(options = {}, dependencies = {}) {
  const root = options.root ?? PROJECT_ROOT;
  const workdir = join(root, 'workdir');
  const reportdir = join(root, 'reports');
  const configdir = options.configdir ?? join(root, 'config');
  const sources = validateSources(JSON.parse(await readFile(join(configdir, 'sources.json'), 'utf8')));
  const config = validateBinaries(JSON.parse(await readFile(join(configdir, 'binaries.json'), 'utf8')));
  const projects = [];
  for (const source of sources) {
    try {
      const fetched = await fetchSource(source, workdir, dependencies);
      const signatures = [];
      for (const entry of fetched.signatures) {
        for (const platform of PLATFORMS) {
          const pattern = entry.patterns[platform];
          signatures.push({ name: entry.name, library: entry.library, platform, pattern, status: pattern ? 'NOT_SCANNED' : 'UNSUPPORTED', matches: [] });
        }
      }
      projects.push({ ...fetched, signatures });
    } catch (error) {
      projects.push({ ...source, error: error.message, signatures: [] });
    }
  }
  const prepared = await prepareBinaries(config, workdir, { ...dependencies, binaryDir: options.binaryDir, downloader: options.downloader });
  const input_key = projects.every(project => project.sha256) && prepared.binaries.every(binary => binary.status === 'READY')
    ? sha256(JSON.stringify({
      game: prepared.game,
      sources: projects.map(({ id, repo, branch, path, sha256 }) => ({ id, repo, branch, path, sha256 })),
      binaries: prepared.binaries.map(({ path, ...binary }) => binary),
    })) : null;
  const previous = await readCache(join(reportdir, 'latest.json'));
  if (input_key && previous?.input_key === input_key && previous.format_version === 3
      && ['PASS', 'FAIL', 'PARTIAL'].includes(previous.status) && Array.isArray(previous.projects)
      && previous.projects.length === projects.length
      && previous.projects.every((project, index) => Array.isArray(project.signatures) && project.signatures.length === projects[index].signatures.length)) {
    await writeReport(root, previous);
    return { ...previous, skipped: true };
  }
  const pending = new Map();
  for (const project of projects) {
    for (const row of project.signatures) {
      if (row.status === 'UNSUPPORTED') continue;
      const key = `${row.platform}/${row.library}`;
      if (!pending.has(key)) pending.set(key, []);
      pending.get(key).push(row);
    }
  }
  for (const [key, rows] of pending) {
    const binary = prepared.binaries.find(item => `${item.platform}/${item.library}` === key);
    try {
      if (!binary || binary.status !== 'READY') throw new Error(binary?.error ?? `No binary configuration for ${key}`);
      if (!input_key) throw new Error('Scan skipped: incomplete inputs');
      const results = await scanFile(binary.path, binary.platform, rows.map((row, key) => ({ key, pattern: row.pattern })));
      const checked_at = new Date().toISOString();
      for (const { key, ...result } of results) Object.assign(rows[key], result, { checked_at });
    } catch (error) {
      if (input_key && binary?.status === 'READY') Object.assign(binary, { status: 'ERROR', error: error.message });
      for (const row of rows) Object.assign(row, { status: 'ERROR', error: error.message });
    }
  }
  for (const project of projects) project.status = projectStatus(project);
  const statuses = projects.map(project => project.status);
  const status = statuses.includes('ERROR') || prepared.binaries.some(binary => binary.status === 'ERROR') ? 'ERROR' : statuses.includes('FAIL') ? 'FAIL' : statuses.includes('PARTIAL') ? 'PARTIAL' : 'PASS';
  const report = {
    format_version: 3, generated_at: new Date().toISOString(),
    mode: options.binaryDir ? 'local' : 'steam', status, game: prepared.game,
    input_key: status === 'ERROR' ? null : input_key,
    binaries: prepared.binaries.map(({ path, ...binary }) => binary), projects,
  };
  await writeReport(root, report);
  return { ...report, skipped: false };
}
