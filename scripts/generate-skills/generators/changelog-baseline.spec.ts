import { describe, expect, it } from 'vitest';
import { listStableTags, parseVersion, previousMajorLastStableTag } from '../version-config';

/**
 * The tag-walk started with an empty API at the first tag of the target major, so every component
 * that predated it read as "Composant introduit" — 119 of the 128 component pages of the 22.0
 * skill, where `v22.0.0` is the only tag of its major.
 */
describe('previousMajorLastStableTag', () => {
	it('returns the last stable tag of the major below', () => {
		const tag = previousMajorLastStableTag(22);
		expect(tag).not.toBeNull();
		expect(parseVersion(tag!)!.major).toBe(21);
		expect(tag).toBe(listStableTags(21).at(-1));
	});

	it('walks down past a major with no tag at all', () => {
		// 1000 has no tags; the answer must be the newest major that does, not null.
		const tag = previousMajorLastStableTag(1000);
		expect(tag).not.toBeNull();
		expect(parseVersion(tag!)!.major).toBeLessThan(1000);
	});

	it('has no baseline below the first documented major', () => {
		expect(previousMajorLastStableTag(0)).toBeNull();
	});
});
