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

/**
 * Fetches a ZeroHeight page as markdown and parses it into sections.
 *
 * @param pagePath — e.g. "098404-button"
 * @param zhReleaseId — ZeroHeight release ID (null = latest)
 * @returns Parsed ZeroHeight data, or null if the page doesn't exist
 */
export async function fetchZeroHeightPage(pagePath: string, zhReleaseId: number | null): Promise<ZeroHeightData | null> {
	const url = getZeroHeightUrl(pagePath, zhReleaseId);

	let res: Response;
	try {
		res = await fetch(url, {
			headers: { Accept: 'text/plain, text/markdown' },
		});
	} catch (err: any) {
		console.warn(`  ⚠️  ZeroHeight fetch failed for ${pagePath}: ${err.message}`);
		return null;
	}

	if (!res.ok) {
		if (res.status === 404) return null;
		console.warn(`  ⚠️  ZeroHeight HTTP ${res.status} for ${pagePath}`);
		return null;
	}

	let raw = await res.text();

	// ZeroHeight returns HTML instead of markdown for the "default" release.
	// Fallback: retry with /v/0/ (latest) or without version prefix.
	if (raw.trimStart().startsWith('<!DOCTYPE') || raw.trimStart().startsWith('<html')) {
		const fallbackUrl = zhReleaseId ? getZeroHeightUrl(pagePath, 0) : getZeroHeightUrl(pagePath, null);
		try {
			const fallbackRes = await fetch(fallbackUrl, {
				headers: { Accept: 'text/plain, text/markdown' },
			});
			if (fallbackRes.ok) {
				const fallbackRaw = await fallbackRes.text();
				if (!fallbackRaw.trimStart().startsWith('<!DOCTYPE') && !fallbackRaw.trimStart().startsWith('<html')) {
					raw = fallbackRaw;
				}
			}
		} catch {
			// Ignore fallback errors, use whatever we have
		}
	}

	// If still HTML after fallback, skip this content
	if (raw.trimStart().startsWith('<!DOCTYPE') || raw.trimStart().startsWith('<html')) {
		console.warn(`  ⚠️  ZeroHeight returned HTML instead of markdown for ${pagePath}`);
		return null;
	}

	if (!raw.trim()) return null;

	const cleaned = stripImages(raw);
	const sections = parseSections(cleaned);

	return { raw: cleaned, sections };
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
