/**
 * Reads files at a git tag, promoting a tag to an on-disk snapshot once that pays off.
 *
 * Profiling a full 21.3 generation: **96 735 `git show` calls**, 98.5 % of a component's wall time
 * in `spawnSync`, for 37 s of actual CPU over 55 minutes. The pipeline was spawn-bound, never
 * CPU-bound. Blocking is the second, subtler cost: `execFileSync` freezes the event loop for the
 * whole child process, which is what made in-flight ZeroHeight fetches hit their deadline — 92 pages
 * deferred on the 2026-09-09 run, on pages answering in under a second.
 *
 * **Why promotion rather than always archiving.** Measured per tag: `git archive` 0.10 s, `tar -x`
 * 0.40 s for `packages/ng` (3.3 MB, 1 152 files) — about 0.5 s — against 29 ms for a single
 * `git show`. Break-even is ~17 reads. Archiving unconditionally made a `--component button` run go
 * from 7.0 s to 23.7 s, because the changelog walk touches ~18 tags and most of them are read only a
 * dozen times each. So each `(tag, pathspec)` starts on `git show` and is snapshotted only after
 * `PROMOTION_THRESHOLD` reads, where the archive has already paid for itself.
 *
 * Reads always have an answer: a tag that fails to archive stays on `git show` for the rest of the
 * run. Degrading to the previous behaviour is always preferred over returning wrong content.
 */

import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const WORKSPACE_ROOT = path.join(__dirname, '..', '..', '..');

/**
 * Reads of one `(tag, pathspec)` before it is snapshotted.
 *
 * Calibrated, not guessed. Raw break-even is ~17 reads (0.5 s of archive against 29 ms per
 * `git show`), but the blob cache upstream already collapses redundancy, so a single-component run
 * sees far fewer reads per tag than the raw call count suggests. Measured on `--component calendar`:
 * 27.8 s at a threshold of 24, 22.2 s at 64, 22.1 s at 128, 21.6 s with promotion off — that is,
 * **promotion earns nothing on one component** and an eager threshold actively costs.
 *
 * Its value appears at full-run scale, where each tag of the changelog walk is read by ~120 packages
 * instead of one. 128 is the value that costs nothing on a small run while still promoting early
 * enough on a large one (128 reads ≈ 3.7 s of `git show` before a 0.5 s archive takes over).
 * Override with `GIT_SNAPSHOT_THRESHOLD`. Validated rather than `Number(env) || 128`, which would
 * swallow a typo silently and could not express a deliberate 0 (promote immediately) — the very
 * shape called out as a mistake in http.ts.
 */
const PROMOTION_THRESHOLD = readThresholdEnv(128);

function readThresholdEnv(fallback: number): number {
	const raw = process.env['GIT_SNAPSHOT_THRESHOLD'];
	if (raw === undefined || raw.trim() === '') return fallback;
	const parsed = Number(raw);
	if (!Number.isInteger(parsed) || parsed < 0) {
		console.warn(`⚠️  GIT_SNAPSHOT_THRESHOLD="${raw}" ignoré (attendu : un entier ≥ 0) — ${fallback} conservé`);
		return fallback;
	}
	return parsed;
}

/** Top-level trees the collectors read from a tag. A path outside them is never snapshotted. */
const PATHSPECS = ['packages/ng', 'packages/scss', 'stories'];

const readCounts = new Map<string, number>();
/** `(tag, pathspec)` → extraction root, or null once archiving has failed for it. */
const roots = new Map<string, string | null>();
let tmpRoot: string | null = null;

function git(args: string[], maxBuffer = 8 * 1024 * 1024): string {
	return execFileSync('git', args, { cwd: WORKSPACE_ROOT, encoding: 'utf-8', maxBuffer, stdio: ['pipe', 'pipe', 'pipe'] });
}

function ensureTmpRoot(): string {
	if (tmpRoot) return tmpRoot;
	tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'lf-skills-tags-'));
	const root = tmpRoot;
	process.on('exit', () => {
		try {
			fs.rmSync(root, { recursive: true, force: true });
		} catch {
			/* best effort — a leftover temp dir is harmless */
		}
	});
	return tmpRoot;
}

/** The top-level tree a repo path belongs to, or null when it is outside the snapshotted set. */
function pathspecOf(filePath: string): string | null {
	return PATHSPECS.find((p) => filePath === p || filePath.startsWith(`${p}/`)) ?? null;
}

/**
 * Extracts one `(tag, pathspec)`, once. Returns null on failure, which pins that pair to `git show`.
 *
 * Only the requested pathspec is archived: the changelog walk reads `packages/ng` at ~18 tags and
 * never their `stories`, so archiving everything would waste 0.4 s per tag. `git archive` also fails
 * **wholesale** on a path absent from the tag, and the layout moved across 21.x — one pathspec per
 * call keeps a partial layout usable.
 */
function snapshotRoot(tag: string, pathspec: string): string | null {
	const key = `${tag}::${pathspec}`;
	if (roots.has(key)) return roots.get(key)!;

	let root: string | null = null;
	try {
		const dir = path.join(ensureTmpRoot(), `${tag}__${pathspec}`.replace(/[^\w.-]/g, '_'));
		fs.mkdirSync(dir, { recursive: true });
		const tarball = `${dir}.tar`;
		git(['archive', '--format=tar', '-o', tarball, tag, '--', pathspec]);
		execFileSync('tar', ['-xf', tarball, '-C', dir], { stdio: ['pipe', 'pipe', 'pipe'] });
		fs.rmSync(tarball, { force: true });
		root = dir;
	} catch {
		root = null;
	}

	roots.set(key, root);
	return root;
}

/** Reads a file as it exists at `tag`, or null when it does not exist there. */
export function readAtTag(tag: string, filePath: string): string | null {
	const pathspec = pathspecOf(filePath);

	if (pathspec) {
		const key = `${tag}::${pathspec}`;
		const seen = (readCounts.get(key) ?? 0) + 1;
		readCounts.set(key, seen);

		if (seen > PROMOTION_THRESHOLD) {
			const root = snapshotRoot(tag, pathspec);
			if (root) {
				const full = path.join(root, filePath);
				// `filePath` comes from parsed re-export targets: keep the read inside the snapshot.
				if (full.startsWith(root + path.sep)) {
					try {
						return fs.readFileSync(full, 'utf-8');
					} catch {
						return null; // absent at this tag — the same answer `git show` would give
					}
				}
			}
		}
	}

	return gitShow(tag, filePath);
}

function gitShow(tag: string, filePath: string): string | null {
	try {
		return git(['show', `${tag}:${filePath}`], 2 * 1024 * 1024);
	} catch {
		return null;
	}
}

/**
 * Immediate subdirectories of a directory at `tag`, bare names. Kept on `git` — the collectors call
 * this a handful of times per run, far below the promotion threshold.
 */
export function listDirsAtTag(tag: string, dirPath: string): string[] {
	try {
		return git(['ls-tree', '--name-only', '-d', tag, `${dirPath.replace(/\/$/, '')}/`])
			.split('\n')
			.filter(Boolean)
			.map((p) => path.basename(p))
			.sort();
	} catch {
		return [];
	}
}

/** Every file under a directory at `tag`, as repo-relative paths. One call per run. */
export function listFilesAtTag(tag: string, dirPath: string): string[] {
	try {
		return git(['ls-tree', '-r', '--name-only', tag, `${dirPath.replace(/\/$/, '')}/`], 50 * 1024 * 1024)
			.split('\n')
			.filter(Boolean)
			.sort();
	} catch {
		return [];
	}
}
