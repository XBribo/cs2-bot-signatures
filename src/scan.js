import { readFile } from 'node:fs/promises';

// 00 and 2A are literal bytes.
export function parsePattern(text) {
  if (typeof text !== 'string' || !text.trim()) throw new Error('Empty signature');
  const tokens = text.trim().split(/\s+/);
  const bytes = Buffer.alloc(tokens.length);
  const fixed = [];
  let start = 0;
  let length = 0;
  let anchorStart = 0;
  let anchorLength = 0;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token === '?' || token === '??') {
      length = 0;
    } else {
      if (!/^[a-f\d]{2}$/i.test(token)) throw new Error(`Invalid signature token: ${token}`);
      bytes[i] = Number.parseInt(token, 16);
      fixed.push(i);
      if (length === 0) start = i;
      length++;
      if (length > anchorLength) {
        anchorStart = start;
        anchorLength = length;
      }
    }
  }
  if (fixed.length === 0) throw new Error('All-wildcard signature is not allowed');
  return { bytes, fixed, anchorStart, anchor: bytes.subarray(anchorStart, anchorStart + anchorLength) };
}

function requireRange(buffer, offset, size) {
  if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(size) || offset < 0 || size < 0 || offset > buffer.length - size) {
    throw new Error('Executable image contains an out-of-file range');
  }
}

function safe64(buffer, offset) {
  const value = buffer.readBigUInt64LE(offset);
  if (value > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error('ELF value exceeds safe integer range');
  return Number(value);
}

export function executableRanges(buffer, platform) {
  const ranges = [];
  if (platform === 'windows') {
    requireRange(buffer, 0, 64);
    if (buffer.toString('ascii', 0, 2) !== 'MZ') throw new Error('Expected a PE image');
    const pe = buffer.readUInt32LE(60);
    requireRange(buffer, pe, 24);
    if (buffer.readUInt32LE(pe) !== 0x4550 || buffer.readUInt16LE(pe + 4) !== 0x8664) throw new Error('Expected an x86-64 PE image');
    const count = buffer.readUInt16LE(pe + 6);
    const optionalSize = buffer.readUInt16LE(pe + 20);
    requireRange(buffer, pe + 24, optionalSize);
    if (optionalSize < 2 || buffer.readUInt16LE(pe + 24) !== 0x20b) throw new Error('Expected PE32+ optional header');
    const table = pe + 24 + optionalSize;
    requireRange(buffer, table, count * 40);
    for (let i = 0; i < count; i++) {
      const section = table + i * 40;
      if (!(buffer.readUInt32LE(section + 36) & 0x20000000)) continue;
      const rawSize = buffer.readUInt32LE(section + 16);
      const virtualSize = buffer.readUInt32LE(section + 8);
      const size = Math.min(rawSize, virtualSize || rawSize);
      const offset = buffer.readUInt32LE(section + 20);
      requireRange(buffer, offset, size);
      if (size) ranges.push({ offset, size, address: buffer.readUInt32LE(section + 12), address_kind: 'RVA' });
    }
  } else if (platform === 'linux') {
    requireRange(buffer, 0, 64);
    if (!buffer.subarray(0, 4).equals(Buffer.from([0x7f, 0x45, 0x4c, 0x46])) || buffer[4] !== 2 || buffer[5] !== 1 || buffer.readUInt16LE(18) !== 62) {
      throw new Error('Expected a little-endian x86-64 ELF image');
    }
    const table = safe64(buffer, 32);
    const entrySize = buffer.readUInt16LE(54);
    const count = buffer.readUInt16LE(56);
    if (entrySize < 56 || count === 0xffff) throw new Error('Unsupported ELF program header table');
    requireRange(buffer, table, count * entrySize);
    for (let i = 0; i < count; i++) {
      const header = table + i * entrySize;
      if (buffer.readUInt32LE(header) !== 1 || !(buffer.readUInt32LE(header + 4) & 1)) continue;
      const offset = safe64(buffer, header + 8);
      const size = safe64(buffer, header + 32);
      if (size > safe64(buffer, header + 40)) throw new Error('ELF filesz exceeds memsz');
      requireRange(buffer, offset, size);
      const address = safe64(buffer, header + 16);
      if (!Number.isSafeInteger(address + size)) throw new Error('ELF mapped address exceeds safe integer range');
      if (size) ranges.push({ offset, size, address, address_kind: 'ELF_VADDR' });
    }
  } else {
    throw new Error(`Unsupported platform: ${platform}`);
  }
  if (ranges.length === 0) throw new Error('Image has no file-backed executable ranges');
  return ranges;
}

export function findMatches(buffer, ranges, pattern) {
  const matches = [];
  // Ranges may overlap; count each address once.
  const seen = new Set();
  for (const range of ranges) {
    requireRange(buffer, range.offset, range.size);
    const limit = range.offset + range.size - pattern.bytes.length;
    let from = range.offset + pattern.anchorStart;
    while (from <= limit + pattern.anchorStart) {
      const hit = buffer.indexOf(pattern.anchor, from);
      if (hit === -1 || hit > limit + pattern.anchorStart) break;
      const start = hit - pattern.anchorStart;
      let valid = true;
      for (const i of pattern.fixed) {
        if (buffer[start + i] !== pattern.bytes[i]) { valid = false; break; }
      }
      if (valid) {
        const address = range.address + start - range.offset;
        const identity = `${range.address_kind}:${address}`;
        if (!seen.has(identity)) {
          seen.add(identity);
          matches.push({ file_offset: `0x${start.toString(16)}`, address: `0x${address.toString(16)}`, address_kind: range.address_kind });
        }
      }
      from = hit + 1;
    }
  }
  return matches;
}

export async function scanFile(path, platform, signatures) {
  const buffer = await readFile(path);
  const ranges = executableRanges(buffer, platform);
  const results = [];
  for (const signature of signatures) {
    const matches = findMatches(buffer, ranges, parsePattern(signature.pattern));
    results.push({ key: signature.key, status: matches.length === 0 ? 'MISSING' : matches.length === 1 ? 'UNIQUE' : 'AMBIGUOUS', match_count: matches.length, matches });
  }
  return results;
}
