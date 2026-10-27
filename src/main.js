import { parseArgs } from 'node:util';
import { resolve } from 'node:path';
import { appendFile } from 'node:fs/promises';
import { runTracker } from './tracker.js';

async function main() {
  const { values } = parseArgs({ options: {
    help: { type: 'boolean', short: 'h' },
    'binary-dir': { type: 'string' },
    'depot-downloader': { type: 'string' },
  } });
  if (values.help) {
    console.log(`Usage: npm run check -- [options]
  --binary-dir PATH       Use PATH/windows/*.dll and PATH/linux/*.so (build unverified)
  --depot-downloader PATH Installed DepotDownloader executable (otherwise PATH/env)`);
    return;
  }
  const report = await runTracker({
    binaryDir: values['binary-dir'] && resolve(values['binary-dir']),
    downloader: values['depot-downloader'],
  });
  if (process.env.GITHUB_OUTPUT) {
    await appendFile(process.env.GITHUB_OUTPUT, `scanned=${!report.skipped && Boolean(report.input_key)}\ninput_key=${report.input_key ?? ''}\n`);
  }
  if (report.skipped) console.log(`Inputs unchanged; scan skipped. Last scan: ${report.generated_at}`);
  for (const project of report.projects) {
    const counts = {};
    for (const row of project.signatures) counts[row.status] = (counts[row.status] ?? 0) + 1;
    console.log(`${project.id}: ${project.status} ${JSON.stringify(counts)}${project.error ? `; ${project.error}` : ''}`);
  }
  console.log(`Report: ${report.status}; README.md and reports/latest.json`);
  process.exitCode = report.status === 'ERROR' ? 2 : report.status === 'FAIL' ? 1 : 0;
}

try {
  await main();
} catch (error) {
  console.error(`Tracker failed: ${error.message}`);
  process.exitCode = 2;
}
