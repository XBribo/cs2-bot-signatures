function cell(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('|', '\\|').replaceAll('`', '&#96;').replace(/[\r\n]/g, ' ');
}

function platformSummary(project, platform) {
  if (project.error) return '⚠️';
  const rows = project.signatures.filter(row => row.platform === platform);
  if (rows.some(row => row.status === 'MISSING')) return '❌';
  return rows.length && rows.every(row => row.status === 'UNIQUE') ? '✅' : '⚠️';
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
