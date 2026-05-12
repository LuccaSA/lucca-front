/**
 * sync-metadata.ts — Generates component-metadata.json deterministically.
 *
 * Sources:
 * - ZeroHeight page paths: hardcoded from Prisme MCP list-pages (stable page IDs)
 * - ngPackageOverride: computed from Storybook slug vs git `packages/ng/`
 * - Figma data: preserved from existing metadata (manual, not auto-discoverable)
 *
 * Usage:
 *   npx ts-node scripts/generate-skills/sync-metadata.ts --version 21.2.1
 *   npx ts-node scripts/generate-skills/sync-metadata.ts --version 21.2.1 --dry-run
 *
 * Run this BEFORE generating skills to ensure metadata is up-to-date.
 * It is also called automatically from index.ts during generation.
 */

import fs from 'fs';
import path from 'path';
import { fetchStorybookIndex } from './collectors/storybook';
import { listNgPackages, resolveNgPackage, loadMetadataMap, ComponentMetadata, MetadataMap } from './collectors/component-discovery';
import { resolveVersion } from './version-config';
import { StorybookGroup } from './types';

// ─── ZeroHeight page map ────────────────────────────────────────────────────
// Extracted from Prisme MCP list-pages. Page IDs are stable across versions.
// Only the release ID in the URL changes (handled by version-config.ts).
//
// Format: { "ZH Page Name": "hexPagePath" }
// The hex path is the last segment of: https://prisme.lucca.io/94310e217/v/{release}/p/{hexPath}

const ZH_PAGES: Record<string, string> = {
	// Actions
	'Button': '098404',
	'Link': '95303b',
	// Feedbacks
	'Callout': '64c8d8',
	'Toast': '12eaab',
	'Error page': '1622d2',
	'Gauge': '75e507',
	'Page empty state': '49b0ef',
	'Onboarding empty state': '9490c7',
	'Section empty state': '97ca09',
	// Formulaires
	'Textfield': '459eda',
	'Textarea': '60990a',
	'Checkbox': '42c88e',
	'Radio': '45f82a',
	'Switch': '39c7b7',
	'Select simple': '587833',
	'Select multiple': '927519',
	'Date picker': '87a48d',
	'Date range picker': '00bf9b',
	'Calendar': '76c144',
	'Time and Duration picker': '2473a1',
	'Color picker': '16e1d1',
	'Phone number field': '896abf',
	'Multi language textfield': '5428d4',
	'Rich textfield': '92f33b',
	'Form field': '810797',
	'Form label': '3491a2',
	'Fieldset': '431e99',
	'Form layout': '36780d',
	'Input framed': '28896d',
	'Clear': '80fb2d',
	'Inline message': '43a580',
	'File upload': '8282a5',
	'Data presentation': '02bfb1',
	'Listbox': '005487',
	// Listes
	'Chip': '3960bc',
	'Data table': '4263a5',
	'Index table': '24fc14',
	'Listing': '170797',
	'Sortable list': '883e34',
	'Activity feed': '3541ee',
	// Loaders
	'Loading': '91e25d',
	'Progress bar': '916abd',
	'Skeleton': '4819e2',
	// Navigation
	'Horizontal navigation': '29aaef',
	'Vertical navigation': '205934',
	'Breadcrumbs': '691d7f',
	'Pagination': '093a9c',
	'Segmented control': '88f854',
	'Table of content': '05ca4d',
	'Side navigation': '160093',
	'Skip links': '48aefc',
	'Mobile navigation': '337b80',
	'Timeline': '288e66',
	'Progress stepper': '8211e2',
	// Overlays
	'Modal': '4068ed',
	'Dialogs': '841b0b',
	'Dropdown': '557682',
	'Popover': '129fae',
	'Tooltip': '9285d2',
	'Fancy dialog': '32b1a9',
	// Structure
	'App layout': '2615fa',
	'Container': '453b4f',
	'Box': '1926ca',
	'Card': '878482',
	'Page header': '6598e9',
	'Footer': '419504',
	'Divider': '22632c',
	'Section': '799d1e',
	'Fancy box': '19c95b',
	'Grid': '955d69',
	'Highlight data': '1827fe',
	'Filter bar': '13044b',
	'Filter pill': '053be4',
	'Mobile header': '6771ab',
	'Resource card': '44a682',
	// Textes
	'Code': '85d53c',
	'Tag': '6036ad',
	'Status badge': '425d98',
	'Numeric badge': '0548ef',
	'New badge': '36bcdf',
	'Title and text': '021fef',
	'Comment': '08238a',
	'Read more': '5054f0',
	'Text flow': '51e878',
	'PLG Push': '6035eb',
	'Mobile push': '268432',
	// Users
	'Avatar': '42b330',
	'User tile': '56d611',
	'Display name': '05750c',
	'User popover': '85b183',
	// Iconographie
	'Icon': '9826b3',
	'Bubble illustration': '30a66f',
	'Bubble icon': '00d34a',
	'Software icon': '37e39b',
	// Outils
	'Scrollbox': '866ad0',
	'Numbers': '49fa5a',
	'Mixins': '94f032',
	'Utilitaires': '21a286',
	'Animations': '85c178',
};

// ─── Slug-to-ZH-name mapping ────────────────────────────────────────────────
// Maps Storybook slugs to ZH page names when they don't match by normalization.
// Only needed for non-obvious mappings.

const SLUG_TO_ZH_NAME: Record<string, string> = {
	'activity-feed': 'Activity feed',
	'app-layout': 'App layout',
	'bubble-icon': 'Bubble icon',
	'bubble-illustration': 'Bubble illustration',
	'callout-disclosure': 'Callout',
	'callout-popover': 'Callout',
	'checkbox': 'Checkbox',
	'color-picker': 'Color picker',
	'comment': 'Comment',
	'data-presentation': 'Data presentation',
	'data-table': 'Data table',
	'dateinput': 'Date picker',
	'daterangeinput': 'Date range picker',
	'dialog': 'Dialogs',
	'display-name': 'Display name',
	'duration-picker': 'Time and Duration picker',
	'empty-state': 'Page empty state',
	'errorpage': 'Error page',
	'fancy-dialog': 'Fancy dialog',
	'fancybox': 'Fancy box',
	'fileentry': 'File upload',
	'fileupload': 'File upload',
	'filterbar': 'Filter bar',
	'filterpills': 'Filter pill',
	'form-field': 'Form field',
	'form-label': 'Form label',
	'form-layout': 'Form layout',
	'highlight-data': 'Highlight data',
	'horizontalnavigation': 'Horizontal navigation',
	'icons': 'Icon',
	'index-table': 'Index table',
	'inlinemessage': 'Inline message',
	'input-framed': 'Input framed',
	'listing': 'Listing',
	'mobile-header': 'Mobile header',
	'mobile-push': 'Mobile push',
	'mobilenavigation': 'Mobile navigation',
	'modal': 'Modal',
	'multi-select': 'Select multiple',
	'multilanguagefield': 'Multi language textfield',
	'newbadge': 'New badge',
	'numericbadge': 'Numeric badge',
	'onboarding-empty-state': 'Onboarding empty state',
	'pageheader': 'Page header',
	'phonenumberfield': 'Phone number field',
	'plg-push': 'PLG Push',
	'progress-bar': 'Progress bar',
	'progress-stepper': 'Progress stepper',
	'radiofield': 'Radio',
	'readmore': 'Read more',
	'resource-card': 'Resource card',
	'richtextinput': 'Rich textfield',
	'scrollbox': 'Scrollbox',
	'section': 'Section',
	'section-empty-state': 'Section empty state',
	'segmentedcontrol': 'Segmented control',
	'side-navigation': 'Side navigation',
	'simple-select': 'Select simple',
	'skiplinks': 'Skip links',
	'software-icon': 'Software icon',
	'sortable-list': 'Sortable list',
	'statusbadge': 'Status badge',
	'switchfield': 'Switch',
	'tableofcontent': 'Table of content',
	'tags': 'Tag',
	'text-flow': 'Text flow',
	'textareafield': 'Textarea',
	'textfield': 'Textfield',
	'tile': 'User tile',
	'time-picker': 'Time and Duration picker',
	'timelines': 'Timeline',
	'title-and-text': 'Title and text',
	'toasts': 'Toast',
	'userpopover': 'User popover',
	'verticalnavigation': 'Vertical navigation',
};

// ─── ZH path resolution ─────────────────────────────────────────────────────

function resolveZhPagePath(slug: string): string | undefined {
	// 1. Explicit slug → ZH name mapping
	const zhName = SLUG_TO_ZH_NAME[slug];
	if (zhName && ZH_PAGES[zhName]) return ZH_PAGES[zhName];

	// 2. Direct match by slug (capitalize first letter)
	const titleCase = slug.charAt(0).toUpperCase() + slug.slice(1);
	if (ZH_PAGES[titleCase]) return ZH_PAGES[titleCase];

	// 3. Match by normalized comparison
	const slugNorm = slug.replace(/-/g, '').toLowerCase();
	for (const [name, pagePath] of Object.entries(ZH_PAGES)) {
		const nameNorm = name.replace(/[^a-z0-9]/gi, '').toLowerCase();
		if (nameNorm === slugNorm) return pagePath;
	}

	return undefined;
}

// ─── Main sync function ──────────────────────────────────────────────────────

export interface SyncResult {
	added: string[];
	updated: string[];
	removed: string[];
	warnings: string[];
}

/**
 * Synchronizes component-metadata.json from Storybook + git + ZH page map.
 *
 * - Adds new entries for newly discovered components
 * - Computes ngPackageOverride where auto-resolution fails
 * - Resolves ZH page paths from the hardcoded ZH page map
 * - Preserves Figma data (manual, not auto-discoverable)
 *
 * @param storybookMap - Storybook index groups (may be empty if --skip-storybook)
 * @param version - Version config for git tag access
 * @param dryRun - If true, don't write the file
 * @returns Summary of changes
 */
export function syncMetadata(
	storybookMap: Map<string, StorybookGroup>,
	version: ReturnType<typeof resolveVersion>,
	dryRun = false,
): SyncResult {
	const existing = loadMetadataMap();
	const ngPackages = listNgPackages(version.tag);
	const result: SyncResult = { added: [], updated: [], removed: [], warnings: [] };

	// Collect all slugs from Storybook (use compact dedup like discovery)
	const seenCompact = new Set<string>();
	const discoveredSlugs = new Set<string>();

	// Storybook slugs that are legacy or contextual stories, not standalone components.
	const EXCLUDED_SLUGS = new Set(['radio', 'switch', 'icon']);

	for (const [sbSlug] of storybookMap) {
		if (EXCLUDED_SLUGS.has(sbSlug)) continue;
		const compact = sbSlug.replace(/-/g, '');
		if (seenCompact.has(compact)) continue;
		seenCompact.add(compact);
		discoveredSlugs.add(sbSlug);
	}

	// Also include existing metadata slugs
	for (const slug of Object.keys(existing)) {
		discoveredSlugs.add(slug);
		seenCompact.add(slug.replace(/-/g, ''));
	}

	const updated: MetadataMap = {};

	for (const slug of [...discoveredSlugs].sort()) {
		// Find existing entry (with compact matching)
		let entry: ComponentMetadata = {};
		const compact = slug.replace(/-/g, '');
		for (const [key, value] of Object.entries(existing)) {
			if (key === slug || key.replace(/-/g, '') === compact) {
				entry = { ...value };
				break;
			}
		}

		// Resolve ZH page path
		const zhPath = resolveZhPagePath(slug);
		if (zhPath && entry.zeroheightPagePath !== zhPath) {
			if (entry.zeroheightPagePath && entry.zeroheightPagePath !== zhPath) {
				result.warnings.push(`${slug}: ZH path changed ${entry.zeroheightPagePath} → ${zhPath}`);
			}
			entry.zeroheightPagePath = zhPath;
		}

		// Compute ngPackageOverride
		const needsOverride = !ngPackages.has(slug) && !([...ngPackages].some(pkg => pkg.replace(/-/g, '') === slug));
		if (needsOverride) {
			// Try to find the right package by checking existing override or known mappings
			const currentOverride = entry.ngPackageOverride;
			if (currentOverride && ngPackages.has(currentOverride)) {
				// Keep existing valid override
			} else {
				// No valid override — remove stale one
				delete entry.ngPackageOverride;
			}
		} else {
			// Auto-resolution works — remove unnecessary override
			delete entry.ngPackageOverride;
		}

		// Only include entries that have at least one useful field
		if (Object.keys(entry).length > 0) {
			const isNew = !Object.keys(existing).some(k => k === slug || k.replace(/-/g, '') === compact);
			if (isNew) result.added.push(slug);
			updated[slug] = entry;
		}
	}

	// Detect changes
	for (const slug of Object.keys(updated)) {
		if (!result.added.includes(slug)) {
			const oldCompact = slug.replace(/-/g, '');
			const oldEntry = existing[slug] || Object.entries(existing).find(([k]) => k.replace(/-/g, '') === oldCompact)?.[1];
			if (oldEntry && JSON.stringify(oldEntry) !== JSON.stringify(updated[slug])) {
				result.updated.push(slug);
			}
		}
	}

	// Warn about components without ZH pages
	for (const slug of Object.keys(updated)) {
		if (!updated[slug].zeroheightPagePath) {
			result.warnings.push(`${slug}: no ZeroHeight page path (add to SLUG_TO_ZH_NAME in sync-metadata.ts)`);
		}
	}

	if (!dryRun) {
		const metaPath = path.join(__dirname, 'component-metadata.json');
		fs.writeFileSync(metaPath, JSON.stringify(updated, null, '\t') + '\n');
	}

	return result;
}

// ─── CLI entry point ─────────────────────────────────────────────────────────

async function main() {
	const args = process.argv.slice(2);
	const versionIdx = args.indexOf('--version');
	const dryRun = args.includes('--dry-run');

	if (versionIdx === -1 || !args[versionIdx + 1]) {
		console.error('Usage: npx ts-node sync-metadata.ts --version 21.2.1 [--dry-run]');
		process.exit(1);
	}

	const version = resolveVersion(args[versionIdx + 1]);
	console.log(`🔄 Syncing component-metadata.json for ${version.tag}...\n`);

	// Fetch Storybook index
	let storybookMap = new Map<string, StorybookGroup>();
	try {
		storybookMap = await fetchStorybookIndex(version);
	} catch (err: any) {
		console.warn(`  ⚠️  Storybook unavailable: ${err.message}`);
	}

	const result = syncMetadata(storybookMap, version, dryRun);

	if (result.added.length) {
		console.log(`\n✅ Added (${result.added.length}):`);
		for (const s of result.added) console.log(`  + ${s}`);
	}
	if (result.updated.length) {
		console.log(`\n📝 Updated (${result.updated.length}):`);
		for (const s of result.updated) console.log(`  ~ ${s}`);
	}
	if (result.warnings.length) {
		console.log(`\n⚠️  Warnings (${result.warnings.length}):`);
		for (const w of result.warnings) console.log(`  ${w}`);
	}

	const total = Object.keys(require('./component-metadata.json')).length;
	if (dryRun) {
		console.log(`\n🏷️  DRY RUN — ${total} entries would be written`);
	} else {
		console.log(`\n✅ component-metadata.json updated (${total} entries)`);
	}
}

if (require.main === module) {
	main().catch(err => {
		console.error(err);
		process.exit(1);
	});
}
