import { parsePattern } from './scan.js';

export const PLATFORMS = ['windows', 'linux'];

export function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function parseGamedata(text) {
  const data = JSON.parse(text.replace(/^\uFEFF/, ''));
  if (!isObject(data)) throw new Error('Gamedata must be an object');
  const signatures = [];
  for (const [name, entry] of Object.entries(data)) {
    if (!isObject(entry)) throw new Error(`${name}: entry must be an object`);
    if ('signatures' in entry) {
      const value = entry.signatures;
      if (!isObject(value) || typeof value.library !== 'string' || !value.library) {
        throw new Error(`${name}: signatures.library is required`);
      }
      const patterns = {};
      for (const platform of PLATFORMS) {
        const pattern = value[platform];
        if (pattern === undefined || pattern === null || pattern === '') {
          patterns[platform] = null;
          continue;
        }
        if (typeof pattern !== 'string') throw new Error(`${name}/${platform}: signature must be a string`);
        parsePattern(pattern);
        patterns[platform] = pattern.trim().replace(/\s+/g, ' ');
      }
      if (!Object.values(patterns).some(Boolean)) throw new Error(`${name}: no platform signature`);
      signatures.push({ name, library: value.library, patterns });
    }
  }
  if (signatures.length === 0) throw new Error('Gamedata has no signature entries');
  return { signatures };
}
