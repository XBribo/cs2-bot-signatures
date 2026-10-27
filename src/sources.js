import { join } from 'node:path';
import { atomicWrite, sha256 } from './io.js';
import { requestText } from './network.js';
import { isObject, parseGamedata } from './gamedata.js';

export function validateSources(sources) {
  if (!Array.isArray(sources) || sources.length === 0) throw new Error('sources.json must be a nonempty array');
  const ids = new Set();
  for (const source of sources) {
    if (!isObject(source) || !/^[A-Za-z0-9_-]+$/.test(source.id ?? '') || ids.has(source.id)) {
      throw new Error('Source IDs must be unique safe names');
    }
    ids.add(source.id);
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(source.repo ?? '')) throw new Error(`${source.id}: invalid repo`);
    if (typeof source.path !== 'string' || source.path.split('/').some(part => !part || part === '.' || part === '..') || source.path.includes('\\')) {
      throw new Error(`${source.id}: invalid repository path`);
    }
    if (typeof source.branch !== 'string' || !source.branch.trim()) {
      throw new Error(`${source.id}: invalid branch`);
    }
  }
  return sources;
}

export async function fetchSource(source, workdir, options = {}) {
  const file = source.path.split('/').map(encodeURIComponent).join('/');
  const url = `https://raw.githubusercontent.com/${source.repo}/${encodeURIComponent(source.branch)}/${file}`;
  const text = await requestText(url, options);
  const parsed = parseGamedata(text);
  await atomicWrite(join(workdir, 'upstream', source.id, 'gamedata.json'), text);
  return { ...source, url, sha256: sha256(text), ...parsed };
}
