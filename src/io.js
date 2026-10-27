import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

export async function hashFile(path) {
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest('hex');
}

export async function readCache(path) {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch {
    return null;
  }
}

export async function atomicWrite(path, value) {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.${process.pid}.tmp`;
  try {
    await writeFile(temporary, value);
    await rename(temporary, path);
  } finally {
    await rm(temporary, { force: true });
  }
}

export async function writeJson(path, value) {
  await atomicWrite(path, `${JSON.stringify(value, null, 2)}\n`);
}
