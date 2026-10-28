import { describe, expect, it } from 'vitest';
import { refuseMinorForThisBranch, refusePartialRunOnNewMinor } from './preflight';

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

	it('refuses a partial run that moves the skill to a new minor', () => {
		expect(refusePartialRunOnNewMinor('22.1', '22.0', ['--skip-documentation', '--skip-tools'])).toContain('--skip-documentation, --skip-tools : la skill passe de 22.0 à 22.1');
	});
});
