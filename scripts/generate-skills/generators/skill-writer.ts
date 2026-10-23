import fs from 'fs';
import path from 'path';
import { SkillManifest, VersionConfig, WriteResult, PatchManifestEntry } from '../types';
import { TechnicalMinorPatches } from '../version-config';

/**
 * Folder = SKILL.md `name:` = install dir leaf. One skill, no version in its name: the version is the
 * git ref a consumer pins with APM (`LuccaSA/lucca-front/.github/skills/lucca-front#v22.1.1`), so a
 * branch carries exactly one minor of it.
 *
 * lucca-front/
 * ├── SKILL.md
 * ├── references/                        ← content of the LATEST published patch of the minor
 * │   ├── components/<slug>/
 * │   │   ├── <slug>.md                  (API + trailing ## Changelog section)
 * │   │   ├── <slug>.component.md        (implementation notes + every story inline)
 * │   │   ├── <slug>.design.md           (all ZH design sections inline)
 * │   │   └── <slug>.figma.md
 * │   ├── types/<TypeName>.md
 * │   ├── documentation/<category>/<file>.md
 * │   ├── tools/<file>.md
 * │   └── migrations.md
 * └── fixes/<M-m-p>.md                   ← one file per published patch > .0 (delta vs previous)
 */
export const SKILL_NAME = 'lucca-front';

/** Generator metadata (manifest, review changelog): beside the skill, so APM never installs it. */
const GENERATOR_DIR = '_lucca-front';

export function skillRoot(skillsDir: string): string {
	return path.resolve(skillsDir, SKILL_NAME);
}

export function generatorRoot(skillsDir: string): string {
	return path.resolve(skillsDir, GENERATOR_DIR);
}

function manifestPath(skillsDir: string): string {
	return path.join(generatorRoot(skillsDir), 'versions.json');
}

/** The manifest of the committed skill, or null before the first generation. */
export function readSkillManifest(skillsDir: string): SkillManifest | null {
	try {
		return JSON.parse(fs.readFileSync(manifestPath(skillsDir), 'utf-8'));
	} catch {
		return null;
	}
}

/**
 * Cleans stale component files before a fresh generation: legacy multi-file subdirectories
 * (design/, stories/, examples/ — pre-merge layout) and per-run optional files that would
 * otherwise linger when their source disappears (<slug>.design.md, <slug>.component.md, legacy
 * <slug>.changelog.md).
 *
 * `<slug>.component.md` belongs here for the same reason as `<slug>.design.md`: it is written only
 * when there is something to show. It was missing from the list, so three pages that the generator
 * had stopped producing survived on disk from an earlier run — a fresh output directory had none of
 * them while the committed one still did. A file the pipeline no longer emits must not outlive it.
 */
export function cleanComponentDirectory(skillsDir: string, slug: string): void {
	validateSlug(slug);
	const compDir = componentBaseDir(skillsDir, slug);
	for (const subDir of ['design', 'stories', 'examples']) {
		const dir = path.join(compDir, subDir);
		if (fs.existsSync(dir)) {
			fs.rmSync(dir, { recursive: true });
		}
	}
	for (const file of [`${slug}.design.md`, `${slug}.component.md`, `${slug}.changelog.md`]) {
		const p = path.join(compDir, file);
		if (fs.existsSync(p)) fs.rmSync(p);
	}
}

/**
 * Writes the main component API skill markdown.
 * Output: lucca-front/references/components/<slug>/<slug>.md
 */
export function writeComponentApi(skillsDir: string, slug: string, content: string): WriteResult {
	validateSlug(slug);
	return writeFile(componentBaseDir(skillsDir, slug), `${slug}.md`, content);
}

/**
 * Writes the merged design guidelines file.
 * Output: lucca-front/references/components/<slug>/<slug>.design.md
 */
export function writeDesign(skillsDir: string, slug: string, content: string): WriteResult {
	validateSlug(slug);
	return writeFile(componentBaseDir(skillsDir, slug), `${slug}.design.md`, content);
}

/**
 * Writes the component page (implementation notes + every story inline).
 * Output: lucca-front/references/components/<slug>/<slug>.component.md
 */
export function writeComponentPage(skillsDir: string, slug: string, content: string): WriteResult {
	validateSlug(slug);
	return writeFile(componentBaseDir(skillsDir, slug), `${slug}.component.md`, content);
}

/**
 * Writes a Figma design tokens file, per component.
 * Output: lucca-front/references/components/<slug>/<slug>.figma.md
 */
export function writeFigmaSkill(skillsDir: string, slug: string, content: string): WriteResult {
	validateSlug(slug);
	return writeFile(componentBaseDir(skillsDir, slug), `${slug}.figma.md`, content);
}

/**
 * Whether a `<slug>.figma.md` from a previous run exists on disk. Used so a run without Figma
 * (--skip-figma, missing token, transient failure) keeps linking the existing file instead of
 * silently dropping the link from `<slug>.md`.
 */
export function figmaSkillExists(skillsDir: string, slug: string): boolean {
	validateSlug(slug);
	return fs.existsSync(path.join(componentBaseDir(skillsDir, slug), `${slug}.figma.md`));
}

/**
 * Rewrites the manifest of the skill (`_lucca-front/versions.json`). Generator/dist metadata, read by
 * `scripts/llms-skill` to find the minor the committed skill documents — not part of the skill.
 *
 * `patches` records every published patch of the minor (its tag and patch-exact Storybook URL), so no
 * patch-level metadata is lost by the minor granularity.
 */
export function writeSkillManifest(
	skillsDir: string,
	version: VersionConfig,
	componentCount: number,
	patchTags: string[],
	technicalMinors: TechnicalMinorPatches[] = [],
): void {
	const manifest: SkillManifest = {
		minor: `${version.major}.${version.minor}`,
		latestPatch: `${version.major}.${version.minor}.${version.patch}`,
		tag: version.tag,
		zhReleaseId: version.zhReleaseId,
		storybookBaseUrl: version.storybookBaseUrl,
		componentCount,
		patches: patchesEntry(patchTags),
	};
	if (technicalMinors.length > 0) {
		manifest.technicalMinors = Object.fromEntries(
			technicalMinors.map((t) => [
				t.minorKey,
				{
					reason: t.reason,
					// A technical minor can have no local tag (a clone without `fetch --tags`, or an entry
					// added to TECHNICAL_MINORS before its first tag) — and this ran after 126 components.
					latestPatch: t.patchTags.at(-1)?.replace(/^v/, '') ?? null,
					patches: patchesEntry(t.patchTags),
				},
			]),
		);
	}

	fs.mkdirSync(generatorRoot(skillsDir), { recursive: true });
	fs.writeFileSync(manifestPath(skillsDir), JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
}

function patchesEntry(patchTags: string[]): Record<string, PatchManifestEntry> {
	return Object.fromEntries(
		patchTags.map((tag) => {
			const bare = tag.replace(/^v/, '');
			return [bare, { tag, storybookBaseUrl: `https://lucca-front.lucca.io/${tag}/storybook` }];
		}),
	);
}

// ─── Fixes writers ────────────────────────────────────────────────────────────

/**
 * Writes a per-patch fix file (delta vs the previous published patch).
 * Output: lucca-front/fixes/<M-m-p>.md (e.g. lucca-front/fixes/22-0-1.md)
 */
export function writeFixFile(skillsDir: string, patchVersion: string, content: string): WriteResult {
	const dir = path.join(skillRoot(skillsDir), 'fixes');
	return writeFile(dir, `${patchVersion.replace(/\./g, '-')}.md`, content);
}

/** Removes the content of the skill (references/, fixes/), keeping SKILL.md until it is rewritten. */
export function clearSkillContent(skillsDir: string): void {
	for (const dir of ['references', 'fixes']) {
		fs.rmSync(path.join(skillRoot(skillsDir), dir), { recursive: true, force: true });
	}
}

/** Removes the fixes/ folder before a fresh generation (stale fix files). */
export function cleanFixesDirectory(skillsDir: string): void {
	const dir = path.join(skillRoot(skillsDir), 'fixes');
	if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
}

// ─── Shared type writers ──────────────────────────────────────────────────────

/**
 * Writes a shared type definition file (shared across components).
 * Output: lucca-front/references/types/<TypeName>.md
 */
export function writeSharedType(skillsDir: string, typeName: string, content: string): WriteResult {
	const dir = path.join(skillRoot(skillsDir), 'references', 'types');
	return writeFile(dir, `${typeName}.md`, content);
}

/**
 * Writes the migrations page (ng update schematics).
 * Output: lucca-front/references/migrations.md
 */
export function writeMigrationsPage(skillsDir: string, content: string): WriteResult {
	const dir = path.join(skillRoot(skillsDir), 'references');
	return writeFile(dir, 'migrations.md', content);
}

// ─── Documentation writers ────────────────────────────────────────────────────

/**
 * Writes a documentation page (tokens, content, guidelines, patterns, deprecated).
 * Output: lucca-front/references/documentation/<category>/<filename>.md
 */
export function writeDocumentationPage(
	skillsDir: string,
	category: string,
	filename: string,
	content: string,
): WriteResult {
	const dir = path.join(skillRoot(skillsDir), 'references', 'documentation', category);
	return writeFile(dir, filename, content);
}

/**
 * Writes a tools page (mixins, animations, utilities).
 * Output: lucca-front/references/tools/<filename>.md
 */
export function writeToolsPage(
	skillsDir: string,
	filename: string,
	content: string,
): WriteResult {
	const dir = path.join(skillRoot(skillsDir), 'references', 'tools');
	return writeFile(dir, filename, content);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function componentBaseDir(skillsDir: string, slug: string): string {
	return path.join(skillRoot(skillsDir), 'references', 'components', slug);
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
