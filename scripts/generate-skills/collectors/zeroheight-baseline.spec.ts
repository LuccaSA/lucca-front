import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const recordFailure = vi.fn();

vi.mock('./fetch-failures', async () => {
	const actual = await vi.importActual<typeof import('./fetch-failures')>('./fetch-failures');
	return { ...actual, recordFailure: (...args: unknown[]) => recordFailure(...args) };
});

const fetchWithTimeout = vi.fn();
vi.mock('./http', () => ({ fetchWithTimeout: (...args: unknown[]) => fetchWithTimeout(...args), DEFAULT_FETCH_TIMEOUT_MS: 10_000 }));

let baselineDir: string;
let realDir: string;

const PAGE = 'zh-baseline-spec-page';
const BASELINE = '# Titre\n\n## Section\n\nDu contenu déjà publié.\n';

beforeEach(() => {
	vi.resetModules();
	recordFailure.mockClear();
	fetchWithTimeout.mockReset();
	realDir = path.join(__dirname, '..', 'baselines', 'zeroheight', 'latest');
	fs.mkdirSync(realDir, { recursive: true });
	baselineDir = path.join(realDir, `${PAGE}.md`);
	fs.writeFileSync(baselineDir, BASELINE);
});

afterEach(() => {
	fs.rmSync(baselineDir, { force: true });
});

/**
 * The shrink guard refuses to drop content on a doubtful signal, but a timeout took another path
 * entirely and the page was simply deleted — `activity-feed.design.md` (111 lines) disappeared
 * from the 22.0 on one 10 s deadline, and made two identical runs produce different output.
 */
describe('fetchZeroHeightPageGuarded — transient failure', () => {
	it('serves the baseline and records the failure for replay', async () => {
		fetchWithTimeout.mockRejectedValue(Object.assign(new Error('socket hang up'), { name: 'FetchError' }));
		const { fetchZeroHeightPageGuarded } = await import('./zeroheight-fetch');

		const data = await fetchZeroHeightPageGuarded(PAGE, null, { scope: 'component', slug: 'x', version: '22.0.0' });

		expect(data?.raw).toBe(BASELINE);
		expect(recordFailure).toHaveBeenCalledTimes(1);
		// The 404 branch also keeps the baseline; only this one defers to the replay.
		expect(recordFailure.mock.calls[0][0].reason).toContain('rejeu avec --retry-failed');
	}, 30_000);

	it('still throws when there is nothing to fall back on', async () => {
		fs.rmSync(baselineDir, { force: true });
		fetchWithTimeout.mockRejectedValue(Object.assign(new Error('socket hang up'), { name: 'FetchError' }));
		const { fetchZeroHeightPageGuarded } = await import('./zeroheight-fetch');

		await expect(fetchZeroHeightPageGuarded(PAGE, null, { scope: 'component', slug: 'x', version: '22.0.0' })).rejects.toThrow();
	}, 30_000);
});
