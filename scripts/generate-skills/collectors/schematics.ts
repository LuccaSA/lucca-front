/**
 * Schematics / migrations collector (git source).
 *
 * Reads `@lucca-front/ng`'s **schematics collection** at the target git tag and writes a
 * cumulative `migrations.md` listing every codemod available up to that version. These are the
 * manual transformations a developer runs to absorb a breaking change in bulk:
 *
 *   ng generate @lucca-front/ng:<name>
 *
 * They complement the per-component changelog: the changelog *describes* what changed (API diff),
 * a codemod *executes* the fix across the whole project. The update skill (separate) consumes this.
 *
 * Source: packages/ng/schematics/collection.json, read via `git show <tag>:<path>` — layout-
 * agnostic, no AI. Codemods carry no version field, so the **introduction version** is derived by
 * diffing the codemod set across consecutive stable 21.x tags (first tag where a name appears).
 *
 * NB: `migrations.json` (the `ng update` auto-migration list) is intentionally ignored — LF ships
 * almost none (a single pre-21 entry), so it added no value. Prose guidance lives in deprecated.md.
 */

import { execSync } from 'child_process';
import { VersionConfig } from '../types';
import { writeMigrationsPage } from '../generators/skill-writer';
import { listStableTags, compareTags } from '../version-config';

const COLLECTION_PATH = 'packages/ng/schematics/collection.json';

/** Codemods that are not migrations (setup/install) — excluded from the catalogue. */
const NON_MIGRATION = new Set(['ng-add']);

/** Run-level cache: each tag's collection is read/parsed once. */
const collectionCache = new Map<string, Map<string, string>>();

/** Returns a map of codemod name → description at a tag (migrations only), or empty if absent. Shared with fixes-writer. */
export function collectionAt(tag: string): Map<string, string> {
	const cached = collectionCache.get(tag);
	if (cached) return cached;

	const map = new Map<string, string>();
	let raw: string;
	try {
		raw = execSync(`git show ${tag}:${COLLECTION_PATH}`, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
	} catch {
		collectionCache.set(tag, map);
		return map;
	}

	try {
		const parsed = JSON.parse(raw) as { schematics?: Record<string, { description?: string }> };
		for (const [name, e] of Object.entries(parsed.schematics ?? {})) {
			if (NON_MIGRATION.has(name)) continue;
			map.set(name, (e.description ?? '').trim());
		}
	} catch {
		// leave empty
	}

	collectionCache.set(tag, map);
	return map;
}

export function collectSchematics(skillsDir: string, version: VersionConfig): { written: number; errors: number } {
	const target = collectionAt(version.tag);
	if (target.size === 0) {
		console.warn(`  ⚠️  ${COLLECTION_PATH} absent ou vide au tag ${version.tag}`);
		return { written: 0, errors: 0 };
	}

	// Stable 21.x tags up to the target, ascending — for introduction-version diffing.
	const tags = listStableTags(version.major).filter((t) => compareTags(t, version.tag) <= 0);
	const isFirstTag = tags.length > 0 && tags[0] === version.tag;
	const predecessor = (() => {
		const i = tags.indexOf(version.tag);
		return i > 0 ? tags[i - 1] : null;
	})();

	// Introduction tag of each codemod = first stable 21.x tag where it appears. Codemods present
	// at the earliest walked tag predate the 21.x branch → no reliable in-range version (null).
	function introTag(name: string): string | null {
		for (const t of tags) {
			if (collectionAt(t).has(name)) {
				return t === tags[0] ? null : t;
			}
		}
		return null;
	}

	const names = [...target.keys()].sort((a, b) => a.localeCompare(b));

	// "New in this version" = present now, absent in the immediate predecessor stable tag.
	const prev = predecessor ? collectionAt(predecessor) : null;
	const nouveaux = prev ? names.filter((n) => !prev.has(n)) : [];

	const cmd = (n: string) => `\`ng generate @lucca-front/ng:${n}\``;

	let md = `# Migrations Lucca Front — jusqu'à ${version.tag}\n\n`;
	md += `> Codemods exécutables via \`ng generate @lucca-front/ng:<nom>\`. Ils réécrivent automatiquement le code (templates, SCSS, imports) pour absorber un changement d'API, là où le changelog par composant ne fait que **décrire** le changement.\n`;
	md += `> Source : \`${COLLECTION_PATH}\` au tag ${version.tag}. Liste cumulative.\n`;
	md += `> Guidance prose (étapes manuelles, contexte) : \`./documentation/deprecated/deprecated.md\`.\n\n`;

	if (nouveaux.length > 0) {
		md += `## 🆕 Nouveaux codemods en ${version.major}.${version.minor}.${version.patch}\n\n`;
		md += `À envisager en montant **vers** cette version :\n\n`;
		md += `| Codemod | Commande | Effet |\n|---------|----------|-------|\n`;
		for (const n of nouveaux) {
			md += `| ${n} | ${cmd(n)} | ${target.get(n) || '_(pas de description)_'} |\n`;
		}
		md += `\n`;
	} else if (isFirstTag) {
		md += `_Catalogue de base de la branche 21.x (pas de diff de prédécesseur)._\n\n`;
	}

	md += `## Catalogue complet (cumulatif ≤ ${version.tag})\n\n`;
	md += `| Codemod | Commande | Effet | Introduit |\n|---------|----------|-------|-----------|\n`;
	for (const n of names) {
		const intro = introTag(n);
		md += `| ${n} | ${cmd(n)} | ${target.get(n) || '_(pas de description)_'} | ${intro ? intro.replace(/^v/, '') : '—'} |\n`;
	}
	md += `\n`;

	const result = writeMigrationsPage(skillsDir, version, md);
	console.log(`     ✅ migrations.md — ${result.status} (${names.length} codemod(s), ${nouveaux.length} nouveau(x))`);
	return { written: 1, errors: 0 };
}
