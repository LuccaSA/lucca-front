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

import { ZeroHeightData } from '../types';
import { getZeroHeightUrl } from '../version-config';
import { TransientFetchError } from './fetch-failures';

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
	if (isHtml(raw)) {
		const fallbackUrl = zhReleaseId ? getZeroHeightUrl(pagePath, 0) : getZeroHeightUrl(pagePath, null);
		try {
			const fb = await fetch(fallbackUrl, { headers: { Accept: 'text/plain, text/markdown' } });
			if (fb.ok) {
				const fbRaw = await fb.text();
				if (!isHtml(fbRaw)) raw = fbRaw;
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
