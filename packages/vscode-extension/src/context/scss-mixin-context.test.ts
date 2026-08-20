import { computeUseInsertion, findImportedNamespaces, findMixinIncludes, findUseImports, getMixinCompletionContext, isNamespaceReferenced } from './scss-mixin-context';

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

describe('findUseImports', () => {
	it('captures namespace, path and offsets, spanning the terminating ;', () => {
		const text = "@use '@lucca-front/scss/src/commons/utils/media';\n.a {}";
		const [use] = findUseImports(text);
		expect(use.namespace).toBe('media');
		expect(use.path).toBe('@lucca-front/scss/src/commons/utils/media');
		expect(text.slice(use.start, use.end)).toBe("@use '@lucca-front/scss/src/commons/utils/media';");
	});

	it('handles `as` aliases and `with (...)` configuration', () => {
		const uses = findUseImports("@use 'a/media' as mq;\n@use 'b/config' with ($x: 1);");
		expect(uses[0].namespace).toBe('mq');
		expect(uses[1].namespace).toBe('config');
	});

	it('reports a wildcard import as having no namespace', () => {
		const [use] = findUseImports("@use 'a/media' as *;");
		expect(use.namespace).toBeUndefined();
	});
});

describe('isNamespaceReferenced', () => {
	const text = "@use 'x/media';\n.a { @include media.min('M') {} }";
	const use = findUseImports(text)[0];

	it('finds a reference outside the @use statement', () => {
		expect(isNamespaceReferenced(text, 'media', use.start, use.end)).toBe(true);
	});

	it('does not count the @use statement itself', () => {
		const only = "@use 'x/media';";
		const u = findUseImports(only)[0];
		expect(isNamespaceReferenced(only, 'media', u.start, u.end)).toBe(false);
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
