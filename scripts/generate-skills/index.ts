#!/usr/bin/env node

/**
 * generate-skills — Generates deterministic SKILL.md files for each component
 * of the Lucca Front design system.
 *
 * Sources:
 * - AST extraction → Angular API (inputs, selectors, types)
 * - ZeroHeight .md → Design guidelines
 * - Storybook index.json → Story links + source code
 * - Figma REST API → Design variant tokens (optional)
 *
 * Usage:
 *   npx ts-node --project scripts/generate-skills/tsconfig.json scripts/generate-skills/index.ts [options]
 *
 * Options:
 *   --version <tag>      Version(s) to generate (e.g. "21.2.1"), repeatable, required
 *   --component <slug>   Generate only the specified component
 *   --skip-figma         Skip Figma data collection
 *   --skip-zeroheight    Skip ZeroHeight data collection
 *   --skip-storybook     Skip Storybook data collection
 *   --dry-run            Print what would be generated without writing files
 *   --validate           Validate ZH coverage of component-map.json (no generation)
 *   --retry-failed       Replay only the units whose ZH/Figma fetch failed in a previous run
 *   --accept-shrink      Accept content regressions vs the baselines (legitimate deletions)
 */

import path from 'path';
import { extractPackageAPI } from './collectors/ast-extractor';
import {
	fetchFigmaDesignTokensMerged,
	prefetchFigmaNodes,
	setAcceptShrink as setFigmaAcceptShrink,
} from './collectors/figma-connect';
import { fetchStorybookIndex } from './collectors/storybook';
import { readStorySourceFromGit, extractBasicUsage, inferScssImports, formatStoryTemplates } from './collectors/story-source';
import { buildInputDefaults } from './collectors/story-eval';
import { fetchZeroHeightPageGuarded, setAcceptShrink as setZhAcceptShrink } from './collectors/zeroheight-fetch';
import {
	FetchFailure,
	TransientFetchError,
	recordFailure,
	clearFailures,
	reportFailures,
	writeFailureManifest,
	readFailureManifest,
} from './collectors/fetch-failures';
import { loadConfig } from './config';
import {
	renderComponentMd,
	splitDesignSections,
	extractZhStoryNotes,
	renderDesignIndexMd,
	renderDesignSectionMd,
	renderComponentPageMd,
	renderStoryMd,
	renderChangelogMd,
	renderFigmaMd,
	collectSharedTypeDefs,
	renderSharedTypeMd,
} from './generators/template-renderer';
import {
	writeVersionedSkill,
	cleanVersionDirectory,
	writeDesignIndex,
	writeDesignSection,
	writeComponentPage,
	writeStory,
	writeChangelog,
	writeFigmaSkill,
	figmaSkillExists,
	writeVersionManifest,
	writeSharedType,
} from './generators/skill-writer';
import { writeToc } from './generators/toc-writer';
import { buildComponentChangelog } from './generators/changelog-writer';
import { writeVersionChangelog } from './generators/version-diff-writer';
import { writeAggregateSkill, listGeneratedVersionStrings } from './generators/aggregate-writer';
import { resolveVersion } from './version-config';
import { collectAllDocumentation } from './collectors/documentation';
import { collectDeprecated } from './collectors/deprecated';
import { collectSchematics } from './collectors/schematics';
import { collectAllTools } from './collectors/tools';
import { discoverComponents, DiscoveredComponent } from './collectors/component-discovery';
import { syncMetadata } from './sync-metadata';
import { ComponentData, ComponentEntry, ComponentMap, DesignSection, StorybookGroup } from './types';

// ─── CLI flag parsing ──────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function getFlag(name: string): string | null {
	const idx = args.indexOf(`--${name}`);
	return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
}

function getFlags(name: string): string[] {
	const values: string[] = [];
	for (let i = 0; i < args.length; i++) {
		if (args[i] === `--${name}` && args[i + 1] && !args[i + 1].startsWith('--')) {
			values.push(args[i + 1]);
			i++;
		}
	}
	return values;
}

const flags = {
	versions: getFlags('version'),
	component: getFlag('component'),
	skipFigma: args.includes('--skip-figma'),
	skipZeroheight: args.includes('--skip-zeroheight'),
	skipStorybook: args.includes('--skip-storybook'),
	skipDocumentation: args.includes('--skip-documentation'),
	skipTools: args.includes('--skip-tools'),
	skipSchematics: args.includes('--skip-schematics'),
	skipAggregate: args.includes('--skip-aggregate'),
	documentationOnly: args.includes('--documentation-only'),
	dryRun: args.includes('--dry-run'),
	validate: args.includes('--validate'),
	retryFailed: args.includes('--retry-failed'),
	acceptShrink: args.includes('--accept-shrink'),
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

// ─── Validation ────────────────────────────────────────────────────────────────

/**
 * Compares component-map.json against ZeroHeight pages from the Prisme MCP.
 * Reports components present in ZH but missing from the map.
 *
 * ZH page IDs are hardcoded from the Prisme navigation — run `list-pages`
 * in the Prisme MCP to refresh them if the ZH structure changes.
 */
async function validateZhCoverage(componentMap: ComponentMap): Promise<void> {
	console.log('🔍 Validating ZeroHeight coverage...\n');

	// Authoritative list of ZH component page paths (non-deprecated, non-tool pages)
	const zhComponentPages: Record<string, string> = {
		// Structure
		'Footer': '419504', 'Filter bar': '13044b', 'Filter pill': '053be4',
		'Section': '799d1e', 'Box': '1926ca', 'Page header': '6598e9',
		'Fancy box': '19c95b', 'Divider': '22632c', 'Mobile header': '6771ab',
		'App layout': '2615fa', 'Resource card': '44a682', 'Grid': '955d69',
		'Container': '453b4f', 'Highlight data': '1827fe', 'Card': '878482',
		// Iconographie
		'Icon': '9826b3', 'Bubble illustration': '30a66f', 'Bubble icon': '00d34a',
		'Software icon': '37e39b',
		// Overlays
		'Fancy dialog': '32b1a9', 'Popover': '129fae', 'Tooltip': '9285d2',
		'Dropdown': '557682', 'Modal': '4068ed', 'Dialogs': '841b0b',
		// Formulaires
		'Input framed': '28896d', 'Select multiple': '927519', 'Listbox': '005487',
		'Textfield': '459eda', 'Form label': '3491a2', 'Form field': '810797',
		'Form layout': '36780d', 'Textarea': '60990a', 'Date range picker': '00bf9b',
		'Color picker': '16e1d1', 'File upload': '8282a5', 'Switch': '39c7b7',
		'Clear': '80fb2d', 'Multi language textfield': '5428d4', 'Radio': '45f82a',
		'Inline message': '43a580', 'Fieldset': '431e99', 'Time and Duration picker': '2473a1',
		'Data presentation': '02bfb1', 'Checkbox': '42c88e', 'Phone number field': '896abf',
		'Date picker': '87a48d', 'Select simple': '587833', 'Rich textfield': '92f33b',
		'Calendar': '76c144',
		// Listes
		'Sortable list': '883e34', 'Index table': '24fc14', 'Activity feed': '3541ee',
		'Chip': '3960bc', 'Data table': '4263a5', 'Listing': '170797',
		// Textes
		'Numeric badge': '0548ef', 'Code': '85d53c', 'Mobile push': '268432',
		'Read more': '5054f0', 'Tag': '6036ad', 'Status badge': '425d98',
		'Title and text': '021fef', 'PLG Push': '6035eb', 'Comment': '08238a',
		'New badge': '36bcdf', 'Text flow': '51e878',
		// Feedbacks
		'Onboarding empty state': '9490c7', 'Page empty state': '49b0ef',
		'Section empty state': '97ca09', 'Callout': '64c8d8', 'Toast': '12eaab',
		'Error page': '1622d2', 'Gauge': '75e507',
		// Users
		'Display name': '05750c', 'User tile': '56d611', 'Avatar': '42b330',
		'User popover': '85b183',
		// Loaders
		'Progress bar': '916abd', 'Loading': '91e25d', 'Skeleton': '4819e2',
		// Navigation
		'Table of content': '05ca4d', 'Pagination': '093a9c', 'Mobile navigation': '337b80',
		'Skip links': '48aefc', 'Segmented control': '88f854', 'Vertical navigation': '205934',
		'Progress stepper': '8211e2', 'Horizontal navigation': '29aaef',
		'Breadcrumbs': '691d7f', 'Side navigation': '160093', 'Timeline': '288e66',
		// Actions
		'Link': '95303b', 'Button': '098404',
	};

	const mappedPaths = new Set(
		Object.values(componentMap)
			.map((e) => e.zeroheightPagePath)
			.filter(Boolean),
	);

	const missing: [string, string][] = [];
	for (const [name, path] of Object.entries(zhComponentPages)) {
		if (!mappedPaths.has(path)) {
			missing.push([name, path]);
		}
	}

	if (missing.length === 0) {
		console.log(`✅ All ${Object.keys(zhComponentPages).length} ZH component pages are covered in component-map.json`);
	} else {
		console.error(`❌ ${missing.length} ZH pages missing from component-map.json:\n`);
		for (const [name, path] of missing.sort()) {
			console.error(`   ${name}: https://prisme.lucca.io/94310e217/v/latest/p/${path}`);
		}
		process.exit(1);
	}

	console.log(`\n📊 component-map.json: ${Object.keys(componentMap).length} entries, ${mappedPaths.size} with ZH pages`);
}

// ─── Main entry point ──────────────────────────────────────────────────────────

async function main(): Promise<void> {
	if (flags.validate) {
		const componentMap: ComponentMap = require('./component-map.json');
		await validateZhCoverage(componentMap);
		return;
	}

	const config = loadConfig();
	const FAILURES_MANIFEST = path.join(config.output.skillsDir, '_fetch-failures.json');

	// Shrink policy: with --accept-shrink, a content regression vs the baseline is taken as a
	// legitimate deletion (fresh content written, baselines updated) instead of being held back.
	setZhAcceptShrink(flags.acceptShrink);
	setFigmaAcceptShrink(flags.acceptShrink);

	// Replay only the fetches that failed in a previous run (from the manifest).
	if (flags.retryFailed) {
		await retryFailedRun(config, FAILURES_MANIFEST);
		return;
	}

	if (flags.versions.length === 0) {
		console.error('❌ --version is required (e.g. --version 21.2.1 --version 21.1.0)');
		process.exit(1);
	}

	clearFailures();

	let totalSuccess = 0;
	let totalErrors = 0;

	for (let vi = 0; vi < flags.versions.length; vi++) {
		const versionStr = flags.versions[vi];
		const version = resolveVersion(versionStr);
		console.log(`\n━━━━━━ Version ${vi + 1}/${flags.versions.length} : ${version.tag} ━━━━━━`);

		// Documentation collection (ZH pages: tokens, content, guidelines, patterns)
		if (!flags.skipDocumentation && !flags.component) {
			console.log(`\n📖 Collecting documentation for v${version.major}.${version.minor}...`);
			if (flags.dryRun) {
				const docMap = require('./documentation-map.json');
				const total = Object.values(docMap).reduce((sum: number, arr: any) => sum + arr.length, 0);
				console.log(`   DRY RUN — ${total} documentation pages would be fetched`);
			} else {
				const { written, errors } = await collectAllDocumentation(config.output.skillsDir, version);
				console.log(`\n   📖 Documentation: ${written} written, ${errors} errors`);
				totalSuccess += written;
				totalErrors += errors;
			}
		}

		// Deprecated components collection (ZH "Cycle de vie des composants" page)
		if (!flags.skipDocumentation && !flags.component) {
			console.log(`\n💀 Collecting deprecated documentation for v${version.major}.${version.minor}...`);
			if (!flags.dryRun) {
				const { written, errors } = await collectDeprecated(config.output.skillsDir, version);
				console.log(`\n   💀 Deprecated: ${written} written, ${errors} errors`);
				totalSuccess += written;
				totalErrors += errors;
			} else {
				console.log('   DRY RUN — deprecated page would be fetched from ZeroHeight');
			}
		}

		// Schematics / migrations (ng update) — read from git at the target tag
		if (!flags.skipSchematics && !flags.component) {
			console.log(`\n🧭 Collecting schematics/migrations for ${version.tag}...`);
			if (!flags.dryRun) {
				const { written, errors } = collectSchematics(config.output.skillsDir, version);
				totalSuccess += written;
				totalErrors += errors;
			} else {
				console.log('   DRY RUN — migrations.json would be read from git');
			}
		}

		// Tools collection (ZeroHeight pages: utilities, mixins, animations, etc.)
		// Runs with --documentation-only since tools are now ZH-based (not git source extraction).
		if (!flags.skipTools && !flags.component) {
			console.log(`\n🔧 Collecting tools for ${version.tag}...`);
			if (flags.dryRun) {
				const toolsMap = require('./tools-map.json');
				console.log(`   DRY RUN — ${toolsMap.length} tool pages would be fetched from ZeroHeight`);
			} else {
				const { written, errors } = await collectAllTools(config.output.skillsDir, version, { skipStorybook: flags.skipStorybook });
				console.log(`\n   🔧 Tools: ${written} written, ${errors} errors`);
				totalSuccess += written;
				totalErrors += errors;
			}
		}

		// Component collection (skip if --documentation-only)
		if (!flags.documentationOnly) {
			const { success, errors } = await processVersion(versionStr, config);
			totalSuccess += success;
			totalErrors += errors;
		}

		// Per-version SKILL.md (entry point) — written after this version's files exist on disk
		if (!flags.dryRun && !flags.component) {
			const tocPath = writeToc(config.output.skillsDir, version);
			console.log(`📑 SKILL.md: ${path.relative(config.output.skillsDir, tocPath)}`);
		}
	}

	// Version-level review changelog (human PR-aid, not consumed by the skill) — run after the
	// loop so every target version's folder is on disk to diff against its predecessor.
	if (!flags.dryRun && !flags.component) {
		for (const versionStr of flags.versions) {
			const v = resolveVersion(versionStr);
			const clPath = writeVersionChangelog(config.output.skillsDir, v);
			if (clPath) console.log(`📝 Review changelog: ${path.relative(config.output.skillsDir, clPath)}`);
		}
	}

	// Aggregate "all versions" skill (lucca-front-all): bundles every generated version + a router
	// SKILL.md that detects the project's LF version and delegates to the matching version folder.
	// Built after all per-version folders are on disk. Skipped for single-component or partial runs.
	if (!flags.dryRun && !flags.component && !flags.skipAggregate) {
		const bundled = flags.versions.map((v) => resolveVersion(v));
		const { skillPath, versionCount } = writeAggregateSkill(config.output.skillsDir, bundled);
		console.log(`📦 Aggregate: ${path.relative(config.output.skillsDir, skillPath)} (${versionCount} versions)`);
	}

	// Surface ZH/Figma fetch failures (content missing) and persist them for replay.
	if (!flags.dryRun && !flags.component) {
		reportFailures();
		writeFailureManifest(FAILURES_MANIFEST);
	}

	console.log(`\n🎉 All done! ${flags.versions.length} version(s), ${totalSuccess} generated, ${totalErrors} errors`);
}

/**
 * Replays only the units whose ZH/Figma fetch failed in a previous run (read from the manifest):
 * components, documentation pages, tool pages and the deprecated page — each through its own
 * collector. Then refreshes the per-version SKILL.md of the touched versions and the aggregate.
 * Rewrites the manifest with whatever still fails — so it can be replayed again until empty.
 */
async function retryFailedRun(config: ReturnType<typeof loadConfig>, manifestPath: string): Promise<void> {
	const prev = readFailureManifest(manifestPath);
	if (prev.length === 0) {
		console.log('✅ Aucun échec à rejouer (manifeste vide ou absent).');
		return;
	}

	clearFailures();

	// Group failures by version (scope read per failure; absent = 'component', pre-scope manifests).
	const byVersion = new Map<string, FetchFailure[]>();
	for (const f of prev) {
		const list = byVersion.get(f.version) ?? [];
		list.push(f);
		byVersion.set(f.version, list);
	}

	console.log(`↻ Rejeu : ${prev.length} échec(s) sur ${byVersion.size} version(s)\n`);
	const touchedVersions: string[] = [];
	for (const [versionStr, items] of byVersion) {
		const version = resolveVersion(versionStr);
		const componentSlugs = new Set(items.filter((f) => (f.scope ?? 'component') === 'component').map((f) => f.slug));
		const docSlugs = new Set(items.filter((f) => f.scope === 'documentation').map((f) => f.slug));
		const toolSlugs = new Set(items.filter((f) => f.scope === 'tools').map((f) => f.slug));
		const hasDeprecated = items.some((f) => f.scope === 'deprecated');

		console.log(`\n━━━━━━ Rejeu ${versionStr} (${items.length} échec·s) ━━━━━━`);

		if (docSlugs.size > 0 && !flags.dryRun) {
			console.log(`\n📖 Rejeu documentation (${docSlugs.size} page·s)...`);
			await collectAllDocumentation(config.output.skillsDir, version, docSlugs);
		}
		if (hasDeprecated && !flags.dryRun) {
			console.log(`\n💀 Rejeu de la page deprecated...`);
			await collectDeprecated(config.output.skillsDir, version);
		}
		if (toolSlugs.size > 0 && !flags.dryRun) {
			console.log(`\n🔧 Rejeu tools (${toolSlugs.size} page·s)...`);
			await collectAllTools(config.output.skillsDir, version, { skipStorybook: flags.skipStorybook, only: toolSlugs });
		}
		if (componentSlugs.size > 0) {
			await processVersion(versionStr, config, componentSlugs);
		}
		touchedVersions.push(versionStr);
	}

	// Refresh the touched versions' SKILL.md, then rebuild the aggregate from all on-disk versions.
	if (!flags.dryRun) {
		for (const versionStr of touchedVersions) {
			writeToc(config.output.skillsDir, resolveVersion(versionStr));
		}
		if (!flags.skipAggregate) {
			const all = listGeneratedVersionStrings(config.output.skillsDir).map(resolveVersion);
			const { versionCount } = writeAggregateSkill(config.output.skillsDir, all);
			console.log(`\n📦 Agrégat reconstruit (${versionCount} versions)`);
		}
	}

	reportFailures();
	writeFailureManifest(manifestPath);
}

async function processVersion(
	versionStr: string,
	config: ReturnType<typeof loadConfig>,
	replaySlugs?: Set<string>,
): Promise<{ success: number; errors: number; componentMap: ComponentMap }> {
	const version = resolveVersion(versionStr);
	// Component-scoped run = single --component OR a replay of specific failed slugs. In both
	// cases we touch only those components and skip metadata sync / TOC rewrites.
	const componentScoped = !!flags.component || (!!replaySlugs && replaySlugs.size > 0);

	console.log(`\n🚀 Generating skills for Lucca Front ${version.tag}\n`);
	console.log(`   ZeroHeight release: ${version.zhReleaseId ?? 'none'}`);
	console.log(`   Storybook: ${version.storybookBaseUrl}`);
	console.log(`   Flags: ${JSON.stringify({ ...flags, versions: undefined, version: versionStr })}\n`);

	// Collect Storybook index (primary source for component discovery)
	let storybookMap = new Map<string, StorybookGroup>();
	if (!flags.skipStorybook) {
		console.log('📥 Fetching Storybook index...');
		try {
			storybookMap = await fetchStorybookIndex(version);
		} catch (err: any) {
			console.warn(`  ⚠️  Storybook unavailable: ${err.message}`);
		}
	}

	// Discover components dynamically (from Storybook + metadata, or metadata-only if Storybook unavailable)
	// Sync metadata first to ensure it's up-to-date
	if (!componentScoped) {
		console.log('🔄 Syncing component-metadata.json...');
		const syncResult = syncMetadata(storybookMap, version);
		if (syncResult.added.length) console.log(`   + ${syncResult.added.length} new entries`);
		if (syncResult.updated.length) console.log(`   ~ ${syncResult.updated.length} updated entries`);
		if (syncResult.warnings.length) console.log(`   ⚠️  ${syncResult.warnings.length} warnings`);
	}

	let discovered = discoverComponents(storybookMap, version);

	// Filter by --component if requested (supports both hyphenated and concatenated forms)
	if (flags.component) {
		const targetCompact = flags.component.replace(/-/g, '');
		discovered = discovered.filter(c => c.slug === flags.component || c.slug.replace(/-/g, '') === targetCompact);
		if (discovered.length === 0) {
			const all = discoverComponents(storybookMap, version).map(c => c.slug);
			console.error(`❌ Component "${flags.component}" not found in ${version.tag}.`);
			console.log(`   Available: ${all.join(', ')}`);
			return { success: 0, errors: 1, componentMap: {} };
		}
	}

	// Replay mode: restrict to the failed slugs for this version.
	if (replaySlugs && replaySlugs.size > 0) {
		discovered = discovered.filter((c) => replaySlugs.has(c.slug));
		if (discovered.length === 0) return { success: 0, errors: 0, componentMap: {} };
		console.log(`   ↻ Rejeu de ${discovered.length} composant(s) : ${discovered.map((c) => c.slug).join(', ')}`);
	}

	// Build ComponentMap from discovered list (for TOC + changelog)
	const componentMap: ComponentMap = {};
	for (const { slug, entry } of discovered) {
		componentMap[slug] = entry;
	}

	// Process each component
	const entries: [string, ComponentEntry][] = discovered.map(c => [c.slug, c.entry]);

	// Batched Figma prefetch: all node ids in a handful of Tier-1 requests, filling the process
	// cache so the per-component fetches below are network no-ops (cache persists across versions).
	if (!flags.skipFigma && config.figma.token) {
		const allNodeIds = entries.flatMap(([, entry]) => entry.figmaNodeIds ?? []);
		if (allNodeIds.length > 0) {
			await prefetchFigmaNodes(config.figma.fileKey, allNodeIds, config.figma.token);
		}
	}

	console.log(`\n⚙️  Processing ${entries.length} components...\n`);

	let successCount = 0;
	let errorCount = 0;
	const totalComponents = entries.length;
	let processed = 0;

	const results = await withConcurrency(entries, config.concurrency, async ([slug, entry]: [string, ComponentEntry]) => {
		try {

			// 1. AST extraction (needs ngPackage — skip for CSS-only components)
			const api = entry.ngPackage ? extractPackageAPI(entry.ngPackage, version) : null;

			// 2. ZeroHeight guidelines (guarded: run cache + baseline shrink-guard)
			let zeroheight = null;
			if (!flags.skipZeroheight && entry.zeroheightPagePath) {
				try {
					zeroheight = await fetchZeroHeightPageGuarded(entry.zeroheightPagePath, version.zhReleaseId, {
						scope: 'component',
						slug,
						version: `${version.major}.${version.minor}.${version.patch}`,
					});
				} catch (err: any) {
					if (err instanceof TransientFetchError) {
						recordFailure({
							source: 'zeroheight',
							slug,
							version: `${version.major}.${version.minor}.${version.patch}`,
							ref: entry.zeroheightPagePath,
							status: err.status,
							reason: err.message,
						});
					}
					console.warn(`     ⚠️  ZeroHeight: ${err.message}`);
				}
			}

			// 3. Storybook match
			const sbGroup = storybookMap.get(entry.storybookSlug) ?? null;

			// 4. Story source code + input descriptions.
			// Component input defaults feed the story renderer's generateInputs, so default-valued
			// args are correctly omitted from rendered templates (matching Storybook output).
			const componentDefaults = buildInputDefaults(api?.apis.flatMap((a) => a.inputs) ?? []);
			const storyResult = readStorySourceFromGit(sbGroup, version, componentDefaults);
			const storyExamples = storyResult?.examples ?? null;

			// Merge argType descriptions into API inputs
			if (storyResult?.inputDescriptions && api) {
				for (const apiClass of api.apis) {
					for (const inp of apiClass.inputs) {
						const desc = storyResult.inputDescriptions.get(inp.bindingName)
							?? storyResult.inputDescriptions.get(inp.propName);
						if (desc) inp.description = desc;
					}
				}
			}

			// 4b. Basic usage template (from "basic" story)
			const basicUsage = extractBasicUsage(sbGroup, version, componentDefaults);

			// 4c. Enrich stories with ZH notes (imports + prose from <tab> blocks)
			if (zeroheight && storyExamples && sbGroup) {
				const zhNotes = extractZhStoryNotes(zeroheight.raw);
				if (zhNotes.length > 0) {
					// Build storyId → fileSlug mapping from the storybook index
					const idToFileSlug = new Map<string, string>();
					for (const story of sbGroup.stories) {
						if (story.id && story.importPath) {
							const filename = story.importPath.split('/').pop() ?? '';
							const base = filename.replace(/\.stories\.ts$/, '');
							const parts = base.split('-');
							const suffix = parts.length > 1 ? parts.slice(1).join('-') : parts[0];
							const prefix = story.framework === 'angular' ? 'angular' : 'html';
							idToFileSlug.set(story.id, `${prefix}-${suffix}`);
						}
					}

					// Map notes to story examples
					for (const zhNote of zhNotes) {
						for (const storyId of zhNote.storyIds) {
							const fileSlug = idToFileSlug.get(storyId);
							if (!fileSlug) continue;
							const example = storyExamples.find((e) => e.fileSlug === fileSlug);
							if (!example) continue;
							if (zhNote.imports.length > 0) example.zhImports = zhNote.imports;
							if (zhNote.note) example.zhNote = zhNote.note;
						}
					}
				}
			}

			// 4d. Infer additional SCSS imports for HTML stories from template classes
			if (storyExamples && entry.ngPackage) {
				for (const ex of storyExamples) {
					if (ex.framework !== 'html-css') continue;
					// Skip if ZH already provided curated imports (they're authoritative)
					if (ex.zhImports && ex.zhImports.length > 0) continue;
					const extraScss = inferScssImports(ex.templates, entry.ngPackage, version.tag);
					if (extraScss.length > 0) {
						ex.zhImports = extraScss;
					}
				}
			}

			// 4e. Format HTML templates with prettier
			if (storyExamples) {
				await formatStoryTemplates(storyExamples);
			}

			// 5. Figma tokens (optional, unversioned) — ALL node ids merged (aliases, split sets)
			let figmaTokens = null;
			if (!flags.skipFigma && entry.figmaNodeIds && entry.figmaNodeIds.length > 0 && config.figma.token) {
				try {
					figmaTokens = await fetchFigmaDesignTokensMerged(config.figma.fileKey, entry.figmaNodeIds, config.figma.token);
				} catch (err: any) {
					if (err instanceof TransientFetchError) {
						recordFailure({
							source: 'figma',
							slug,
							version: `${version.major}.${version.minor}.${version.patch}`,
							ref: entry.figmaNodeIds.join(','),
							status: err.status,
							reason: err.message,
						});
					}
					console.warn(`     ⚠️  Figma: ${err.message}`);
				}
			}

			// Build component data
			const data: ComponentData = {
				slug,
				entry,
				version,
				api,
				zeroheight,
				storybook: sbGroup,
				storyExamples,
				basicUsage,
				figma: figmaTokens,
			};

			if (flags.dryRun) {
				console.log(`     DRY RUN — ${slug}: API=${api ? api.apis.length + ' classes' : 'none'}, ZH=${zeroheight ? 'yes' : 'no'}, SB=${sbGroup ? sbGroup.stories.length + ' stories' : 'no'}`);
				return { slug, status: 'dry-run' };
			}

			// ── Write all files ──────────────────────────────────────────

			// Clean previous design/ and examples/ to avoid stale files
			cleanVersionDirectory(config.output.skillsDir, slug, version);

			// Pre-compute design split + changelog so the API file links only to files actually
			// written (avoids dead ./design/_index.md and ./<slug>.changelog.md).
			const designResult = splitDesignSections(data);
			const hasDesign = !!designResult && designResult.designSections.length > 0;
			const clMd = buildComponentChangelog({
				slug,
				ngPackage: entry.ngPackage ?? null,
				version,
				zhProse: renderChangelogMd(data),
			});

			// Main API reference. hasFigma: tokens fetched this run, or a .figma.md kept from a
			// previous run (figma skipped/unavailable) — the link must survive either way.
			const hasFigma = figmaTokens !== null || figmaSkillExists(config.output.skillsDir, slug, version);
			const mdContent = renderComponentMd(data, { hasDesign, hasChangelog: clMd !== null, hasFigma });
			const result = writeVersionedSkill(config.output.skillsDir, slug, version, mdContent);

			// Design guidelines (designResult computed above)
			let codeSections: DesignSection[] = [];
			if (designResult) {
				codeSections = designResult.codeSections;
				if (designResult.designSections.length > 0) {
					const indexMd = renderDesignIndexMd(slug, designResult.designSections, designResult.overviewContent, entry.zeroheightPagePath ?? '');
					writeDesignIndex(config.output.skillsDir, slug, version, indexMd);
					for (const section of designResult.designSections) {
						const sectionMd = renderDesignSectionMd(slug, section);
						writeDesignSection(config.output.skillsDir, slug, version, section.fileSlug, sectionMd);
					}
				}
			}

			// Component page + individual stories (merged with ZH code sections)
			const componentPageMd = renderComponentPageMd(data, codeSections);
			if (componentPageMd) {
				writeComponentPage(config.output.skillsDir, slug, version, componentPageMd);
				if (storyExamples) {
					const scssImport = entry.ngPackage
						? `@forward '@lucca-front/scss/src/components/${entry.ngPackage}';`
						: '';
					for (const ex of storyExamples) {
						const storyMd = renderStoryMd(slug, ex, scssImport);
						writeStory(config.output.skillsDir, slug, version, ex.fileSlug, storyMd);
					}
				}
			}

			// Changelog — structural API diff (cumulative, from git tags) + optional ZH prose layer
			if (clMd) {
				writeChangelog(config.output.skillsDir, slug, version, clMd);
			}

			// Figma skill
			if (figmaTokens) {
				const figmaMd = renderFigmaMd(slug, [figmaTokens], config.figma.fileKey);
				writeFigmaSkill(config.output.skillsDir, slug, version, figmaMd);
			}

			const nDesign = hasDesign && designResult ? designResult.designSections.length : 0;
			const nStories = storyExamples?.length ?? 0;
			processed++;
			console.log(`  [${processed}/${totalComponents}] ✅ ${slug} — ${nStories} stories, ${nDesign} design${figmaTokens ? ', figma' : ''}`);
			successCount++;
			return { slug, status: result.status, data };
		} catch (err: any) {
			processed++;
			console.error(`  [${processed}/${totalComponents}] ❌ ${slug}: ${err.message}`);
			errorCount++;
			return { slug, status: 'error', error: err.message, data: null };
		}
	});

	// Write shared type definitions (deduplicated across all components)
	if (!flags.dryRun) {
		const allData = results.map(r => r.data).filter((d): d is ComponentData => d !== null);
		const sharedTypes = collectSharedTypeDefs(allData);
		for (const typeDef of sharedTypes) {
			const typeMd = renderSharedTypeMd(typeDef);
			const typeResult = writeSharedType(config.output.skillsDir, version, typeDef.typeName, typeMd);
			console.log(`  📎 ${typeDef.typeName}.md — ${typeResult.status} (${typeDef.values.length} values)`);
		}
	}

	// Write version manifest — full runs only: a component-scoped run (--component or replay)
	// would overwrite componentCount with the partial count of this run.
	if (!flags.dryRun && !componentScoped) {
		writeVersionManifest(config.output.skillsDir, version, successCount);
		console.log(`\n📋 Version manifest updated`);
	}

	console.log(`\n✅ ${version.tag}: ${successCount} generated, ${errorCount} errors`);
	return { success: successCount, errors: errorCount, componentMap };
}

main().catch((err: Error) => {
	console.error('\n❌ Fatal error:', err.message);
	if (process.env['DEBUG']) console.error(err.stack);
	process.exit(1);
});
