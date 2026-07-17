/**
 * Dynamic component discovery — builds the component list from Storybook index.json
 * instead of relying on a static component-map.json.
 *
 * Components are auto-discovered from the Storybook index:
 *   - slug, category, storybookSlug come from the index grouping
 *   - ngPackage is auto-detected by scanning `packages/ng/` in the git tag
 *   - zeroheightPagePath and figmaNodeIds come from an optional metadata file
 *
 * This replaces the need for a manually maintained component-map.json.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ComponentEntry, StorybookGroup, VersionConfig } from '../types';

// ─── Optional metadata map ──────────────────────────────────────────────────

export interface ComponentMetadata {
	/** ZeroHeight page path segment, e.g. "098404-button". */
	zeroheightPagePath?: string;
	/** Figma node IDs for Code Connect. */
	figmaNodeIds?: string[];
	/** Figma component name(s). */
	figmaName?: string;
	figmaAliases?: string[];
	/** Override ngPackage name (for irregular slug → package mappings).
	 * May be a secondary entrypoint path with a slash, e.g. "forms/phone-number-input". */
	ngPackageOverride?: string;
	/** Restrict the extracted API to these selectors (scope one component out of a multi-component package). */
	ngSelectors?: string[];
}

export type MetadataMap = Record<string, ComponentMetadata>;

const METADATA_PATH = path.join(__dirname, '..', 'component-metadata.json');

export function loadMetadataMap(): MetadataMap {
	if (!fs.existsSync(METADATA_PATH)) return {};
	try {
		return JSON.parse(fs.readFileSync(METADATA_PATH, 'utf-8'));
	} catch {
		return {};
	}
}

// ─── ngPackage discovery ─────────────────────────────────────────────────────

/**
 * Lists all ng package directory names at a given git tag.
 * Returns a Set of hyphenated names like "horizontal-navigation", "button", etc.
 */
export function listNgPackages(tag: string): Set<string> {
	try {
		const output = execSync(`git show ${tag}:packages/ng/ 2>/dev/null`, { encoding: 'utf-8' });
		const names = new Set<string>();
		for (const line of output.split('\n')) {
			const trimmed = line.replace(/\/$/, '').trim();
			if (trimmed && !trimmed.startsWith('tree ') && !trimmed.includes('.')) {
				names.add(trimmed);
			}
		}
		return names;
	} catch {
		return new Set();
	}
}

/**
 * Slug → ngPackage resolution strategies (in order of priority):
 * 1. Exact match: slug === package name (e.g., "button" → "button")
 * 2. Hyphenated match: slug "horizontalnavigation" → package "horizontal-navigation"
 * 3. Metadata override: explicit mapping in component-metadata.json
 */
export function resolveNgPackage(slug: string, ngPackages: Set<string>, metadata?: ComponentMetadata): string | undefined {
	// 1. Metadata override (highest priority)
	if (metadata?.ngPackageOverride) {
		const override = metadata.ngPackageOverride;
		// Secondary entrypoint (e.g. "forms/phone-number-input"): not a top-level package dir, so trust it
		// as-is — extractPackageAPI resolves its public-api.ts via git and degrades to no API if absent.
		if (override.includes('/')) return override;
		return ngPackages.has(override) ? override : undefined;
	}

	// 2. Exact match
	if (ngPackages.has(slug)) return slug;

	// 3. Slug is concatenated, package is hyphenated
	// Try inserting hyphens at word boundaries
	for (const pkg of ngPackages) {
		const compacted = pkg.replace(/-/g, '');
		if (compacted === slug) return pkg;
	}

	return undefined;
}

// ─── Metadata lookup helpers ────────────────────────────────────────────────

/**
 * Finds metadata for a slug, trying both exact and compact (no hyphens) forms.
 * Handles mismatch between Storybook slugs and metadata keys (e.g., "errorpage" ↔ "error-page").
 */
function findMetadata(slug: string, metadata: MetadataMap): ComponentMetadata | undefined {
	if (metadata[slug]) return metadata[slug];
	const slugCompact = slug.replace(/-/g, '');
	for (const [key, value] of Object.entries(metadata)) {
		if (key.replace(/-/g, '') === slugCompact) return value;
	}
	return undefined;
}

// ─── Main discovery ──────────────────────────────────────────────────────────

export interface DiscoveredComponent {
	slug: string;
	entry: ComponentEntry;
}

/**
 * Builds the component list dynamically from a Storybook index + git tag.
 *
 * @param storybookMap - The grouped storybook index (already fetched)
 * @param version - Version config for git tag access
 * @returns Array of discovered components with their entries
 */
export function discoverComponents(
	storybookMap: Map<string, StorybookGroup>,
	version: VersionConfig,
): DiscoveredComponent[] {
	const metadata = loadMetadataMap();
	const ngPackages = listNgPackages(version.tag);

	console.log(`  🔍 Discovery: ${storybookMap.size} Storybook groups, ${ngPackages.size} ng packages, ${Object.keys(metadata).length} metadata entries`);

	const components: DiscoveredComponent[] = [];
	const seenCompact = new Set<string>();
	let skipped = 0;

	// Storybook slugs that are legacy or contextual stories, not standalone components.
	// They duplicate a real component under a different slug.
	const EXCLUDED_SLUGS = new Set([
		'radio',  // Legacy "Textfield Legacy/Radio" — use radiofield instead
		'switch', // Isolated "Forms/Switch/Basic" — use switchfield instead
		'icon',   // Contextual "Texts/Label/Icon" — use icons instead
	]);

	// Phase 1: Discover from Storybook groups
	for (const [sbSlug, group] of storybookMap) {
		if (EXCLUDED_SLUGS.has(sbSlug)) {
			skipped++;
			continue;
		}

		const meta = findMetadata(sbSlug, metadata);
		const ngPackage = resolveNgPackage(sbSlug, ngPackages, meta);

		// Filter: only include groups that are real components
		const isRealComponent = !!ngPackage || !!meta;
		if (!isRealComponent) {
			skipped++;
			continue;
		}

		// Deduplicate by compact form
		const compact = sbSlug.replace(/-/g, '');
		if (seenCompact.has(compact)) {
			console.warn(`     ⚠️  Compact collision: "${sbSlug}" collides with existing slug (compact: ${compact})`);
			continue;
		}
		seenCompact.add(compact);

		const entry: ComponentEntry = {
			storybookSlug: sbSlug,
			storybookPath: group.docsEntry?.title,
			category: group.category,
			ngPackage,
			ngSelectors: meta?.ngSelectors,
			zeroheightPagePath: meta?.zeroheightPagePath,
			figmaNodeIds: meta?.figmaNodeIds,
			figmaName: meta?.figmaName,
			figmaAliases: meta?.figmaAliases,
		};

		components.push({ slug: sbSlug, entry });
	}

	// Phase 2: Add metadata-only entries (not in Storybook for this version).
	// Require ngPackage: without Storybook presence, ngPackage proves the component exists in this version.
	let metadataSkipped = 0;
	for (const [slug, meta] of Object.entries(metadata)) {
		const compact = slug.replace(/-/g, '');
		if (seenCompact.has(compact)) continue;

		const ngPackage = resolveNgPackage(slug, ngPackages, meta);
		if (!ngPackage) {
			metadataSkipped++;
			console.log(`     ℹ️  metadata-only "${slug}" ignoré (pas de ngPackage pour cette version)`);
			continue;
		}
		seenCompact.add(compact);

		const entry: ComponentEntry = {
			category: 'Unknown',
			ngPackage,
			ngSelectors: meta.ngSelectors,
			zeroheightPagePath: meta.zeroheightPagePath,
			figmaNodeIds: meta.figmaNodeIds,
			figmaName: meta.figmaName,
			figmaAliases: meta.figmaAliases,
		};

		components.push({ slug, entry });
	}

	// Sort for deterministic output
	components.sort((a, b) => a.slug.localeCompare(b.slug));

	// Stats
	const withNg = components.filter(c => c.entry.ngPackage).length;
	const withZh = components.filter(c => c.entry.zeroheightPagePath).length;
	const withFigma = components.filter(c => c.entry.figmaNodeIds?.length).length;
	if (metadataSkipped > 0) {
		console.log(`  🚫 ${metadataSkipped} metadata-only entries sans ngPackage ignorées (composant absent de cette version)`);
	}
	console.log(`  📊 ${components.length} composants (${skipped} groupes Storybook ignorés)`);
	console.log(`     ${withNg} avec API Angular, ${withZh} avec ZeroHeight, ${withFigma} avec Figma`);

	return components;
}
