import { describe, expect, it } from 'vitest';
import { refuseMinorForThisBranch } from './preflight';

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
		${'22.0'} | ${'22.1'}
		${'22.9'} | ${'22.10'}
	`('refuses $requested over $committed', ({ requested, committed }) => {
		expect(refuseMinorForThisBranch(requested, committed)).toContain(`cette branche porte la skill ${committed}`);
	});
});
