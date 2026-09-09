import { createServer, Server } from 'http';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { fetchWithTimeout, readTimeoutEnv } from './http';

/**
 * The deadline exists because Node's fetch has none: an interface switch drops in-flight sockets
 * without an RST and TCP then waits forever. It must also keep the process alive while it waits —
 * `AbortSignal.timeout()` does not (its timer is unref'd), which is how runs exited 0 mid-way.
 */
let silent: Server;
let answering: Server;
let silentUrl: string;
let answeringUrl: string;

beforeAll(async () => {
	silent = createServer(() => {
		/* accepts the connection, never answers */
	});
	answering = createServer((_req, res) => res.end('ok'));
	await Promise.all([
		new Promise<void>((r) => silent.listen(0, '127.0.0.1', r)),
		new Promise<void>((r) => answering.listen(0, '127.0.0.1', r)),
	]);
	silentUrl = `http://127.0.0.1:${(silent.address() as { port: number }).port}/`;
	answeringUrl = `http://127.0.0.1:${(answering.address() as { port: number }).port}/`;
});

afterAll(async () => {
	silent.closeAllConnections?.();
	await Promise.all([new Promise((r) => silent.close(r)), new Promise((r) => answering.close(r))]);
});

describe('fetchWithTimeout', () => {
	it('rejects a request that never answers, instead of hanging forever', async () => {
		const started = Date.now();

		await expect(fetchWithTimeout(silentUrl, {}, 300)).rejects.toThrow();

		expect(Date.now() - started).toBeLessThan(3000);
	});

	it('leaves a normal request untouched', async () => {
		const res = await fetchWithTimeout(answeringUrl, {}, 5000);

		expect(res.ok).toBe(true);
		expect(await res.text()).toBe('ok');
	});

	it('clears its timer once the response arrives', async () => {
		// A deadline left pending holds the event loop open for its full duration after every single
		// request. Asserting the response alone proved nothing — that version passed with the
		// `clearTimeout` deleted — so this watches the call itself.
		const cleared = vi.spyOn(globalThis, 'clearTimeout');
		try {
			const res = await fetchWithTimeout(answeringUrl, {}, 60_000);
			await res.text();

			expect(cleared).toHaveBeenCalled();
		} finally {
			cleared.mockRestore();
		}
	});
});

describe('readTimeoutEnv', () => {
	const KEY = 'FETCH_TIMEOUT_MS';

	afterEach(() => {
		delete process.env[KEY];
	});

	it('takes the override when it is a positive number', () => {
		process.env[KEY] = '600000';

		expect(readTimeoutEnv(10_000)).toBe(600_000);
	});

	it('falls back when unset or blank', () => {
		expect(readTimeoutEnv(10_000)).toBe(10_000);

		process.env[KEY] = '   ';
		expect(readTimeoutEnv(10_000)).toBe(10_000);
	});

	it('rejects a value that is not a usable duration', () => {
		// `Number(env) || fallback` — the shape used by the FIGMA_* knobs — would also land on the
		// fallback here, but silently, and would equally ignore a deliberate 0. This warns instead.
		for (const bad of ['nope', '-1', '0', 'Infinity']) {
			process.env[KEY] = bad;
			expect(readTimeoutEnv(10_000)).toBe(10_000);
		}
	});
});
