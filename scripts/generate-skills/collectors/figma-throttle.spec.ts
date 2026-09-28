import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

/**
 * The Figma throttle is what stopped full generations dead: a race let `active` drift above
 * MAX_CONCURRENT, and since a queued `acquire()` holds no timer, the stuck workers kept nothing
 * alive — the event loop emptied and Node exited 0 at 20-27 of 126 components, reporting success.
 */
let throttle: {
	acquire: () => Promise<void>;
	release: () => void;
	state: () => { active: number; waiting: number };
};

beforeAll(async () => {
	// Read at import time. '1' and not '0': the source does `Number(env) || 200`, so a zero
	// falls back to the 200 ms production default and would make these tests take 10 s.
	process.env['FIGMA_MIN_INTERVAL_MS'] = '1';
	process.env['FIGMA_MAX_CONCURRENT'] = '1';
	({ __throttle: throttle } = await import('./figma-connect'));
});

beforeEach(() => {
	expect(throttle.state()).toEqual({ active: 0, waiting: 0 });
});

describe('Figma throttle', () => {
	it('hands a released slot to the waiter instead of freeing it for a newcomer', async () => {
		await throttle.acquire();
		expect(throttle.state()).toEqual({ active: 1, waiting: 0 });

		const queued = throttle.acquire();
		expect(throttle.state()).toEqual({ active: 1, waiting: 1 });

		throttle.release(); // the slot goes to `queued`, it is never free

		// A newcomer asking right now must queue. The old code decremented first, so this call
		// took the fast path while the woken waiter also incremented — `active` drifted to 2.
		const newcomer = throttle.acquire();
		expect(throttle.state()).toEqual({ active: 1, waiting: 1 });

		await queued;
		throttle.release();
		await newcomer;
		throttle.release();

		expect(throttle.state()).toEqual({ active: 0, waiting: 0 });
	});

	it('never lets the counter drift over many contended cycles', async () => {
		const order: number[] = [];

		await Promise.all(
			Array.from({ length: 30 }, (_, i) =>
				(async () => {
					await throttle.acquire();
					order.push(i);
					throttle.release();
				})(),
			),
		);

		// A single drifted slot starves every later waiter — this would hang, not fail.
		expect(order).toHaveLength(30);
		expect(throttle.state()).toEqual({ active: 0, waiting: 0 });
	});

	it('serializes: a second holder only starts once the first releases', async () => {
		await throttle.acquire();
		let secondStarted = false;
		const second = throttle.acquire().then(() => {
			secondStarted = true;
		});

		await Promise.resolve();
		expect(secondStarted).toBe(false);

		throttle.release();
		await second;
		expect(secondStarted).toBe(true);

		throttle.release();
	});
});
