import { join } from 'node:path';
import { atomicWrite, sha256 } from './io.js';
import { requestText } from './network.js';
import { parsePattern } from './scan.js';

const FILES = [
  { plugin: 'BotAI', path: 'WindowsPatchDefinitions.cs', kind: 'patches', platform: 'windows' },
  { plugin: 'BotAI', path: 'LinuxPatchDefinitions.cs', kind: 'patches', platform: 'linux' },
  { plugin: 'BotState', path: 'BotFovSignatures.cs', kind: 'constants' },
  { plugin: 'BotState', path: 'BotState.Bomb.cs', kind: 'constants' },
  { plugin: 'BotState', path: 'BotState.Flashbang.cs', kind: 'constants' },
  { plugin: 'BotState', path: 'BotState.FovPatches.cs', kind: 'fov' },
  { plugin: 'BotAimImprover', path: 'BotAimImprover.cs', kind: 'aim' },
  { plugin: 'BotRandomizer', path: 'BotRandomizer.cs', kind: 'functions' },
  { plugin: 'NadeSystem', path: 'NadeSystem.cs', kind: 'functions' },
];
const LITERAL = '@?"([^"\\\\]*)"';

// Handle the known upstream layouts without executing C# or reading patch bytes.
export function parseCsharp(file, text) {
  const code = text.replace(/@"(?:""|[^"])*"|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])'|\/\/[^\r\n]*|\/\*[\s\S]*?\*\//g,
    token => token.startsWith('//') || token.startsWith('/*') ? ' ' : token);
  const rows = [];
  const add = (name, platform, pattern) => {
    parsePattern(pattern);
    rows.push({ name: `${file.plugin}.${name}`, platform, pattern: pattern.trim().replace(/\s+/g, ' ') });
  };
  const literal = expression => {
    const match = expression.trim().match(new RegExp(`^${LITERAL}$`));
    if (!match) throw new Error(`${file.path}: unsupported signature expression`);
    return match[1];
  };
  const complete = (expected, actual) => {
    if (!expected || expected !== actual) throw new Error(`${file.path}: signature layout changed (${actual}/${expected})`);
  };
  if (file.kind === 'patches') {
    const entries = [...code.matchAll(/\[\s*"([^"]+)"\s*\]\s*=\s*\(/g)];
    const matches = [...code.matchAll(new RegExp(`\\[\\s*"([^"]+)"\\s*\\]\\s*=\\s*\\(\\s*signature\\s*:\\s*${LITERAL}\\s*,`, 'g'))];
    complete(entries.length, matches.length);
    for (const [, name, pattern] of matches) add(name, file.platform, pattern);
  } else if (file.kind === 'constants') {
    for (const [, symbol, expression] of code.matchAll(/\bconst\s+string\s+(\w*(?:Windows|Linux)\w*)\s*=\s*([^;]+);/g)) {
      const platform = symbol.includes('Windows') ? 'windows' : 'linux';
      const name = symbol.replace(/Windows|Linux/g, '').replace(/Signature$/, '');
      add(file.path === 'BotFovSignatures.cs' ? `FOV.${name}` : name, platform, literal(expression));
    }
    complete([...code.matchAll(/\b(?:const|readonly)\s+string\s+\w*(?:Windows|Linux)\w*\s*=/g)].length, rows.length);
  } else if (file.kind === 'fov') {
    let arrays = 0;
    for (const [, symbol, body] of code.matchAll(/\b((?:Linux)?FovPatches)\s*=\s*\[([\s\S]*?)\];/g)) {
      arrays++;
      const matches = [...body.matchAll(new RegExp(`\\bnew\\s*\\(\\s*"([^"]+)"\\s*,\\s*${LITERAL}\\s*,`, 'g'))];
      complete([...body.matchAll(/\bnew\s*\(/g)].length, matches.length);
      for (const [, name, pattern] of matches) add(name, symbol.startsWith('Linux') ? 'linux' : 'windows', pattern);
    }
    complete([...code.matchAll(/\b(?:Linux)?FovPatches\s*=/g)].length, arrays);
  } else if (file.kind === 'aim') {
    for (const [, platform, body] of code.matchAll(/\b(Linux|Windows)Offsets\s*=\s*new\s*\(([\s\S]*?)\);/g)) {
      const signature = body.match(/\bsig\s*:\s*([\s\S]+)$/);
      if (!signature) throw new Error(`${file.path}: signature argument missing`);
      add('PickNewAimSpot', platform.toLowerCase(), literal(signature[1]));
    }
    for (const [, platform, expression] of code.matchAll(/\b(Linux|Windows)Signature\s*=\s*([^;]+);/g)) {
      add('PickNewAimSpot', platform.toLowerCase(), literal(expression));
    }
    complete([...code.matchAll(/\b(?:Linux|Windows)(?:Offsets|Signature)\s*=/g)].length, rows.length);
  } else if (file.kind === 'functions') {
    const matches = [...code.matchAll(new RegExp(`(\\w+)\\s*=\\s*new(?:\\s+MemoryFunction(?:Void|WithReturn)\\s*<[^;{}]+>)?\\s*\\(\\s*RuntimeInformation\\.IsOSPlatform\\(\\s*OSPlatform\\.(Linux|Windows)\\s*\\)\\s*\\?\\s*${LITERAL}\\s*:\\s*${LITERAL}\\s*\\)`, 'g'))];
    const expected = [...code.matchAll(/\bnew\s+MemoryFunction(?:Void|WithReturn)\s*</g)].length
      + [...code.matchAll(/\bMemoryFunction(?:Void|WithReturn)\s*<[^;{}]+>\s+\w+\s*=\s*new\s*\(/g)].length;
    const names = { writer: 'SetOrAddAttributeValueByName', itemViewConstructor: 'CEconItemViewConstructor', destructor: 'CEconItemViewDestructor' };
    for (const [, symbol, first, yes, no] of matches) {
      const name = names[symbol] ?? symbol.replace(/^_/, '');
      add(name, first.toLowerCase(), yes);
      add(name, first === 'Linux' ? 'windows' : 'linux', no);
    }
    let guarded = 0;
    for (const [, platform, body] of code.matchAll(/\bif\s*\(\s*OperatingSystem\.Is(Windows|Linux)\(\)\s*\)\s*\{([^{}]*)\}/g)) {
      for (const [, symbol, pattern] of body.matchAll(new RegExp(`(\\w+)\\s*=\\s*new\\s+MemoryFunction(?:Void|WithReturn)\\s*<[^;{}]+>\\s*\\(\\s*${LITERAL}\\s*\\)`, 'g'))) {
        add(names[symbol] ?? symbol, platform.toLowerCase(), pattern);
        guarded++;
      }
    }
    complete(expected, matches.length + guarded);
  } else {
    throw new Error(`${file.path}: unknown C# layout ${file.kind}`);
  }
  if (!rows.length) throw new Error(`${file.path}: no signatures extracted`);
  return rows;
}

export async function fetchCsharp(source, firstText, workdir, options) {
  const definitions = FILES.filter(file => file.plugin === source.id);
  if (!definitions.length) throw new Error(`${source.id}: no C# source files configured`);
  const signatures = new Map();
  const files = [];
  for (const file of definitions) {
    const url = `https://raw.githubusercontent.com/${source.repo}/${encodeURIComponent(source.branch)}/${file.path}`;
    const text = file.path === source.path ? firstText : await requestText(url, options);
    for (const row of parseCsharp(file, text)) {
      if (!signatures.has(row.name)) signatures.set(row.name, { name: row.name, library: 'server', patterns: {} });
      const entry = signatures.get(row.name);
      if (entry.patterns[row.platform]) throw new Error(`${row.name}/${row.platform}: duplicate signature`);
      entry.patterns[row.platform] = row.pattern;
    }
    await atomicWrite(join(workdir, 'upstream', source.id, file.path), text);
    files.push({ repo: source.repo, branch: source.branch, path: file.path, url, sha256: sha256(text) });
  }
  return { signatures: [...signatures.values()], files, sha256: sha256(JSON.stringify(files)) };
}
