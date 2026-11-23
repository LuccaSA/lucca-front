import { describe, expect, it } from 'vitest';
import { documentedMinor } from './version-config';

describe('documentedMinor', () => {
	it.each`
		tagged    | prepared   | expected
		${'22.1'} | ${null}    | ${'22.1'}
		${'22.1'} | ${'22.1'}  | ${'22.1'}
		${'22.1'} | ${'22.2'}  | ${'22.2'}
		${'22.9'} | ${'22.10'} | ${'22.10'}
		${'22.3'} | ${'23.0'}  | ${'23.0'}
		${'22.2'} | ${'22.1'}  | ${'22.2'}
	`('documents $expected when the last tag is $tagged and the branch prepares $prepared', ({ tagged, prepared, expected }) => {
		expect(documentedMinor(tagged, prepared)).toBe(expected);
	});
});
