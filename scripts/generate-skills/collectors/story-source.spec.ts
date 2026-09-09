import { describe, expect, it } from 'vitest';
import { deriveFullName } from './story-source';

/**
 * Two stories in one section must not end up under the same `###`: the page then shows two
 * identically-titled examples with different content and nothing to tell them apart. 83 such
 * collisions on 22.0.
 */
describe('deriveFullName', () => {
	it('keeps the whole file name at depth 0', () => {
		expect(deriveFullName('./stories/documentation/x/html&css/detail-basic.stories.ts')).toBe('Detail basic');
	});

	it('adds one folder of context at depth 1', () => {
		expect(deriveFullName('./stories/documentation/users/avatars/html&css/group/basic.stories.ts', 1)).toBe('Group basic');
	});

	it('skips framework folders, which are already the section', () => {
		expect(deriveFullName('./stories/documentation/users/avatars/html&css/basic.stories.ts', 1)).toBe('Avatars basic');
		expect(deriveFullName('./stories/documentation/users/popover/angular/popover.stories.ts', 1)).toBe('Users popover');
	});

	it('does not repeat a folder that matches the file name', () => {
		expect(deriveFullName('./stories/documentation/overlays/popover/popover.stories.ts', 1)).toBe('Overlays popover');
	});

	it('separates two files sharing a name in different folders', () => {
		const a = deriveFullName('./stories/documentation/overlays/popover/popover.stories.ts', 1);
		const b = deriveFullName('./stories/documentation/users/popover/angular/popover.stories.ts', 1);

		expect(a).not.toBe(b);
	});
});
