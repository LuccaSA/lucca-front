/**
 * `fetch` with a hard deadline.
 *
 * Node's `fetch` applies no timeout of its own: a connection that stalls without erroring leaves
 * the promise pending forever. That is how a full generation stopped at 20 of 126 components while
 * reporting **exit code 0** — the retry loop in `zeroheight-fetch.ts` only retries a fetch that
 * *rejects*, so one that never settles blocks it for good, and Node exits silently as soon as
 * nothing else keeps the event loop alive. A partial skill published as a success.
 *
 * **Why the deadline is this generous — and why it is not about the network.** `AbortSignal.timeout`
 * measures WALL-CLOCK time, and this pipeline is CPU-bound: TypeScript AST extraction, `vm` story
 * evaluation and prettier all run synchronously, on one thread, with five workers competing for it.
 * While the loop is blocked, an in-flight response cannot run its callback — but the deadline keeps
 * counting. When the loop frees up, the timer wins and a perfectly healthy fetch is aborted.
 *
 * Reproduced: a fetch that takes 564 ms on its own is aborted with `TimeoutError` when the loop is
 * blocked for 8 s behind it. That is the whole explanation for the `ZeroHeight: The operation was
 * aborted due to timeout` lines, and for why every retry expired too — the blocking recurs on each
 * attempt. A first attempt at 30 s (calibrated on an isolated load test: p90 978 ms) cost 18 aborts
 * and 12 lost `.design.md` on a full run, on pages that answer in under a second in isolation.
 *
 * So the deadline must exceed the longest synchronous block, not the slowest request. It exists
 * only to turn an infinite hang into a retryable error; slowness is the collectors' retry/backoff
 * business, and a silent early exit is caught by the guard in index.ts.
 *
 * The signal stays attached to the response body, so a download that stalls mid-stream aborts just
 * like a connection that never opens. Callers therefore keep reading `res.text()` themselves and
 * remain covered.
 */

/**
 * Sized against event-loop blocking, NOT against request latency (~10× the measured p90 of 978 ms).
 *
 * History worth keeping, because two earlier values were wrong for the same reason. It sat at 300 s
 * while the deadline never actually fired, then 60 s once it did — and at 60 s a full run still
 * deferred 92 ZeroHeight pages, on pages answering in under a second. The cause was never the
 * network: `execFileSync` froze the event loop for the duration of each of ~96 700 `git show`
 * subprocesses, so in-flight responses could not run their callbacks while the deadline kept
 * counting.
 *
 * Now that tags are read from an on-disk snapshot (`git-snapshot.ts`), those subprocesses are gone
 * and the loop stays responsive, so the deadline no longer has to absorb them. 10 s is ~10× the
 * measured p90 and only trips on a socket that is genuinely not answering.
 *
 * Overridable via `FETCH_TIMEOUT_MS`, because the right value depends on how much the run blocks the
 * loop. A full generation wants it low (a page is deferred and replayed rather than holding a worker
 * for minutes); a `--retry-failed` pass wants it high, since it handles only a few dozen units and
 * its whole purpose is to get them, not to defer them again. Note the guard shape: a plain
 * `Number(env) || default` would silently ignore a legitimate low value of 0 — the mistake already
 * present on the FIGMA_* knobs in figma-connect.ts.
 */
export const DEFAULT_FETCH_TIMEOUT_MS = readTimeoutEnv(10_000);

export function readTimeoutEnv(fallback: number): number {
	const raw = process.env['FETCH_TIMEOUT_MS'];
	if (raw === undefined || raw.trim() === '') return fallback;
	const parsed = Number(raw);
	if (!Number.isFinite(parsed) || parsed <= 0) {
		console.warn(`⚠️  FETCH_TIMEOUT_MS="${raw}" ignoré (attendu : un nombre de millisecondes > 0) — ${fallback} ms conservé`);
		return fallback;
	}
	return parsed;
}

/**
 * Performs a fetch that is guaranteed to settle. An expired deadline rejects, which every caller
 * here already treats as a retryable network problem.
 *
 * Deliberately NOT `AbortSignal.timeout()`: its timer is **unref'd**, so it does not keep the event
 * loop alive. Measured — a script whose only pending work is `AbortSignal.timeout(3000)` exits after
 * 2 ms and the abort never fires. That defeats the whole purpose here twice over: a request left
 * outstanding stops holding the process open, so the run exits 0 mid-way (five workers were found
 * stuck this way at 77 of 126 components), and the deadline that was supposed to rescue it never
 * runs. A plain `setTimeout` is ref'd and does both jobs.
 *
 * The deadline covers connection and response headers; the caller then reads the body itself. That
 * is the right split here — payloads are tens of kilobytes, and the failure mode this guards
 * against is a socket that never answers at all (an interface switch drops in-flight sockets with
 * no RST, and TCP then waits forever).
 */
export async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = DEFAULT_FETCH_TIMEOUT_MS): Promise<Response> {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(new Error(`fetch deadline of ${timeoutMs} ms exceeded`)), timeoutMs);
	try {
		return await fetch(url, { ...init, signal: controller.signal });
	} finally {
		clearTimeout(timer);
	}
}
