import fs from 'fs';
import path from 'path';
import { VersionConfig, VersionManifest, VersionManifestEntry, WriteResult } from '../types';

const SKILLS_BASE = 'lucca-front';

/**
 * New directory structure per component:
 *
 * references/components/<slug>/
 * ├── <slug>.figma.md          (unversioned)
 * ├── <slug>.changelog.md      (unversioned)
 * ├── v21.2.1/
 * │   ├── <slug>.md
 * │   ├── <slug>.design.md
 * │   └── stories/
 * │       ├── angular-basic.md
 * │       └── html-size.md
 * └── v21.2.0/
 *     └── ...
 */

/**
 * Cleans the versioned output directory (design/ and stories/) before a fresh generation.
 * Prevents stale files from previous runs (e.g., code sections moved to stories).
 */
export function cleanVersionDirectory(skillsDir: string, slug: string, version: VersionConfig): void {
	validateSlug(slug);
	const versionDir = componentVersionDir(skillsDir, slug, version);
	for (const subDir of ['design', 'stories', 'examples']) {
		const dir = path.join(versionDir, subDir);
		if (fs.existsSync(dir)) {
			fs.rmSync(dir, { recursive: true });
		}
	}
}

/**
 * Writes the main versioned component skill markdown.
 * Output: references/components/<slug>/<version>/<slug>.md
 */
export function writeVersionedSkill(skillsDir: string, slug: string, version: VersionConfig, content: string): WriteResult {
	validateSlug(slug);
	const versionDir = componentVersionDir(skillsDir, slug, version);
	return writeFile(versionDir, `${slug}.md`, content);
}

/**
 * Writes the design index.
 * Output: references/components/<slug>/<version>/design/_index.md
 */
export function writeDesignIndex(skillsDir: string, slug: string, version: VersionConfig, content: string): WriteResult {
	validateSlug(slug);
	const designDir = path.join(componentVersionDir(skillsDir, slug, version), 'design');
	return writeFile(designDir, '_index.md', content);
}

/**
 * Writes an individual design section file.
 * Output: references/components/<slug>/<version>/design/<sectionSlug>.md
 */
export function writeDesignSection(skillsDir: string, slug: string, version: VersionConfig, sectionSlug: string, content: string): WriteResult {
	validateSlug(slug);
	const designDir = path.join(componentVersionDir(skillsDir, slug, version), 'design');
	return writeFile(designDir, `${sectionSlug}.md`, content);
}

/**
 * Writes the component page (implementation notes + stories listing).
 * Output: references/components/<slug>/<version>/<slug>.component.md
 */
export function writeComponentPage(skillsDir: string, slug: string, version: VersionConfig, content: string): WriteResult {
	validateSlug(slug);
	const versionDir = componentVersionDir(skillsDir, slug, version);
	return writeFile(versionDir, `${slug}.component.md`, content);
}

/**
 * Writes an individual story file.
 * Output: references/components/<slug>/<version>/stories/<fileSlug>.md
 */
export function writeStory(skillsDir: string, slug: string, version: VersionConfig, fileSlug: string, content: string): WriteResult {
	validateSlug(slug);
	const storiesDir = path.join(componentVersionDir(skillsDir, slug, version), 'stories');
	return writeFile(storiesDir, `${fileSlug}.md`, content);
}

/**
 * Writes the changelog markdown (unversioned, per component).
 * Output: references/components/<slug>/<slug>.changelog.md
 */
export function writeChangelog(skillsDir: string, slug: string, content: string): WriteResult {
	validateSlug(slug);
	const compDir = componentBaseDir(skillsDir, slug);
	return writeFile(compDir, `${slug}.changelog.md`, content);
}

/**
 * Writes a Figma design tokens file (unversioned, per component).
 * Output: references/components/<slug>/<slug>.figma.md
 */
export function writeFigmaSkill(skillsDir: string, slug: string, content: string): WriteResult {
	validateSlug(slug);
	const compDir = componentBaseDir(skillsDir, slug);
	return writeFile(compDir, `${slug}.figma.md`, content);
}

/**
 * Writes/updates the _versions.json manifest.
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
 * Writes a shared type definition file (versioned, shared across components).
 * Output: references/types/<version>/<TypeName>.md
 */
export function writeSharedType(skillsDir: string, version: VersionConfig, typeName: string, content: string): WriteResult {
	const dir = path.resolve(skillsDir, SKILLS_BASE, 'references', 'types', version.tag);
	return writeFile(dir, `${typeName}.md`, content);
}

// ─── Documentation writers ────────────────────────────────────────────────────

/**
 * Writes a documentation page (tokens, content, guidelines, patterns).
 * Output: references/documentation/<category>/v<M>.<m>/<filename>.md
 *
 * @param category — e.g. "tokens", "content", "guidelines", "patterns"
 * @param minorVersion — e.g. "21.2" (ZH versioned by minor)
 * @param filename — e.g. "couleurs.md", "typographie.md"
 */
export function writeDocumentationPage(
	skillsDir: string,
	category: string,
	minorVersion: string,
	filename: string,
	content: string,
): WriteResult {
	const dir = path.resolve(skillsDir, SKILLS_BASE, 'references', 'documentation', category, `v${minorVersion}`);
	return writeFile(dir, filename, content);
}

/**
 * Writes a tools page (mixins, animations, utilities).
 * Output: references/tools/v<M>.<m>/<filename>.md
 *
 * Versioned by **minor** (same as documentation) since ZeroHeight has one release per minor.
 *
 * @param minorVersion — e.g. "21.2"
 */
export function writeToolsPage(
	skillsDir: string,
	minorVersion: string,
	filename: string,
	content: string,
): WriteResult {
	const dir = path.resolve(skillsDir, SKILLS_BASE, 'references', 'tools', `v${minorVersion}`);
	return writeFile(dir, filename, content);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function componentBaseDir(skillsDir: string, slug: string): string {
	return path.resolve(skillsDir, SKILLS_BASE, 'references', 'components', slug);
}

function componentVersionDir(skillsDir: string, slug: string, version: VersionConfig): string {
	return path.join(componentBaseDir(skillsDir, slug), version.tag);
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
