import { getCssCompletionContext } from './css-context';

/** Places the cursor at the `|` marker in the input and returns the context. */
function at(input: string) {
	const offset = input.indexOf('|');
	const text = input.replace('|', '');
	return getCssCompletionContext(text, offset);
}

describe('getCssCompletionContext', () => {
	it('offers inside an unclosed var()', () => {
		const ctx = at('.a { color: var(|); }');
		expect(ctx?.insideVar).toBe(true);
	});

	it('offers inside var() with a partial prefix-less token', () => {
		const ctx = at('.a { margin: var(spacings|); }');
		expect(ctx?.insideVar).toBe(true);
		expect(ctx?.token).toBe('spacings');
	});

	it('captures a leading -- token so it is replaced, not doubled', () => {
		const ctx = at('.a { color: var(--pr-t|); }');
		expect(ctx?.insideVar).toBe(true);
		expect(ctx?.tokenStart).toBe('.a { color: var('.length);
	});

	it('offers in value position once a custom property is started', () => {
		const ctx = at('.a { color: --|; }');
		expect(ctx).toBeDefined();
		expect(ctx?.insideVar).toBe(false);
	});

	it('stays silent in value position for a normal word', () => {
		expect(at('.a { color: re|d; }')).toBeUndefined();
	});

	it('stays silent in property position', () => {
		expect(at('.a { --|: 1px; }')).toBeUndefined();
	});

	it('does not treat a closed var() as inside', () => {
		expect(at('.a { color: var(--x); background: re|d; }')).toBeUndefined();
	});
});
