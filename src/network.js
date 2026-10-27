import { setTimeout as sleep } from 'node:timers/promises';

export async function requestText(url, options = {}) {
  const fetchImpl = options.fetchImpl ?? fetch;
  const headers = { 'User-Agent': 'cs2-bot-signatures/0.1.0' };
  const delay = options.delay ?? sleep;
  for (let attempt = 0; attempt < 3; attempt++) {
    let response;
    try {
      response = await fetchImpl(url, { headers, signal: AbortSignal.timeout(45_000) });
    } catch {
      if (attempt === 2) throw new Error(`Network request failed: ${url}`);
      await delay(1000 * (attempt + 1));
      continue;
    }
    if (response.ok) return await response.text();
    if ((response.status === 429 || response.status >= 500) && attempt < 2) {
      await response.body?.cancel();
      const retry = Number(response.headers.get('retry-after'));
      await delay(Number.isFinite(retry) && retry > 0 ? Math.min(retry * 1000, 15_000) : 1000 * (attempt + 1));
      continue;
    }
    await response.body?.cancel();
    throw Object.assign(new Error(`HTTP ${response.status}: ${url}`), { status: response.status });
  }
}

