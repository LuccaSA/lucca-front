/**
 * Tools collector — fetches SCSS utilities, mixins, animations, and Angular tools
 * from ZeroHeight documentation pages.
 *
 * Output goes to `references/tools/v<M>.<m>/`.
 * Versioned by **minor** (same as documentation) since ZeroHeight has one release per minor.
 *
 * Storybook iframe links embedded in the ZH content are replaced with the actual
 * story source code fetched from the git tag.
 */

import fs from 'fs';
import path from 'path';
import { VersionConfig } from '../types';
import { fetchZeroHeightPageGuarded } from './zeroheight-fetch';
import { TransientFetchError, recordFailure } from './fetch-failures';
import { readStoryTemplates } from './story-source';
import { cleanZeroHeightMarkdown } from '../generators/template-renderer';
import { writeToolsPage } from '../generators/skill-writer';

interface ToolEntry {
	slug: string;
	title: string;
	zhPagePath: string;
}

const TOOLS_MAP_PATH = path.join(__dirname, '..', 'tools-map.json');

function loadToolsMap(): ToolEntry[] {
	const raw = fs.readFileSync(TOOLS_MAP_PATH, 'utf-8');
	return JSON.parse(raw) as ToolEntry[];
}

/**
 * Fetches the storybook index and builds a map of story ID → importPath.
 * Returns an empty map if storybook is unavailable.
 */
async function buildStoryIdMap(version: VersionConfig): Promise<Map<string, string>> {
	const map = new Map<string, string>();
	try {
		const res = await fetch(`${version.storybookBaseUrl}/index.json`);
		if (!res.ok) return map;
		const data = await res.json() as { entries?: Record<string, { importPath?: string }> };
		for (const [id, entry] of Object.entries(data.entries ?? {})) {
			if (entry.importPath) map.set(id, entry.importPath);
		}
	} catch {
		// Storybook unavailable — story embedding will be skipped
	}
	return map;
}

/** Regex matching a storybook iframe link: [label](https://...storybook/iframe.html?id=STORY_ID...) */
const STORYBOOK_LINK_RE = /\[([^\]]*)\]\(https?:\/\/[^\s)]*storybook\/iframe[^)]*[?&]id=([^&)\s]+)[^)]*\)/g;

/** Strips bold markers from a tab title: **Base** → Base */
function stripBold(s: string): string {
	return s.replace(/\*\*/g, '').trim();
}

/**
 * Replaces all storybook iframe links in `content` with code blocks of the actual story templates.
 *
 * For links inside `<tab>` blocks, the `<tab-title>` is used as the example label (preferred over
 * the Storybook story name). Falls back to the link label if the story source is unavailable.
 */
function replaceStorybookLinks(content: string, version: VersionConfig, storyIdMap: Map<string, string>): string {
	// 1. Replace entire <tab> blocks that contain a storybook link, using the tab title as label.
	let result = content.replace(/<tab>([\s\S]*?)<\/tab>/g, (match, tabContent: string) => {
		const storyLinkMatch = tabContent.match(/\[([^\]]*)\]\(https?:\/\/[^\s)]*storybook\/iframe[^)]*[?&]id=([^&)\s]+)[^)]*\)/);
		if (!storyLinkMatch) return match; // no storybook link — keep tab for cleanZeroHeightMarkdown

		const [, linkLabel, storyId] = storyLinkMatch;
		const titleMatch = tabContent.match(/<tab-title>([\s\S]*?)<\/tab-title>/);
		const label = titleMatch ? stripBold(titleMatch[1]) : linkLabel;

		return buildExampleBlock(label, storyId, version, storyIdMap);
	});

	// 2. Replace any remaining standalone storybook links (outside <tab> blocks).
	result = result.replace(STORYBOOK_LINK_RE, (_match, label: string, storyId: string) =>
		buildExampleBlock(label, storyId, version, storyIdMap),
	);

	return result;
}

function buildExampleBlock(label: string, storyId: string, version: VersionConfig, storyIdMap: Map<string, string>): string {
	const importPath = storyIdMap.get(storyId);
	if (!importPath) return label;

	const templates = readStoryTemplates(importPath, version);
	if (!templates || templates.length === 0) return label;

	const blocks = templates
		.map((tmpl) => `\`\`\`html\n${tmpl.trim()}\n\`\`\``)
		.join('\n\n');

	return `**Exemple : ${label}**\n\n${blocks}`;
}

/**
 * Collects all tools for a version by fetching their ZeroHeight pages
 * and embedding story source code in place of storybook iframe links.
 *
 * @param only — Optional replay filter: restrict to these tool slugs.
 */
export async function collectAllTools(
	skillsDir: string,
	version: VersionConfig,
	{ skipStorybook = false, only }: { skipStorybook?: boolean; only?: Set<string> } = {},
): Promise<{ written: number; errors: number }> {
	const tools = only ? loadToolsMap().filter((t) => only.has(t.slug)) : loadToolsMap();
	const minorVersion = `${version.major}.${version.minor}`;
	const bareVersion = `${version.major}.${version.minor}.${version.patch}`;
	let written = 0;
	let errors = 0;

	// Build story ID map once for all tools (empty map if storybook is skipped/unavailable)
	const storyIdMap = skipStorybook ? new Map<string, string>() : await buildStoryIdMap(version);
	if (storyIdMap.size > 0) {
		console.log(`  📚 Storybook index: ${storyIdMap.size} stories indexed`);
	}

	console.log(`\n  🔧 Tools (${tools.length} pages, v${minorVersion})...`);

	for (const tool of tools) {
		try {
			const zhData = await fetchZeroHeightPageGuarded(tool.zhPagePath, version.zhReleaseId, {
				scope: 'tools',
				slug: tool.slug,
				version: bareVersion,
			});

			if (!zhData) {
				console.warn(`  ⚠️  No ZH content for tools/${tool.slug}`);
				errors++;
				continue;
			}

			// Replace storybook iframe links with story source BEFORE cleaning
			// so that cleanZeroHeightMarkdown doesn't strip them
			const withStories = replaceStorybookLinks(zhData.raw, version, storyIdMap);

			const cleaned = cleanZeroHeightMarkdown(withStories);

			if (!cleaned.trim()) {
				console.warn(`  ⚠️  Empty content after cleaning for tools/${tool.slug}`);
				errors++;
				continue;
			}

			const content = `# ${tool.title}\n\n${cleaned}\n`;
			const result = writeToolsPage(skillsDir, version, `${tool.slug}.md`, content);
			console.log(`     ✅ ${tool.slug}.md — ${result.status}`);
			written++;
		} catch (err: any) {
			// Transient ZH failure: record it so `--retry-failed` can replay this tool page.
			if (err instanceof TransientFetchError) {
				recordFailure({
					source: 'zeroheight',
					scope: 'tools',
					slug: tool.slug,
					version: bareVersion,
					ref: tool.zhPagePath,
					status: err.status,
					reason: err.message,
				});
			}
			console.warn(`  ⚠️  Error processing tools/${tool.slug}: ${err.message}`);
			errors++;
		}
	}

	return { written, errors };
}
