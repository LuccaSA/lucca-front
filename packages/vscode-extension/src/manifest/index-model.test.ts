import * as fs from 'node:fs';
import * as path from 'node:path';

import { buildIndex, propertyHover, utilityDetail, utilityHover } from './index-model';
import { Manifest } from './types';

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '../../test-fixtures/manifest.sample.json'), 'utf8')) as Manifest;
const index = buildIndex(manifest);

const utility = (name: string) => {
	const found = index.utilities.get(name);
	if (!found) {
		throw new Error(`fixture is missing ${name}`);
	}
	return found;
};

describe('utilityDetail', () => {
	it('leaves an unconditional block unqualified', () => {
		expect(utilityDetail(utility('pr-u-displayFlex'))).toBe('display: flex');
	});

	it('names the pseudo-element a sel-only block applies to', () => {
		expect(utilityDetail(utility('pr-u-clearfix'))).toBe('content: ""/""; display: table &::before');
	});

	it('names a media condition', () => {
		expect(utilityDetail(utility('pr-u-scrollBehaviorSmooth'))).toBe('scroll-behavior: smooth @media');
	});

	it('names a container condition', () => {
		expect(utilityDetail(utility('pr-u-displayNoneAtContainerMinS'))).toBe('display: none @container');
	});
});

describe('buildIndex — completions', () => {
	it('never suggests the legacy unprefixed twins', () => {
		expect(index.utilityCompletions.some((c) => !c.name.startsWith('pr-u-'))).toBe(false);
	});

	it('still resolves them for hover and diagnostics', () => {
		expect(index.utilities.has('u-displayFlex')).toBe(true);
		expect(index.utilityNames).toContain('u-displayFlex');
	});

	it('exposes the manifest config', () => {
		expect(index.config.deprecatedUtilityPrefix).toBe(true);
	});

	it('defaults config to empty when the manifest predates it', () => {
		const { config: _config, ...withoutConfig } = manifest;
		expect(buildIndex(withoutConfig).config).toEqual({});
	});
});

describe('utilityHover', () => {
	it('warns that a legacy twin may be absent from the consumer build', () => {
		expect(utilityHover('u-displayFlex', utility('u-displayFlex'), true, index.config)).toContain('$deprecatedUtilityPrefix');
	});

	it('stays quiet for a prefixed class', () => {
		expect(utilityHover('pr-u-displayFlex', utility('pr-u-displayFlex'), true, index.config)).not.toContain('$deprecatedUtilityPrefix');
	});

	it('stays quiet when the manifest reports no such build flag', () => {
		expect(utilityHover('u-displayFlex', utility('u-displayFlex'), true, {})).not.toContain('$deprecatedUtilityPrefix');
	});
});

describe('propertyHover', () => {
	it('recommends the replacement of a deprecated property', () => {
		const prop = index.properties.get('--sizes-M-fontSize');
		expect(propertyHover('--sizes-M-fontSize', prop!)).toContain('use `--pr-t-font-body-M` instead');
	});

	it('falls back to the note when there is no replacement', () => {
		const prop = index.properties.get('--commons-font-family');
		const hover = propertyHover('--commons-font-family', prop!);
		expect(hover).toContain('use --pr-t-font-family instead');
		expect(hover).not.toContain('instead`');
	});

	it('omits the deprecation notice when asked', () => {
		const prop = index.properties.get('--sizes-M-fontSize');
		expect(propertyHover('--sizes-M-fontSize', prop!, false)).not.toContain('Deprecated');
	});
});
