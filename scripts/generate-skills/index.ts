#!/usr/bin/env node

/**
 * generate-skills — Generates SKILL.md files for VS Code Copilot for each component
 * of the Lucca Front design system, sourced from Figma, Storybook and Zeroheight.
 *
 * Usage:
 *   ts-node scripts/generate-skills/index.ts [options]
 *   npm run skills:generate [-- options]
 *
 * Options:
 *   --component <slug>   Generate only the specified component
 *   --force              Regenerate even if the SKILL.md already exists
 *   --dry-run            Print the prompt without writing any files
 */

import fs from 'fs';
import path from 'path';

import { fetchFigmaComponents, groupFigmaComponentsBySet } from './collectors/figma';
import { fetchStorybookIndex } from './collectors/storybook';
import { fetchComponentGuidelines, initializeMcp } from './collectors/zeroheight';
import { loadConfig } from './config';
import { createAiClient } from './generators/ai-client';
import { buildPrompt } from './generators/prompt-builder';
import { writeComponentResource } from './generators/skill-writer';
import { writeToc } from './generators/toc-writer';
import { loadComponentMap, MAP_PATH, matchComponents, refreshMap, resetMap } from './matchers/component-matcher';
import { MatchedEntry } from './types';

// ─── CLI flag parsing ──────────────────────────────────────────────────────────

const args = process.argv.slice(2);

const flags = {
	force: args.includes('--force'),
	dryRun: args.includes('--dry-run'),
	initMapForce: args.includes('--init-map-force'),
	refreshMap: args.includes('--refresh-map'),
	component: (() => {
		const idx = args.indexOf('--component');
		return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
	})(),
};

// ─── Concurrency helper ────────────────────────────────────────────────────────

async function withConcurrency<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
	const results: R[] = new Array(items.length);
	const queue = items.map((item, i) => ({ item, i }));
	let cursor = 0;

	async function worker(): Promise<void> {
		while (cursor < queue.length) {
			const { item, i } = queue[cursor++];
			results[i] = await fn(item);
		}
	}

	const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
	await Promise.all(workers);
	return results;
}

// ─── Main entry point ──────────────────────────────────────────────────────────

async function main(): Promise<void> {
	console.log('🚀 Lucca Front — Generating SKILL.md files\n');
	console.log(`   Flags: ${JSON.stringify(flags)}\n`);

	// 1. Load configuration
	const config = loadConfig();

	// 2. Collect data (Figma + Storybook + MCP in parallel)
	console.log('📥 Collecting data...\n');

	const [figmaComponents, storybookGroups, mcpContext] = await Promise.all([
		fetchFigmaComponents(config),
		fetchStorybookIndex(config),
		initializeMcp(config).catch((err: Error) => {
			console.warn(`\n  ⚠️  MCP Zeroheight unavailable: ${err.message}`);
			console.warn('     Prisme guidelines will be missing from the generated SKILL.md files.\n');
			return null;
		}),
	]);

	// 3. Match Figma ↔ Storybook
	const figmaGroups = groupFigmaComponentsBySet(figmaComponents);

	// --init-map-force mode: reset component-map.json entirely with algorithmic suggestions
	if (flags.initMapForce) {
		console.log(`\n🗺️  Resetting component-map.json...\n`);
		const total = resetMap(figmaGroups, storybookGroups);
		console.log(`\n  ✅ ${total} entries generated in ${MAP_PATH}`);
		console.log('     ⚠️  All manual corrections have been overwritten.');
		console.log('     Edit component-map.json to fix suggestions and map null entries.');
		return;
	}

	// --refresh-map mode: add new entries + remove deleted ones, without touching existing ones
	if (flags.refreshMap) {
		console.log(`\n🗺️  Refreshing component-map.json...\n`);
		const { added, removed } = refreshMap(figmaGroups, storybookGroups);
		if (added === 0 && removed === 0) {
			console.log('  ✅ No changes — map is up to date.');
		} else {
			if (added > 0) console.log(`\n  ✅ ${added} entr${added > 1 ? 'ies' : 'y'} added`);
			if (removed > 0) console.log(`  🗑  ${removed} entr${removed > 1 ? 'ies' : 'y'} removed`);
			console.log(`\n  File updated: ${MAP_PATH}`);
		}
		return;
	}

	const componentMap = loadComponentMap();
	const matchResult = matchComponents(figmaGroups, storybookGroups, componentMap);
	const { matched } = matchResult;

	// 4. Filter by --component if requested
	let targets: MatchedEntry[] = matched;
	if (flags.component) {
		targets = matched.filter((m) => m.slug === flags.component || m.storybook?.slug === flags.component);
		if (targets.length === 0) {
			console.error(`\n❌ Component "${flags.component}" not found in matched data.`);
			console.log(
				`   Available components:\n   ${matched
					.map((m) => m.slug)
					.sort()
					.join(', ')}`,
			);
			process.exit(1);
		}
	}

	// 5. Generate SKILL.md files via AI
	console.log(`\n🤖 Generating ${targets.length} SKILL.md files...\n`);

	const generateText = await createAiClient(config);

	const results = await withConcurrency(targets, config.ai.concurrency, async (target) => {
		const { slug } = target;
		const skillPath = path.join(config.output.skillsDir, 'lucca-front', 'references', `${slug}.md`);

		// Skip if the file already exists and --force is not set
		if (fs.existsSync(skillPath) && !flags.force && !flags.dryRun) {
			console.log(`  ⏭  ${slug} — skipped (already exists, use --force to overwrite)`);
			return { slug, status: 'skipped' };
		}

		console.log(`  ⚙️  ${slug} — generating...`);

		// Fetch Zeroheight guidelines for this component
		let zeroheightData: Record<string, string> | null = null;
		if (mcpContext) {
			try {
				zeroheightData = await fetchComponentGuidelines(mcpContext.mcpUrl, target.figma.figmaName);
			} catch (err: any) {
				console.warn(`     ⚠️  Zeroheight: ${err.message}`);
			}
		}

		// Build the prompt
		const { systemPrompt, userPrompt } = buildPrompt({ matched: target, zeroheightData });

		// --dry-run mode: print the prompt without calling the AI
		if (flags.dryRun) {
			const separator = '─'.repeat(60);
			console.log(`\n${separator}\n// DRY RUN — ${slug}\n${separator}`);
			console.log('SYSTEM (excerpt):\n', systemPrompt.slice(0, 300), '\n[...]\n');
			console.log('USER (excerpt):\n', userPrompt.slice(0, 600), '\n[...]\n');
			return { slug, status: 'dry-run' };
		}

		// AI call
		let content: string;
		try {
			content = await generateText({ systemPrompt, userPrompt });
		} catch (err: any) {
			console.error(`  ❌ ${slug} — AI error: ${err.message}`);
			return { slug, status: 'error', error: err.message };
		}

		// Write the file
		const category = target.storybook?.category ?? '';
		const figmaName = target.figma?.figmaName ?? slug;
		const storybookName = target.storybook?.storybookName ?? slug;
		const result = writeComponentResource(config.output.skillsDir, slug, content, { category, figmaName, storybookName }, flags.force);
		console.log(`  ✅ ${slug} — ${result.status}`);
		return { slug, status: result.status };
	});

	// 6. Generate table of contents
	if (!flags.dryRun) {
		const tocPath = writeToc(config.output.skillsDir);
		console.log(`\n📑 Table of contents: ${tocPath}`);
	}

	// 7. Final summary
	const summary = results.reduce(
		(acc, r) => {
			acc[r.status] = (acc[r.status] ?? 0) + 1;
			return acc;
		},
		{} as Record<string, number>,
	);

	console.log('\n🎉 Done!');
	if (summary['created']) console.log(`   Created : ${summary['created']}`);
	if (summary['updated']) console.log(`   Updated : ${summary['updated']}`);
	if (summary['skipped']) console.log(`   Skipped : ${summary['skipped']}`);
	if (summary['error']) console.log(`   Errors  : ${summary['error']}`);
	if (summary['dry-run']) console.log(`   Dry-run : ${summary['dry-run']}`);
}

main().catch((err: Error) => {
	console.error('\n❌ Fatal error:', err.message);
	if (process.env['DEBUG']) console.error(err.stack);
	process.exit(1);
});
