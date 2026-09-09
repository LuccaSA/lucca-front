/**
 * Post-generation guard on what the pipeline *emits*.
 *
 * Every other safety net in this generator protects its **inputs** — the ZH run cache, the
 * anti-shrink baselines, the fetch-failure manifest, `zh-release-guard.ts`. None of them can
 * answer "is the markdown we just wrote coherent?", which is how TypeScript imports came to be
 * rendered inside ```css fences across five skill variants without anything noticing: the skills
 * land in PRs of 30 000+ files marked `linguist-generated`, so no human diff was ever going to
 * catch it either.
 *
 * The rules here are invariants, not heuristics — a violation is always a generator bug:
 *
 *  1. `html-css-story-with-ts-imports` — ZeroHeight curating consumer TypeScript imports for a
 *     story means that story documents the Angular API. Seeing them on an html-css example is the
 *     framework classification being wrong (see `classifyFramework` / `resolveStoryFrameworks`).
 *  2. `ts-import-in-css-fence` — a ```css fence must never carry a TypeScript import statement.
 *     Narrow on purpose: ```css fences also come from ZeroHeight documentation pages that hold
 *     real CSS and Sass (tokens, mixins, utilities), so requiring `@forward`/`@use` only would
 *     fire on 211 legitimate blocks. An `import … from` line, however, is never CSS.
 *  3. `sass-in-ts-fence` — the mirror of rule 2, so a future regression cannot flip the mix the
 *     other way round unnoticed.
 *
 * Deliberately NOT a rule: "an html-css template must not contain Angular binding syntax". The
 * repo's own `html&css/` stories use `(click)="…"` and `[attr.style]="…"` in raw HTML, which would
 * make that check fire on 29 legitimate stories at v21.3.1.
 */

import fs from 'fs';
import path from 'path';

export interface OutputViolation {
	/** Stable rule id, for grouping in the report. */
	rule: 'html-css-story-with-ts-imports' | 'ts-import-in-css-fence' | 'sass-in-ts-fence';
	/** Where it was found — a generated file path, or a component/story for in-process rules. */
	where: string;
	detail: string;
	/**
	 * false when the violation sits in a skill folder this run did not (re)generate — reported so
	 * it is not forgotten, but not a reason to fail a targeted run that did not produce it.
	 */
	inScope: boolean;
}

const SASS_IMPORT_LINE = /^\s*@(forward|use)\b/;
const TS_IMPORT_LINE = /^\s*import\b[^;]*\bfrom\b/;

/** Violations detected while generating (rule 1), collected across the run. */
const inProcess: OutputViolation[] = [];

export function clearOutputViolations(): void {
	inProcess.length = 0;
}

/**
 * Rule 1 — checked as the ZeroHeight notes are mapped onto story examples, where the framework
 * decision is still visible. Called per component.
 */
export function auditStoryExamples(version: string, slug: string, examples: { fileSlug: string; framework: string; zhTsImports?: string[]; zhSnippets?: { lang: string }[] }[]): void {
	for (const ex of examples) {
		if (ex.framework !== 'html-css') continue;
		const where = `${version} ${slug} → ${ex.fileSlug}`;

		if (ex.zhTsImports?.length) {
			inProcess.push({
				rule: 'html-css-story-with-ts-imports',
				where,
				detail: `${ex.zhTsImports.length} import(s) TypeScript curé(s) sur une story classée html-css : ${ex.zhTsImports[0]}`,
				inScope: true,
			});
		}

		// Same signal, other shape: ZeroHeight documenting a TypeScript excerpt for a story (an
		// options object, a directive) means that story documents the Angular API. This is what
		// `daterangeinput` looked like — a `shortcuts: [ … ]` fragment filed under ## HTML/CSS.
		const tsSnippets = (ex.zhSnippets ?? []).filter((s) => s.lang === 'ts');
		if (tsSnippets.length > 0) {
			inProcess.push({
				rule: 'html-css-story-with-ts-imports',
				where,
				detail: `${tsSnippets.length} extrait(s) TypeScript curé(s) sur une story classée html-css`,
				inScope: true,
			});
		}
	}
}

/**
 * Rules 2 and 3 — read back the generated markdown.
 *
 * `changelog/` is skipped: those files quote generated markdown inside ````diff blocks, so every
 * violation there is an echo of one already reported at its source.
 */
export function auditGeneratedMarkdown(skillsDir: string, scope?: string[]): OutputViolation[] {
	const violations: OutputViolation[] = [];

	for (const file of walkMarkdown(skillsDir)) {
		if (path.relative(skillsDir, file).split(path.sep).includes('changelog')) continue;

		const lines = fs.readFileSync(file, 'utf-8').split('\n');
		const rel = path.relative(skillsDir, file);

		// A run may target a single minor; violations left in the folders it did not rebuild are
		// pre-existing, and must not fail it.
		const inScope = !scope || scope.some((folder) => rel === folder || rel.startsWith(`${folder}${path.sep}`) || rel.includes(`${path.sep}${folder}${path.sep}`));

		let fence: { marker: string; lang: string; start: number; body: string[] } | null = null;

		for (let i = 0; i < lines.length; i++) {
			const open = /^(`{3,})\s*([\w&+-]*)\s*$/.exec(lines[i]);

			if (!fence) {
				// A 4+-backtick fence wraps quoted markdown (diffs); its inner fences are not ours.
				if (open && open[1].length === 3) fence = { marker: open[1], lang: open[2].toLowerCase(), start: i + 1, body: [] };
				else if (open) fence = { marker: open[1], lang: '__quoted__', start: i + 1, body: [] };
				continue;
			}

			if (lines[i].trimEnd() === fence.marker) {
				checkFence(rel, fence, inScope, violations);
				fence = null;
				continue;
			}
			fence.body.push(lines[i]);
		}
	}

	return violations;
}

function checkFence(rel: string, fence: { lang: string; start: number; body: string[] }, inScope: boolean, out: OutputViolation[]): void {
	const content = fence.body.filter((l) => l.trim());

	if (fence.lang === 'css' || fence.lang === 'scss') {
		const offender = content.find((l) => TS_IMPORT_LINE.test(l));
		if (offender) {
			out.push({
				rule: 'ts-import-in-css-fence',
				where: `${rel}:${fence.start}`,
				detail: `import TypeScript dans un bloc ${fence.lang} : ${offender.trim()}`,
				inScope,
			});
		}
		return;
	}

	if (fence.lang === 'js' || fence.lang === 'ts') {
		const offender = content.find((l) => SASS_IMPORT_LINE.test(l));
		if (offender) {
			out.push({
				rule: 'sass-in-ts-fence',
				where: `${rel}:${fence.start}`,
				detail: `Sass dans un bloc ${fence.lang} : ${offender.trim()}`,
				inScope,
			});
		}
	}
}

function walkMarkdown(dir: string, out: string[] = []): string[] {
	if (!fs.existsSync(dir)) return out;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walkMarkdown(full, out);
		else if (entry.name.endsWith('.md')) out.push(full);
	}
	return out;
}

/**
 * Prints every violation, grouped by rule. Returns the full list so the caller can decide the
 * exit code (a violation is a generator bug: it must fail the run unless explicitly accepted).
 */
export function reportOutputViolations(skillsDir: string, scope?: string[]): OutputViolation[] {
	const all = [...inProcess, ...auditGeneratedMarkdown(skillsDir, scope)];
	if (all.length === 0) {
		console.log('\n🛡️  Garde-fou de sortie : aucune violation.');
		return all;
	}

	const blocking = all.filter((v) => v.inScope);
	const preexisting = all.length - blocking.length;
	console.error(
		`\n🛡️  Garde-fou de sortie : ${all.length} violation(s)` +
			(preexisting > 0 ? ` — dont ${preexisting} hors périmètre de ce run (pré-existantes, à régénérer)` : ''),
	);
	const byRule = new Map<string, OutputViolation[]>();
	for (const v of all) {
		const list = byRule.get(v.rule) ?? [];
		list.push(v);
		byRule.set(v.rule, list);
	}
	for (const [rule, list] of byRule) {
		console.error(`\n  ${rule} — ${list.length}`);
		for (const v of list.slice(0, 20)) console.error(`    ${v.where}${v.inScope ? '' : '  (hors périmètre)'}\n      ${v.detail}`);
		if (list.length > 20) console.error(`    … ${list.length - 20} de plus`);
	}
	return blocking;
}
