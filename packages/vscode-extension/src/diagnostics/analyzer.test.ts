import * as fs from 'node:fs';
import * as path from 'node:path';

import { analyze } from './analyzer';
import { buildIndex } from '../manifest/index-model';
import { Manifest } from '../manifest/types';

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '../../test-fixtures/manifest.sample.json'), 'utf8')) as Manifest;
const index = buildIndex(manifest);

function names(text: string, lang: string, deprecations = true) {
	return analyze(text, lang, index, { deprecations }).map((f) => `${f.kind}:${f.name}`);
}

describe('analyze — css', () => {
	it('flags a deprecated custom property', () => {
		expect(names('.a { font-family: var(--commons-font-family); }', 'scss')).toEqual(['deprecated-property:--commons-font-family']);
	});

	it('does not flag a non-deprecated property', () => {
		expect(names('.a { margin: var(--pr-t-spacings-200); }', 'css')).toEqual([]);
	});

	it('never flags unknown local custom properties', () => {
		expect(names('.a { --my-local-var: 1px; color: var(--totally-made-up); }', 'scss')).toEqual([]);
	});
});

describe('analyze — html', () => {
	it('flags an unknown pr-u-* class', () => {
		expect(names('<div class="pr-u-displayFlexx"></div>', 'html')).toEqual(['unknown-class:pr-u-displayFlexx']);
	});

	it('flags a deprecated class with no unknown noise', () => {
		expect(names('<div class="pr-u-textBrand pr-u-displayFlex"></div>', 'html')).toEqual(['deprecated-class:pr-u-textBrand']);
	});

	it('flags a deprecated bare u-* class', () => {
		expect(names('<div class="u-displayFlex"></div>', 'html')).toEqual(['deprecated-class:u-displayFlex']);
	});

	it('does not flag non-pr-u classes it does not know', () => {
		expect(names('<div class="btn card mod-large"></div>', 'html')).toEqual([]);
	});

	it('ignores pr-u-like text outside class attributes (prose)', () => {
		expect(names('<p>Use pr-u-displayFlexx in your markup.</p>', 'html')).toEqual([]);
	});
});

describe('analyze — typescript inline templates', () => {
	it('flags classes only inside inline templates', () => {
		const ts = 'const x = \'pr-u-nope\'; @Component({ template: `<div class="pr-u-displayFlexx"></div>` })';
		expect(names(ts, 'typescript')).toEqual(['unknown-class:pr-u-displayFlexx']);
	});
});

describe('analyze — deprecations disabled (experimental toggle off)', () => {
	it('suppresses deprecated custom-property findings', () => {
		expect(names('.a { font-family: var(--commons-font-family); }', 'scss', false)).toEqual([]);
	});

	it('suppresses deprecated-class findings but keeps unknown-class', () => {
		expect(names('<div class="pr-u-textBrand pr-u-displayFlexx"></div>', 'html', false)).toEqual(['unknown-class:pr-u-displayFlexx']);
	});
});
