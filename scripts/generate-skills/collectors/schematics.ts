/**
 * Schematics / migrations collector (piste B — git source).
 *
 * Reads `@lucca-front/ng`'s ng-update migration collection at the target git tag and writes a
 * cumulative `migrations.md` listing every migration whose version is ≤ the target. The update
 * skill (separate) points to this file; the consumer picks the (from → to] range that applies.
 *
 * Source: packages/ng/schematics/migrations.json (declared as `ng-update.migrations` in
 * packages/ng/package.json), read via `git show <tag>:<path>` — layout-agnostic, no AI.
 *
 * NOTE: this collection is currently sparse (LF ships few automated ng-update migrations);
 * the richer migration guidance is prose on ZeroHeight, captured separately in deprecated.md.
 */

import { execSync } from 'child_process';
import { VersionConfig } from '../types';
import { writeMigrationsPage } from '../generators/skill-writer';

const MIGRATIONS_PATH = 'packages/ng/schematics/migrations.json';

interface MigrationEntry {
	version: string;
	description?: string;
	factory?: string;
}

/** Parses leading major.minor.patch from a (possibly pre-release) version string. */
function parseMmp(v: string): [number, number, number] {
	const m = v.match(/(\d+)\.(\d+)\.(\d+)/);
	return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : [0, 0, 0];
}

function compareMmp(a: string, b: string): number {
	const [a1, a2, a3] = parseMmp(a);
	const [b1, b2, b3] = parseMmp(b);
	return a1 - b1 || a2 - b2 || a3 - b3;
}

export function collectSchematics(skillsDir: string, version: VersionConfig): { written: number; errors: number } {
	let raw: string;
	try {
		raw = execSync(`git show ${version.tag}:${MIGRATIONS_PATH}`, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
	} catch {
		console.warn(`  ⚠️  ${MIGRATIONS_PATH} absent au tag ${version.tag}`);
		return { written: 0, errors: 0 };
	}

	let parsed: { schematics?: Record<string, MigrationEntry> };
	try {
		parsed = JSON.parse(raw);
	} catch {
		console.warn(`  ⚠️  ${MIGRATIONS_PATH} illisible (JSON)`);
		return { written: 0, errors: 1 };
	}

	const migrations = Object.entries(parsed.schematics ?? {})
		.map(([name, e]) => ({ name, ...e }))
		.filter((e) => compareMmp(e.version, version.tag) <= 0)
		.sort((a, b) => compareMmp(a.version, b.version) || a.name.localeCompare(b.name));

	if (migrations.length === 0) {
		console.warn(`  ⚠️  aucune migration ≤ ${version.tag}`);
		return { written: 0, errors: 0 };
	}

	let md = `# Migrations Lucca Front (ng update) — jusqu'à ${version.tag}\n\n`;
	md += `> Migrations automatiques exécutées par \`ng update @lucca-front/ng\`. Source : \`${MIGRATIONS_PATH}\` au tag ${version.tag}.\n`;
	md += `> Liste cumulative. Lors d'une montée, seules les migrations dont la version est dans la plage (départ → cible] s'appliquent.\n`;
	md += `> La guidance prose (commandes, étapes manuelles) est dans \`./documentation/deprecated/deprecated.md\`.\n\n`;
	for (const e of migrations) {
		md += `## ${e.version} — \`${e.name}\`\n\n${e.description ?? '_(pas de description)_'}\n\n`;
	}

	const result = writeMigrationsPage(skillsDir, version, md);
	console.log(`     ✅ migrations.md — ${result.status} (${migrations.length} migration(s))`);
	return { written: 1, errors: 0 };
}
