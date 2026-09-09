import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { auditGeneratedMarkdown, auditStoryExamples, clearOutputViolations, reportOutputViolations } from './output-guard';

let dir: string;

beforeEach(() => {
	dir = fs.mkdtempSync(path.join(os.tmpdir(), 'output-guard-'));
	clearOutputViolations();
});

afterEach(() => {
	fs.rmSync(dir, { recursive: true, force: true });
});

function write(rel: string, content: string): void {
	const full = path.join(dir, rel);
	fs.mkdirSync(path.dirname(full), { recursive: true });
	fs.writeFileSync(full, content);
}

describe('auditGeneratedMarkdown', () => {
	it('flags a TypeScript import inside a css fence', () => {
		write(
			'references/components/dialog/dialog.component.md',
			"## HTML/CSS\n\n### Basic\n\n```css\n@forward '@lucca-front/scss/src/components/dialog';\nimport { FormComponent } from '@lucca-front/ng/form';\n```\n",
		);

		const violations = auditGeneratedMarkdown(dir);

		expect(violations).toHaveLength(1);
		expect(violations[0].rule).toBe('ts-import-in-css-fence');
		expect(violations[0].where).toContain('dialog.component.md:5');
	});

	it('accepts real CSS and Sass in a css fence — documentation pages are full of it', () => {
		write('references/tools/mixins.md', "```css\n@include media.max('M') {\n\tcolor: red;\n}\n```\n\n```css\n:root {\n\t--pr-t-color: red;\n}\n```\n");

		expect(auditGeneratedMarkdown(dir)).toEqual([]);
	});

	it('flags Sass inside a TypeScript fence (the mirror regression)', () => {
		write('references/components/button/button.component.md', "```js\n@forward '@lucca-front/scss/src/components/button';\n```\n");

		const violations = auditGeneratedMarkdown(dir);

		expect(violations).toHaveLength(1);
		expect(violations[0].rule).toBe('sass-in-ts-fence');
	});

	it('ignores fences quoted inside a 4-backtick block', () => {
		write('references/components/button/button.component.md', "````diff\n```css\nimport { A } from 'x';\n```\n````\n");

		expect(auditGeneratedMarkdown(dir)).toEqual([]);
	});

	it('skips changelog/, whose diffs quote generated markdown', () => {
		write('changelog/21.1.md', "```css\nimport { A } from 'x';\n```\n");

		expect(auditGeneratedMarkdown(dir)).toEqual([]);
	});

	it('marks a violation outside the run scope as pre-existing rather than blocking', () => {
		write('lucca-front-21-0/references/components/dialog/dialog.component.md', "```css\nimport { A } from 'x';\n```\n");
		write('lucca-front-21-3/references/components/dialog/dialog.component.md', "```css\nimport { B } from 'y';\n```\n");

		const violations = auditGeneratedMarkdown(dir, ['lucca-front-21-3']);

		expect(violations).toHaveLength(2);
		expect(violations.filter((v) => v.inScope).map((v) => v.where.split('/')[0])).toEqual(['lucca-front-21-3']);
	});

	it('only returns the in-scope violations as blocking', () => {
		write('lucca-front-21-0/references/components/dialog/dialog.component.md', "```css\nimport { A } from 'x';\n```\n");

		expect(reportOutputViolations(dir, ['lucca-front-21-3'])).toEqual([]);
	});
});

describe('auditStoryExamples', () => {
	it('flags curated TypeScript imports on a story classified html-css', () => {
		auditStoryExamples('v21.3.1', 'dialog', [{ fileSlug: 'html-basic', framework: 'html-css', zhTsImports: ["import { FormComponent } from '@lucca-front/ng/form';"] }]);

		const violations = reportOutputViolations(dir);

		expect(violations).toHaveLength(1);
		expect(violations[0].rule).toBe('html-css-story-with-ts-imports');
		expect(violations[0].where).toBe('v21.3.1 dialog → html-basic');
	});

	it('flags a curated TypeScript excerpt on a story classified html-css', () => {
		// daterangeinput's shape: a `shortcuts: [ … ]` options object, not an import.
		auditStoryExamples('v21.3.1', 'daterangeinput', [{ fileSlug: 'html-range-input', framework: 'html-css', zhSnippets: [{ lang: 'ts' }] }]);

		expect(reportOutputViolations(dir)).toHaveLength(1);
	});

	it('leaves an Angular story and a Sass-only HTML story alone', () => {
		auditStoryExamples('v21.3.1', 'dialog', [
			{ fileSlug: 'angular-basic', framework: 'angular', zhTsImports: ["import { FormComponent } from '@lucca-front/ng/form';"] },
			{ fileSlug: 'html-basic', framework: 'html-css', zhSnippets: [{ lang: 'scss' }] },
		]);

		expect(reportOutputViolations(dir)).toEqual([]);
	});
});
