import { describe, expect, it } from 'vitest';
import { isNewMinor, refuseMinorForThisBranch, refusePartialRunOnNewMinor } from './preflight';

describe('isNewMinor', () => {
	it.each`
		requested  | committed | expected
		${'v22.1'} | ${'22.1'} | ${false}
		${'22.1'}  | ${'22.1'} | ${false}
		${'22.1'}  | ${'22.0'} | ${true}
		${'22.1'}  | ${null}   | ${true}
	`('$requested over $committed is a new minor: $expected', ({ requested, committed, expected }) => {
		expect(isNewMinor(requested, committed)).toBe(expected);
	});
});

describe('refuseMinorForThisBranch', () => {
	it.each`
		requested | committed
		${'22.0'} | ${null}
		${'22.0'} | ${'22.0'}
		${'22.1'} | ${'22.0'}
		${'23.0'} | ${'22.1'}
		${'22.10'} | ${'22.9'}
	`('lets $requested over $committed through', ({ requested, committed }) => {
		expect(refuseMinorForThisBranch(requested, committed)).toBeNull();
	});

	it.each`
		requested | committed
		${'21.3'} | ${'22.0'}
		${'v21.3'} | ${'22.0'}
		${'22.0'} | ${'22.1'}
		${'22.9'} | ${'22.10'}
	`('refuses $requested over $committed', ({ requested, committed }) => {
		expect(refuseMinorForThisBranch(requested, committed)).toContain(`cette branche porte la skill ${committed}`);
	});
});

describe('refusePartialRunOnNewMinor', () => {
	it.each`
		requested  | committed | partialFlags
		${'22.1'}  | ${'22.0'} | ${[]}
		${'22.1'}  | ${'22.1'} | ${['--skip-tools']}
		${'v22.1'} | ${'22.1'} | ${['--documentation-only']}
		${'22.1'}  | ${null}   | ${['--skip-schematics']}
	`('lets $requested over $committed with $partialFlags through', ({ requested, committed, partialFlags }) => {
		expect(refusePartialRunOnNewMinor(requested, committed, partialFlags)).toBeNull();
	});

	it('refuses a single-component run that moves the skill to a new minor', () => {
		expect(refusePartialRunOnNewMinor('v22.1', '22.0', ['--component button'])).toContain('--component button : la skill passe de 22.0 à v22.1');
	});

	it('refuses a partial run that moves the skill to a new minor', () => {
		expect(refusePartialRunOnNewMinor('22.1', '22.0', ['--skip-documentation', '--skip-tools'])).toContain('--skip-documentation, --skip-tools : la skill passe de 22.0 à 22.1');
	});
});
