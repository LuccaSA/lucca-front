import { computeUseInsertion, findImportedNamespaces, findMixinIncludes, getMixinCompletionContext } from './scss-mixin-context';

/** Places the cursor at the `|` marker and returns the completion context. */
function at(input: string) {
	const offset = input.indexOf('|');
	return getMixinCompletionContext(input.replace('|', ''), offset);
}

describe('getMixinCompletionContext', () => {
	it('offers right after `@include `', () => {
		const ctx = at('.a { @include | }');
		expect(ctx).toBeDefined();
		expect(ctx?.token).toBe('');
	});

	it('offers on a partial namespace token', () => {
		const ctx = at('.a { @include med| }');
		expect(ctx?.token).toBe('med');
	});

	it('offers on a partial namespace.mixin token and spans the whole reference', () => {
		const input = '.a { @include media.mi| }';
		const ctx = getMixinCompletionContext(input.replace('|', ''), input.indexOf('|'));
		expect(ctx?.token).toBe('media.mi');
		expect(input.replace('|', '').slice(ctx!.tokenStart, ctx!.tokenEnd)).toBe('media.mi');
	});

	it('stays silent outside an @include', () => {
		expect(at('.a { color: re| }')).toBeUndefined();
		expect(at('.a { @includ| }')).toBeUndefined();
	});
});

describe('findImportedNamespaces', () => {
	it('uses the module basename by default', () => {
		const set = findImportedNamespaces("@use '@lucca-front/scss/src/commons/utils/media';");
		expect(set.has('media')).toBe(true);
	});

	it('honours an explicit `as` alias and ignores wildcards', () => {
		const set = findImportedNamespaces("@use 'a/media' as mq;\n@use 'b/color' as *;");
		expect(set.has('mq')).toBe(true);
		expect(set.has('media')).toBe(false);
		expect(set.has('color')).toBe(false);
	});
});

describe('findMixinIncludes', () => {
	it('captures namespace, name and offsets covering the reference', () => {
		const text = ".a { @include media.min('M') { color: red; } }";
		const [ref] = findMixinIncludes(text);
		expect(ref.namespace).toBe('media');
		expect(ref.name).toBe('min');
		expect(text.slice(ref.start, ref.end)).toBe('media.min');
	});
});

describe('computeUseInsertion', () => {
	it('inserts after the last @use', () => {
		const text = "@use 'a';\n@use 'b';\n\n.a { color: red; }";
		const ins = computeUseInsertion(text, 'x/media');
		expect(text.slice(0, ins.offset).endsWith("@use 'b';")).toBe(true);
		expect(ins.text).toBe("\n@use 'x/media';");
	});

	it('inserts at the top when there is no @use', () => {
		const ins = computeUseInsertion('.a { color: red; }', 'x/media');
		expect(ins.offset).toBe(0);
		expect(ins.text).toBe("@use 'x/media';\n\n");
	});
});
