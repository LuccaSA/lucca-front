import { describe, expect, it } from 'vitest';
import { listScssComponentNames, resolveScssComponentName, sanitizeScssForwards } from './story-source';

const TAG = 'v22.0.0';

/**
 * The SCSS folders are camelCase; `ngPackage` and the skill slug are the kebab-case Angular names.
 * Interpolating either verbatim emitted 206 `@forward` lines pointing at directories that do not
 * exist, over 48 files of the 22.0 skill.
 */
describe('resolveScssComponentName', () => {
	it('reads the folder listing of the tag', () => {
		const names = listScssComponentNames(TAG);
		expect(names.has('dataTable')).toBe(true);
		expect(names.has('data-table')).toBe(false);
	});

	it('converts a kebab-case entrypoint to its camelCase folder', () => {
		expect(resolveScssComponentName(['data-table'], TAG)).toBe('dataTable');
		expect(resolveScssComponentName(['empty-state'], TAG)).toBe('emptyState');
	});

	it('passes an already-correct name through', () => {
		expect(resolveScssComponentName(['button'], TAG)).toBe('button');
	});

	it('matches case-insensitively, for a slug written in one word', () => {
		expect(resolveScssComponentName(['filterbar'], TAG)).toBe('filterBar');
	});

	it('honours the candidates in order, so an explicit override wins', () => {
		expect(resolveScssComponentName(['userTile', 'user', 'tile'], TAG)).toBe('userTile');
	});

	it('returns null rather than a folder that does not exist', () => {
		expect(resolveScssComponentName(['forms'], TAG)).toBeNull();
		expect(resolveScssComponentName([undefined, '', null], TAG)).toBeNull();
	});
});

describe('sanitizeScssForwards', () => {
	it('drops an import naming a folder that does not exist, whoever wrote it', () => {
		const { kept, dropped } = sanitizeScssForwards(["@forward '@lucca-front/scss/src/components/checkboxField';", "@forward '@lucca-front/scss/src/components/forms';"], TAG);

		expect(kept).toEqual(["@forward '@lucca-front/scss/src/components/checkboxField';"]);
		expect(dropped).toHaveLength(1);
	});

	it('leaves every other Sass import alone', () => {
		const lines = ["@use '@lucca-front/scss/src/commons/utils/media';", "@forward 'sass:math';", '.foo { color: red; }'];
		expect(sanitizeScssForwards(lines, TAG).kept).toEqual(lines);
	});
});
