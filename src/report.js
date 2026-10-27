function cell(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('|', '\\|').replaceAll('`', '&#96;').replace(/[\r\n]/g, ' ');
}

function platformSummary(project, platform) {
  if (project.error) return '⚠️';
  const rows = project.signatures.filter(row => row.platform === platform);
  if (rows.some(row => row.status === 'MISSING')) return '❌';
  return rows.length && rows.every(row => row.status === 'UNIQUE') ? '✅' : '⚠️';
}

// Escape report values before inserting them into SVG text.
function xml(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

// Use the report timestamp so cached scans produce identical images.
export function svgOverview(report) {
  const width = 900;
  const top = 168;
  const height = top + 42 + report.projects.length * 48 + 44;
  const manifests = report.game.source === 'local' ? 'unverified (local binaries)'
    : Object.entries(report.game.manifests).map(([depot, manifest]) => `${depot}: ${manifest}`).join(', ');
  const icons = {
    '✅': '<rect width="18" height="18" rx="3" fill="#1a7f37"/><path d="m4 9 3 3 7-7" fill="none" stroke="white" stroke-width="2"/>',
    '❌': '<circle cx="9" cy="9" r="9" fill="#cf222e"/><path d="m6 6 6 6m0-6-6 6" stroke="white" stroke-width="2"/>',
    '⚠️': '<path d="M9 0 19 18H-1Z" fill="#9a6700"/><path d="M9 5v6m0 2v2" stroke="white" stroke-width="2"/>',
  };
  const lines = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description">`,
    '<title id="title">CS2 Bot Signatures Tracker</title>',
    `<desc id="description">${xml(`Last updated: ${report.generated_at}. Scan: ${report.mode}; ${report.status}. ${report.projects.map(project => `${project.id}: Linux ${platformSummary(project, 'linux')}, Windows ${platformSummary(project, 'windows')}`).join('. ')}. Counts: unique / total signatures.`)}</desc>`,
    '<style>text{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;font-size:14px;fill:#1f2328}.meta{font-size:13px;fill:#59636e}.heading{font-weight:600}.link{fill:#0969da}</style>',
    `<rect width="${width}" height="${height}" fill="#ffffff"/>`,
    '<text x="24" y="43" style="font-size:26px;font-weight:600">CS2 Bot Signatures Tracker</text>',
    '<path d="M24 59H876" stroke="#d1d9e0"/>',
    `<text class="meta" x="24" y="85">Last updated: ${xml(report.generated_at)}</text>`,
    `<text class="meta" x="24" y="110">Scan: ${xml(report.mode)}; ${xml(report.status)}</text>`,
    `<text class="meta" x="24" y="135">Manifests: ${xml(manifests || 'unavailable')}</text>`,
    `<rect x="24" y="${top}" width="852" height="42" fill="#f6f8fa"/>`,
    `<text class="heading" x="44" y="${top + 26}">Linux</text>`,
    `<text class="heading" x="204" y="${top + 26}">Windows</text>`,
    `<text class="heading" x="364" y="${top + 26}">Project</text>`,
    `<text class="heading" x="674" y="${top + 26}">Signatures</text>`,
  ];
  for (const [index, project] of report.projects.entries()) {
    const y = top + 42 + index * 48;
    if (index % 2) lines.push(`<rect x="24" y="${y}" width="852" height="48" fill="#f6f8fa"/>`);
    for (const [column, platform] of ['linux', 'windows'].entries()) {
      const x = 44 + column * 160;
      const rows = project.signatures.filter(row => row.platform === platform);
      const count = project.error || !rows.length ? '-' : `${rows.filter(row => row.status === 'UNIQUE').length} / ${rows.length}`;
      lines.push(`<g transform="translate(${x} ${y + 15})">${icons[platformSummary(project, platform)]}</g>`,
        `<text x="${x + 30}" y="${y + 30}">${count}</text>`);
    }
    lines.push(`<text class="link" x="364" y="${y + 30}">${xml(project.id)}</text>`,
      `<text class="link" x="674" y="${y + 30}">View signatures</text>`);
  }
  const bottom = top + 42 + report.projects.length * 48;
  lines.push(`<path d="M24 ${top}H876V${bottom}H24ZM24 ${top + 42}H876M184 ${top}V${bottom}M344 ${top}V${bottom}M654 ${top}V${bottom}" fill="none" stroke="#d1d9e0"/>`,
    `<text class="meta" x="24" y="${bottom + 27}">Counts: unique / total signatures</text>`, '</svg>', '');
  return lines.join('\n');
}

// Legacy reports contain truncated matches.
function signatureStatus(row) {
  if (!row || row.status === 'UNSUPPORTED') return '-';
  if (row.status === 'UNIQUE') return '✅';
  if (row.status === 'MISSING') return '❌';
  if (row.status === 'AMBIGUOUS') return `⚠️(${row.match_count ?? `≥${row.matches.length}`})`;
  return `⚠️ ${row.status}`;
}

function signatureGroups(project) {
  const groups = new Map();
  for (const row of project.signatures) {
    if (!groups.has(row.name)) groups.set(row.name, { name: row.name });
    groups.get(row.name)[row.platform] = row;
  }
  return [...groups.values()];
}

export function markdownIndex(report, docsPath = '.github/docs') {
  const manifests = report.game.source === 'local' ? 'unverified (local binaries)'
    : Object.entries(report.game.manifests).map(([depot, manifest]) => `${depot}: ${manifest}`).join(', ');
  const lines = [
    '# CS2 Bot Signatures Tracker', '',
    `- Last updated: ${report.generated_at}`,
    `- Scan: ${report.mode}; ${report.status}`,
    `- Manifests: ${manifests || 'unavailable'}`,
    '', '| Linux | Windows | Project | Signatures |', '|---|---|---|---|',
  ];
  for (const project of report.projects) {
    lines.push(`| ${cell(platformSummary(project, 'linux'))} | ${cell(platformSummary(project, 'windows'))} | [${cell(project.id)}](https://github.com/${project.repo}) | [View signatures](${docsPath}/${project.id}.md) |`);
  }
  for (const project of report.projects) {
    const broken = signatureGroups(project).filter(group => [group.linux, group.windows].some(row => ['MISSING', 'AMBIGUOUS'].includes(row?.status)));
    if (!broken.length) continue;
    lines.push('', `## ${cell(project.id)} broken signatures`, '', '| Linux | Windows | Function |', '|---|---|---|');
    for (const group of broken) lines.push(`| ${signatureStatus(group.linux)} | ${signatureStatus(group.windows)} | ${cell(group.name)} |`);
  }
  const errors = [...new Set([
    ...report.projects.flatMap(project => [project.error, ...project.signatures.map(row => row.error)]),
    ...report.binaries.map(binary => binary.error),
  ].filter(Boolean))];
  if (errors.length) lines.push('', '## Scan errors', '', ...errors.map(error => `- ${cell(error)}`));
  lines.push('');
  return lines.join('\n');
}

export function markdownProject(report, project) {
  const url = `https://github.com/${project.repo}/blob/${encodeURIComponent(project.branch)}/${project.path.split('/').map(encodeURIComponent).join('/')}`;
  const lines = [`# ${cell(project.id)}`, '', `- Last updated: ${report.generated_at}`, `- Repository: https://github.com/${project.repo}`, `- Gamedata: [${url}](${url})`];
  const errors = [...new Set([project.error, ...project.signatures.map(row => row.error)].filter(Boolean))];
  if (errors.length) lines.push('', '## Scan errors', '', ...errors.map(error => `- ${cell(error)}`));
  if (project.signatures.length) lines.push('', '## Signatures');
  for (const group of signatureGroups(project)) {
    lines.push('', `### ${cell(group.name)}`, '', '| Status | Platform | Library | IDA-Style |', '|---|---|---|---|');
    for (const platform of ['linux', 'windows']) {
      const row = group[platform];
      if (!row) continue;
      lines.push(`| ${signatureStatus(row)} | ${platform === 'linux' ? 'Linux' : 'Windows'} | ${cell(row.library)} | ${row.pattern ? `\`${cell(row.pattern)}\`` : '-'} |`);
    }
  }
  lines.push('');
  return lines.join('\n');
}
