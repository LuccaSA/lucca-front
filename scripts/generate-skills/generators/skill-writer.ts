import fs from 'fs';
import path from 'path';
import { VersionConfig, VersionManifest, VersionManifestEntry, WriteResult } from '../types';

const SKILLS_BASE = 'lucca-front';

/**
 * Flat, self-contained per-version layout. Each version is a complete skill:
 *
 * lucca-front/<version>/                 (e.g. lucca-front/21.2.3/ — bare, matches the APM path)
 * ├── SKILL.md
 * └── references/
 *     ├── components/<slug>/
 *     │   ├── <slug>.md
 *     │   ├── <slug>.component.md
 *     │   ├── <slug>.figma.md
 *     │   ├── <slug>.changelog.md
 *     │   ├── design/{_index.md, <section>.md}
 *     │   └── stories/<fileSlug>.md
 *     ├── types/<TypeName>.md
 *     ├── documentation/<category>/<file>.md
 *     └── tools/<file>.md
 *
 * No interior version segments: the version lives once, at the top folder. A consumer
 * installs a single version, so cross-version dedup is irrelevant.
 */

/**
 * Version skill folder/name, e.g. "lucca-front-21-2-3".
 *
 * Dashes (not dots): APM reads a dotted leaf segment as a file extension and rejects it, and the
 * install dir is named from this leaf — so folder = skill name = APM install dir, all aligned.
 * Distinct per-version names let a monorepo install several versions side by side without collision.
 */
export function versionFolder(version: VersionConfig): string {
	return `${SKILLS_BASE}-${version.major}-${version.minor}-${version.patch}`;
}

/** Root of a single self-contained version skill: lucca-front/<version>/ */
export function versionRoot(skillsDir: string, version: VersionConfig): string {
	return path.resolve(skillsDir, SKILLS_BASE, versionFolder(version));
}

/**
 * Cleans the component's multi-file subdirectories (design/, stories/, examples/) before a
 * fresh generation, to prevent stale files (e.g. code sections moved to stories).
 */
export function cleanVersionDirectory(skillsDir: string, slug: string, version: VersionConfig): void {
	validateSlug(slug);
	const compDir = componentBaseDir(skillsDir, version, slug);
	for (const subDir of ['design', 'stories', 'examples']) {
		const dir = path.join(compDir, subDir);
		if (fs.existsSync(dir)) {
			fs.rmSync(dir, { recursive: true });
		}
	}
}

/**
 * Writes the main component API skill markdown.
 * Output: <version>/references/components/<slug>/<slug>.md
 */
export function writeVersionedSkill(skillsDir: string, slug: string, version: VersionConfig, content: string): WriteResult {
	validateSlug(slug);
	return writeFile(componentBaseDir(skillsDir, version, slug), `${slug}.md`, content);
}

/**
 * Writes the design index.
 * Output: <version>/references/components/<slug>/design/_index.md
 */
export function writeDesignIndex(skillsDir: string, slug: string, version: VersionConfig, content: string): WriteResult {
	validateSlug(slug);
	const designDir = path.join(componentBaseDir(skillsDir, version, slug), 'design');
	return writeFile(designDir, '_index.md', content);
}

/**
 * Writes an individual design section file.
 * Output: <version>/references/components/<slug>/design/<sectionSlug>.md
 */
export function writeDesignSection(skillsDir: string, slug: string, version: VersionConfig, sectionSlug: string, content: string): WriteResult {
	validateSlug(slug);
	const designDir = path.join(componentBaseDir(skillsDir, version, slug), 'design');
	return writeFile(designDir, `${sectionSlug}.md`, content);
}

/**
 * Writes the component page (implementation notes + stories listing).
 * Output: <version>/references/components/<slug>/<slug>.component.md
 */
export function writeComponentPage(skillsDir: string, slug: string, version: VersionConfig, content: string): WriteResult {
	validateSlug(slug);
	return writeFile(componentBaseDir(skillsDir, version, slug), `${slug}.component.md`, content);
}

/**
 * Writes an individual story file.
 * Output: <version>/references/components/<slug>/stories/<fileSlug>.md
 */
export function writeStory(skillsDir: string, slug: string, version: VersionConfig, fileSlug: string, content: string): WriteResult {
	validateSlug(slug);
	const storiesDir = path.join(componentBaseDir(skillsDir, version, slug), 'stories');
	return writeFile(storiesDir, `${fileSlug}.md`, content);
}

/**
 * Writes the changelog markdown, per component.
 * Output: <version>/references/components/<slug>/<slug>.changelog.md
 */
export function writeChangelog(skillsDir: string, slug: string, version: VersionConfig, content: string): WriteResult {
	validateSlug(slug);
	return writeFile(componentBaseDir(skillsDir, version, slug), `${slug}.changelog.md`, content);
}

/**
 * Writes a Figma design tokens file, per component.
 * Output: <version>/references/components/<slug>/<slug>.figma.md
 */
export function writeFigmaSkill(skillsDir: string, slug: string, version: VersionConfig, content: string): WriteResult {
	validateSlug(slug);
	return writeFile(componentBaseDir(skillsDir, version, slug), `${slug}.figma.md`, content);
}

/**
 * Writes/updates the _versions.json manifest at the dist root (lucca-front/_versions.json).
 * Generator/dist metadata — not part of any single version skill, not fetched by APM.
 */
export function writeVersionManifest(skillsDir: string, version: VersionConfig, componentCount: number): void {
	const manifestPath = path.resolve(skillsDir, SKILLS_BASE, '_versions.json');
	let manifest: VersionManifest;

	if (fs.existsSync(manifestPath)) {
		try {
			manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
		} catch {
			manifest = { latest: '', versions: {} };
		}
	} else {
		fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
		manifest = { latest: '', versions: {} };
	}

	const versionKey = `${version.major}.${version.minor}.${version.patch}`;
	const entry: VersionManifestEntry = {
		tag: version.tag,
		zhReleaseId: version.zhReleaseId,
		storybookBaseUrl: version.storybookBaseUrl,
		generatedAt: new Date().toISOString(),
		componentCount,
	};

	manifest.versions[versionKey] = entry;

	// Update latest to the highest version
	const allVersions = Object.keys(manifest.versions).sort((a, b) => {
		const [aMaj, aMin, aPat] = a.split('.').map(Number);
		const [bMaj, bMin, bPat] = b.split('.').map(Number);
		return aMaj !== bMaj ? bMaj - aMaj : aMin !== bMin ? bMin - aMin : bPat - aPat;
	});
	manifest.latest = allVersions[0] ?? versionKey;

	fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
}

// ─── Shared type writers ──────────────────────────────────────────────────────

/**
 * Writes a shared type definition file (shared across components within a version).
 * Output: <version>/references/types/<TypeName>.md
 */
export function writeSharedType(skillsDir: string, version: VersionConfig, typeName: string, content: string): WriteResult {
	const dir = path.join(versionRoot(skillsDir, version), 'references', 'types');
	return writeFile(dir, `${typeName}.md`, content);
}

/**
 * Writes the migrations page (ng update schematics) for a version.
 * Output: <version>/references/migrations.md
 */
export function writeMigrationsPage(skillsDir: string, version: VersionConfig, content: string): WriteResult {
	const dir = path.join(versionRoot(skillsDir, version), 'references');
	return writeFile(dir, 'migrations.md', content);
}

// ─── Documentation writers ────────────────────────────────────────────────────

/**
 * Writes a documentation page (tokens, content, guidelines, patterns, deprecated).
 * Output: <version>/references/documentation/<category>/<filename>.md
 */
export function writeDocumentationPage(
	skillsDir: string,
	version: VersionConfig,
	category: string,
	filename: string,
	content: string,
): WriteResult {
	const dir = path.join(versionRoot(skillsDir, version), 'references', 'documentation', category);
	return writeFile(dir, filename, content);
}

/**
 * Writes a tools page (mixins, animations, utilities).
 * Output: <version>/references/tools/<filename>.md
 */
export function writeToolsPage(
	skillsDir: string,
	version: VersionConfig,
	filename: string,
	content: string,
): WriteResult {
	const dir = path.join(versionRoot(skillsDir, version), 'references', 'tools');
	return writeFile(dir, filename, content);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function componentBaseDir(skillsDir: string, version: VersionConfig, slug: string): string {
	return path.join(versionRoot(skillsDir, version), 'references', 'components', slug);
}

function writeFile(dir: string, filename: string, content: string): WriteResult {
	const filePath = path.resolve(dir, filename);
	guardTraversal(filePath, dir);

	const isUpdate = fs.existsSync(filePath);
	fs.mkdirSync(dir, { recursive: true });
	fs.writeFileSync(filePath, content, 'utf-8');

	return { status: isUpdate ? 'updated' : 'created', path: filePath };
}

function validateSlug(slug: string): void {
	if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
		throw new Error(`Invalid slug "${slug}" — only [a-z0-9-] characters are allowed`);
	}
}

function guardTraversal(filePath: string, expectedDir: string): void {
	if (!filePath.startsWith(expectedDir + path.sep) && filePath !== expectedDir) {
		throw new Error(`Path traversal detected: ${filePath}`);
	}
}
