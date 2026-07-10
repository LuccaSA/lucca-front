/**
 * Angular API page for ORPHAN symbols — `references/tools/angular-api.md`.
 *
 * A symbol (provider, token, pipe, service, deprecated module) is an orphan when it is NOT
 * rendered on any component's API file, either because its package exports no component at all
 * (title, safe-content, number, popup, sidepanel…) or because the file-affinity scoping of a
 * multi-component package attaches it to no documented component (e.g. `luDate` in
 * `date/adapter/` while the `calendar` component only claims `date/calendar/`).
 *
 * The set is computed EXACTLY: every package entrypoint at the tag is extracted, and everything
 * the documented components attach (same extraction, same selector filters) is subtracted —
 * so each public symbol appears on exactly one page (decided 2026-07-10).
 */

import { execSync } from 'child_process';
import { extractPackageAPI, extractPackageSymbols } from '../collectors/ast-extractor';
import { VersionConfig, WriteResult } from '../types';
import { writeToolsPage } from './skill-writer';

/** Documented components: their package + selector scope (from discovery). */
export interface AngularApiAttachment {
	ngPackage: string;
	ngSelectors?: string[];
}

/** Escapes markdown table pipes in a signature/type fragment. */
function esc(s: string): string {
	return s.replace(/\|/g, '\\|');
}

function depPrefix(deprecated?: string): string {
	return deprecated ? `⚠️ **Déprécié** : ${esc(deprecated)} ` : '';
}

function cell(deprecated?: string, description?: string): string {
	const text = `${depPrefix(deprecated)}${description ?? ''}`.trim();
	return text || '—';
}

/** Stable identity of a symbol across extraction passes. */
function symbolKey(kind: string, name: string, sourceFile?: string): string {
	return `${kind}:${name}:${sourceFile ?? ''}`;
}

/** Every package entrypoint at the tag (top-level and secondary, e.g. "forms/rich-text-input"). */
function listPackageEntrypoints(tag: string): string[] {
	try {
		return execSync(`git ls-tree -r --name-only ${tag} packages/ng/`, { encoding: 'utf-8', maxBuffer: 50 * 1024 * 1024 })
			.split('\n')
			.filter((f) => f.endsWith('/public-api.ts'))
			.map((f) => f.replace('packages/ng/', '').replace('/public-api.ts', ''))
			.filter(Boolean);
	} catch {
		return [];
	}
}

export function writeAngularApiPage(skillsDir: string, version: VersionConfig, attachments: AngularApiAttachment[]): WriteResult | null {
	const packages = listPackageEntrypoints(version.tag);
	if (packages.length === 0) return null;

	// Everything the documented components already render (same extraction, same scoping).
	const attached = new Set<string>();
	for (const a of attachments) {
		const api = extractPackageAPI(a.ngPackage, version, true, a.ngSelectors);
		if (!api) continue;
		for (const p of api.providers) attached.add(symbolKey('provider', p.name, p.sourceFile));
		for (const t of api.tokens) attached.add(symbolKey('token', t.name, t.sourceFile));
		for (const p of api.pipes) attached.add(symbolKey('pipe', p.name, p.sourceFile));
		for (const s of api.services) attached.add(symbolKey('service', s.className, s.sourceFile));
		for (const m of api.deprecatedModules) attached.add(symbolKey('module', m.className, m.sourceFile));
	}

	// A file can be re-exported by several entrypoints (a secondary entrypoint and its parent
	// barrel): each symbol is kept once, under the first package that surfaces it.
	const seen = new Set<string>();
	const keep = <T,>(kind: string, list: T[], name: (s: T) => string, file: (s: T) => string | undefined): T[] =>
		list.filter((s) => {
			const key = symbolKey(kind, name(s), file(s));
			if (attached.has(key) || seen.has(key)) return false;
			seen.add(key);
			return true;
		});

	const sections: string[] = [];
	for (const pkg of [...packages].sort((a, b) => a.localeCompare(b))) {
		const raw = extractPackageSymbols(pkg, version);
		if (!raw) continue;
		const symbols = {
			providers: keep('provider', raw.providers, (s) => s.name, (s) => s.sourceFile),
			tokens: keep('token', raw.tokens, (s) => s.name, (s) => s.sourceFile),
			pipes: keep('pipe', raw.pipes, (s) => s.name, (s) => s.sourceFile),
			services: keep('service', raw.services, (s) => s.className, (s) => s.sourceFile),
			deprecatedModules: keep('module', raw.deprecatedModules, (s) => s.className, (s) => s.sourceFile),
		};
		const total = symbols.providers.length + symbols.tokens.length + symbols.pipes.length + symbols.services.length + symbols.deprecatedModules.length;
		if (total === 0) continue;

		let md = `## ${pkg} (\`@lucca-front/ng/${pkg}\`)\n\n`;

		if (symbols.providers.length > 0) {
			md += `### Providers\n\n| Fonction | Signature | Description |\n|----------|-----------|-------------|\n`;
			for (const p of symbols.providers) md += `| \`${p.name}\` | \`${esc(p.signature)}\` | ${cell(p.deprecated, p.description)} |\n`;
			md += '\n';
		}
		if (symbols.tokens.length > 0) {
			md += `### Injection tokens\n\n| Token | Type | Description |\n|-------|------|-------------|\n`;
			for (const t of symbols.tokens) md += `| \`${t.name}\` | \`${esc(t.type)}\` | ${cell(t.deprecated, t.description)} |\n`;
			md += '\n';
		}
		if (symbols.pipes.length > 0) {
			md += `### Pipes\n\n| Pipe | Classe | transform | Description |\n|------|--------|-----------|-------------|\n`;
			for (const p of symbols.pipes) {
				md += `| \`${p.name}\` | \`${p.className}\` | ${p.transformSignature ? `\`${esc(p.transformSignature)}\`` : '—'} | ${cell(p.deprecated, p.description)} |\n`;
			}
			md += '\n';
		}
		if (symbols.services.length > 0) {
			md += `### Services\n\n`;
			for (const s of symbols.services) {
				md += `#### ${s.className}${s.deprecated ? ` — ⚠️ Déprécié : ${s.deprecated}` : ''}\n\n`;
				if (s.description) md += `${s.description}\n\n`;
				for (const m of s.methods) md += `- \`${m}\`\n`;
				if (s.methods.length > 0) md += '\n';
			}
		}
		if (symbols.deprecatedModules.length > 0) {
			md += `### Modules dépréciés\n\n`;
			for (const dm of symbols.deprecatedModules) md += `- ⚠️ \`${dm.className}\` — ${dm.deprecated}\n`;
			md += '\n';
		}

		sections.push(md.trimEnd());
	}

	if (sections.length === 0) return null;

	const header =
		`# API Angular hors composants\n\n` +
		`> Providers, injection tokens, pipes et services exportés par \`@lucca-front/ng/*\` qui ne sont documentés sur la page d'aucun composant ` +
		`(package sans composant, ou symbole éloigné des composants du package). ` +
		`Extraits du code source au tag \`${version.tag}\` (JSDoc \`@deprecated\` inclus).\n\n`;

	return writeToolsPage(skillsDir, version, 'angular-api.md', header + sections.join('\n\n') + '\n');
}
