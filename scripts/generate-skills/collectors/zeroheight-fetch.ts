/**
 * ZeroHeight collector — fetches design guidelines via direct .md URL.
 *
 * Replaces the MCP-based approach with a simple HTTP fetch to:
 *   https://prisme.lucca.io/{token}/v/{releaseId}/p/{pagePath}.md
 *
 * The .md content is rich structured markdown with:
 * - Design guidelines (Do/Don't tables, usage rules)
 * - Angular section (selectors, imports, Storybook embeds)
 * - HTML/CSS section
 * - Accessibility rules
 * - Content/wording guidelines
 */

import fs from 'fs';
import path from 'path';
import { ZeroHeightData } from '../types';
import { getZeroHeightUrl } from '../version-config';
import { FetchScope, TransientFetchError, recordFailure, recordWarning } from './fetch-failures';

const MAX_RETRIES = 4;
/**
 * ZeroHeight occasionally serves a valid 200 with **less** content than usual (a section missing,
 * or a near-empty stub) — not an error, so it can't be caught like one. We retry such "thin"
 * responses hoping for the full one, keeping the richest seen. If every attempt is thin we ACCEPT
 * the best (a genuinely small page is legitimate — we never fail on thinness). This catches gross
 * truncation; it cannot detect a single missing section on an otherwise normal-sized page.
 */
const RICH_MIN_CHARS = 200;
const isHtml = (s: string) => s.trimStart().startsWith('<!DOCTYPE') || s.trimStart().startsWith('<html');
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function isRich(data: ZeroHeightData): boolean {
	return data.raw.length >= RICH_MIN_CHARS && Object.keys(data.sections).length >= 1;
}

// ─── Run cache & shrink-guard baseline ───────────────────────────────────────
//
// Two complementary layers around the raw fetch:
//
// • Run cache (memory, scope = one process): a ZH release is keyed by (releaseId, pagePath), so
//   when several patches of the same minor are generated in one run, the page is fetched ONCE and
//   all patches get byte-identical content. Never persists across runs — a later run always
//   re-fetches, so ZH edits within a release are picked up.
//
// • Baseline (disk, COMMITTED — scope = repo): the last-known-good raw markdown per
//   (releaseId, pagePath). It is NEVER used as a source — every run fetches fresh. It is only an
//   oracle: if the fresh content *shrinks* suspiciously (lost H1 sections, or large size drop),
//   we keep the baseline content for output and record a 'shrink' failure for human review.
//   `--accept-shrink` accepts the fresh content and updates the baseline (a deletion can be
//   legitimate, just uncommon). Additions/modifications always pass through silently and refresh
//   the baseline. Committed so the guard does not depend on which machine generated last, and an
//   accepted shrink is accepted for everyone.

const runCache = new Map<string, ZeroHeightData | null>();

/** Minimum size drop (vs baseline) considered suspicious when no section disappeared. */
const SHRINK_RATIO = 0.8;

const BASELINE_DIR = path.join(__dirname, '..', 'baselines', 'zeroheight');

let acceptShrink = false;

/** Set by the CLI when `--accept-shrink` is passed: fresh content always wins and updates baselines. */
export function setAcceptShrink(value: boolean): void {
	acceptShrink = value;
}

function baselineFile(pagePath: string, zhReleaseId: number | null): string {
	// pagePath may contain '/' (e.g. tab paths like "40c515-…/b/95175f") — flatten it.
	const flat = pagePath.replace(/\//g, '__');
	return path.join(BASELINE_DIR, String(zhReleaseId ?? 'latest'), `${flat}.md`);
}

function readBaseline(pagePath: string, zhReleaseId: number | null): string | null {
	try {
		return fs.readFileSync(baselineFile(pagePath, zhReleaseId), 'utf-8');
	} catch {
		return null;
	}
}

function writeBaseline(pagePath: string, zhReleaseId: number | null, raw: string): void {
	const file = baselineFile(pagePath, zhReleaseId);
	fs.mkdirSync(path.dirname(file), { recursive: true });
	fs.writeFileSync(file, raw, 'utf-8');
}

function removeBaseline(pagePath: string, zhReleaseId: number | null): void {
	try {
		fs.rmSync(baselineFile(pagePath, zhReleaseId));
	} catch {
		// already absent
	}
}

/** Returns a human-readable reason if `fresh` is a suspicious regression vs the baseline, else null. */
function shrinkReason(baselineRaw: string, fresh: ZeroHeightData): string | null {
	const baseSections = Object.keys(parseSections(baselineRaw));
	const missing = baseSections.filter((s) => !(s in fresh.sections));
	if (missing.length > 0) {
		return `section(s) disparue(s) : ${missing.join(', ')}`;
	}
	if (fresh.raw.length < baselineRaw.length * SHRINK_RATIO) {
		const pct = Math.round((1 - fresh.raw.length / baselineRaw.length) * 100);
		return `contenu réduit de ${baselineRaw.length} à ${fresh.raw.length} caractères (−${pct} %)`;
	}
	return null;
}

/** Caller context used to record a replayable 'shrink' failure. */
export interface ZhFetchContext {
	scope: FetchScope;
	/** Replay slug: component slug, "category/page" for documentation, tool slug. */
	slug: string;
	/** Bare version, e.g. "21.2.4". */
	version: string;
}

/**
 * Guarded ZH fetch — the entry point all collectors should use.
 *
 * Wraps `fetchZeroHeightPage` with the run cache and the baseline shrink-guard (see above).
 * Transient failures still throw `TransientFetchError` (caller records them as before).
 */
export async function fetchZeroHeightPageGuarded(
	pagePath: string,
	zhReleaseId: number | null,
	ctx: ZhFetchContext,
): Promise<ZeroHeightData | null> {
	const cacheKey = `${zhReleaseId ?? 'latest'}:${pagePath}`;
	if (runCache.has(cacheKey)) return runCache.get(cacheKey)!;

	const fresh = await fetchZeroHeightPage(pagePath, zhReleaseId);
	const baselineRaw = readBaseline(pagePath, zhReleaseId);

	let result: ZeroHeightData | null;
	if (fresh === null) {
		// 404 while a baseline exists for this release: a deletion is possible but uncommon —
		// keep the baseline and ask for confirmation.
		if (baselineRaw !== null && !acceptShrink) {
			recordFailure({
				source: 'zeroheight',
				scope: ctx.scope,
				slug: ctx.slug,
				version: ctx.version,
				ref: pagePath,
				status: 'shrink',
				reason: 'page 404 alors qu’une baseline existe pour cette release — baseline conservée (--accept-shrink pour entériner)',
			});
			result = { raw: baselineRaw, sections: parseSections(baselineRaw) };
		} else {
			if (baselineRaw !== null) removeBaseline(pagePath, zhReleaseId);
			result = null;
		}
	} else {
		const reason = baselineRaw !== null ? shrinkReason(baselineRaw, fresh) : null;
		if (reason && !acceptShrink) {
			recordFailure({
				source: 'zeroheight',
				scope: ctx.scope,
				slug: ctx.slug,
				version: ctx.version,
				ref: pagePath,
				status: 'shrink',
				reason: `${reason} — baseline conservée (--accept-shrink pour entériner)`,
			});
			result = { raw: baselineRaw!, sections: parseSections(baselineRaw!) };
		} else {
			writeBaseline(pagePath, zhReleaseId, fresh.raw);
			result = fresh;
		}
	}

	runCache.set(cacheKey, result);
	return result;
}

/**
 * Fetches a ZeroHeight page as markdown and parses it into sections.
 *
 * Retries transient problems (network, 5xx, HTML-instead-of-markdown, empty body) with backoff.
 * On 404 → null (page legitimately absent). On transient failure after all retries →
 * throws `TransientFetchError` so the caller records it for reporting / replay.
 *
 * @param pagePath — e.g. "098404-button"
 * @param zhReleaseId — ZeroHeight release ID (null = latest)
 * @returns Parsed ZeroHeight data, or null if the page doesn't exist (404)
 */
export async function fetchZeroHeightPage(pagePath: string, zhReleaseId: number | null): Promise<ZeroHeightData | null> {
	let lastReason = '';
	let lastStatus = 'unknown';
	let best: ZeroHeightData | null = null; // richest 200 seen so far

	for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
		if (attempt > 0) {
			await sleep(Math.min(600 * 2 ** (attempt - 1), 10000));
			console.warn(`  ⏳ ZeroHeight retry ${attempt}/${MAX_RETRIES} pour ${pagePath} (${lastStatus})`);
		}

		const raw = await tryFetchMd(pagePath, zhReleaseId);
		if (raw === NOT_FOUND) return null; // 404: definitive absence
		if (typeof raw === 'object') {
			lastStatus = raw.status;
			lastReason = raw.reason;
			continue; // hard transient (network/5xx/HTML/empty): retry
		}

		const cleaned = stripImages(raw);
		const data: ZeroHeightData = { raw: cleaned, sections: parseSections(cleaned) };
		if (!best || cleaned.length > best.raw.length) best = data;
		if (isRich(data)) return data;

		// 200 but suspiciously thin — retry hoping for the full page, keep the richest.
		lastStatus = 'thin';
		lastReason = `200 incomplet (${cleaned.length} car., ${Object.keys(data.sections).length} sections)`;
	}

	// Accept the richest 200 we got (a genuinely small page is valid — never fail on thinness).
	if (best) return best;

	throw new TransientFetchError(lastStatus, `ZeroHeight ${pagePath}: ${lastReason} (après ${MAX_RETRIES} retries)`);
}

const NOT_FOUND = Symbol('not-found');
type FetchProblem = { status: string; reason: string };

/** One fetch attempt. Returns md string on success, NOT_FOUND on 404, or a FetchProblem (retryable). */
async function tryFetchMd(pagePath: string, zhReleaseId: number | null): Promise<string | typeof NOT_FOUND | FetchProblem> {
	const url = getZeroHeightUrl(pagePath, zhReleaseId);

	let res: Response;
	try {
		res = await fetch(url, { headers: { Accept: 'text/plain, text/markdown' } });
	} catch (err: any) {
		return { status: 'network', reason: err?.message ?? 'fetch failed' };
	}

	if (res.status === 404) return NOT_FOUND;
	if (!res.ok) return { status: String(res.status), reason: res.statusText || 'HTTP error' };

	let raw = await res.text();

	// ZeroHeight sometimes returns HTML instead of markdown — try the latest-release fallback URL.
	// This silently mixes versions (latest content served for an old release), so it is logged
	// and surfaced as a warning in the end-of-run report.
	if (isHtml(raw) && zhReleaseId !== null) {
		const fallbackUrl = getZeroHeightUrl(pagePath, null);
		try {
			const fb = await fetch(fallbackUrl, { headers: { Accept: 'text/plain, text/markdown' } });
			if (fb.ok) {
				const fbRaw = await fb.text();
				if (!isHtml(fbRaw)) {
					raw = fbRaw;
					console.warn(`  ⚠️  ZeroHeight ${pagePath} : HTML reçu sur l'URL versionnée (release ${zhReleaseId}) — contenu « latest » substitué`);
					recordWarning({
						source: 'zeroheight',
						label: pagePath,
						reason: `HTML reçu sur l'URL versionnée (release ${zhReleaseId}) — contenu « latest » substitué`,
					});
				}
			}
		} catch {
			// fall through to the HTML check below
		}
	}

	if (isHtml(raw)) return { status: 'html', reason: 'HTML reçu au lieu de markdown' };
	if (!raw.trim()) return { status: 'empty', reason: 'réponse vide' };

	return raw;
}

/**
 * Strips markdown image syntax and raw S3 URLs to reduce token bloat.
 * Preserves image alt text as descriptive notes.
 */
function stripImages(content: string): string {
	return (
		content
			// ![alt text](https://zeroheight-uploads.s3...) → **alt text** (if alt is meaningful)
			.replace(/!\[([^\]]*)\]\([^)]+\)/g, (_match, alt: string) => {
				const trimmed = alt.trim();
				if (!trimmed || trimmed === '🖼️' || trimmed.startsWith('http')) return '';
				return `**${trimmed}**`;
			})
			// Standalone S3 URLs on their own line
			.replace(/^https:\/\/zeroheight-uploads\.s3[^\n]*$/gm, '')
			// Figma embed URLs
			.replace(/^\[https:\/\/www\.figma\.com\/embed[^\]]*\]\([^)]*\)$/gm, '')
			// Clean up multiple blank lines
			.replace(/\n{3,}/g, '\n\n')
	);
}

/**
 * Parses the markdown into named sections based on H1 headers.
 * ZeroHeight pages use `# SectionName` at the top level.
 *
 * Known sections: Design, Content, Angular, HTML, iOS, Accessibility
 */
function parseSections(content: string): Record<string, string> {
	const sections: Record<string, string> = {};

	// Split by H1 headers (# Title at the start of a line)
	const parts = content.split(/^# /m);

	for (const part of parts) {
		if (!part.trim()) continue;

		const newlineIdx = part.indexOf('\n');
		if (newlineIdx === -1) continue;

		const title = part.slice(0, newlineIdx).trim();
		const body = part.slice(newlineIdx + 1).trim();

		if (title && body) {
			sections[title] = body;
		}
	}

	return sections;
}
