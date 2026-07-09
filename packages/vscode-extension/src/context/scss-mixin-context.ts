/**
 * Pure text logic for SCSS mixin support: detecting an `@include` completion
 * spot, enumerating `@use` namespaces already imported and `@include` mixin
 * references, and computing where to insert a new `@use`. No 'vscode' import.
 */

/** Characters that make up an `@include` reference token (`namespace.mixin`). */
const INCLUDE_TOKEN_CHAR = /[\w.-]/;

export interface MixinCompletionContext {
	/** Start offset of the reference token being replaced. */
	tokenStart: number;
	/** End offset of that token. */
	tokenEnd: number;
	/** Token text between tokenStart and the cursor. */
	token: string;
}

/**
 * Returns the completion context when the cursor sits in the mixin position of
 * an `@include ` statement (`@include ‸`, `@include med‸`, `@include media.mi‸`),
 * or undefined otherwise.
 */
export function getMixinCompletionContext(text: string, offset: number): MixinCompletionContext | undefined {
	let tokenStart = offset;
	while (tokenStart > 0 && INCLUDE_TOKEN_CHAR.test(text[tokenStart - 1])) {
		tokenStart--;
	}
	let tokenEnd = offset;
	while (tokenEnd < text.length && INCLUDE_TOKEN_CHAR.test(text[tokenEnd])) {
		tokenEnd++;
	}
	if (!/@include\s+$/.test(text.slice(0, tokenStart))) {
		return undefined;
	}
	return { tokenStart, tokenEnd, token: text.slice(tokenStart, offset) };
}

/**
 * The set of namespaces made available by `@use` in the document. Uses the
 * explicit `as` alias when present, else the module basename (Sass default,
 * stripping a leading underscore and the `.scss` extension). `as *` (wildcard)
 * contributes no namespace.
 */
export function findImportedNamespaces(text: string): Set<string> {
	const set = new Set<string>();
	const re = /@use\s+['"]([^'"]+)['"](?:\s+as\s+([\w*-]+))?/g;
	let match: RegExpExecArray | null;
	while ((match = re.exec(text)) !== null) {
		const alias = match[2];
		if (alias === '*') {
			continue;
		}
		if (alias) {
			set.add(alias);
			continue;
		}
		const basename = match[1].split('/').pop() ?? match[1];
		set.add(basename.replace(/^_/, '').replace(/\.scss$/, ''));
	}
	return set;
}

export interface MixinInclude {
	namespace: string;
	name: string;
	/** Offset of the `namespace` start. */
	start: number;
	/** Offset just past the `name` end. */
	end: number;
}

/** All `@include namespace.mixin` references in the document, with offsets covering `namespace.mixin`. */
export function findMixinIncludes(text: string): MixinInclude[] {
	const out: MixinInclude[] = [];
	const re = /@include\s+([\w-]+)\.([\w-]+)/g;
	let match: RegExpExecArray | null;
	while ((match = re.exec(text)) !== null) {
		const refLength = match[1].length + 1 + match[2].length;
		const end = match.index + match[0].length;
		out.push({ namespace: match[1], name: match[2], start: end - refLength, end });
	}
	return out;
}

export interface UseInsertion {
	/** Offset at which to insert. */
	offset: number;
	/** Text to insert (includes its own surrounding newlines). */
	text: string;
}

/**
 * Where and what to insert to add `@use '<importPath>';`. Placed after the last
 * existing `@use`/`@forward` statement, or at the top of the file when there is
 * none (always a syntactically valid position for `@use`).
 */
export function computeUseInsertion(text: string, importPath: string): UseInsertion {
	const re = /@(?:use|forward)\b[^;]*;/g;
	let last: RegExpExecArray | null = null;
	let match: RegExpExecArray | null;
	while ((match = re.exec(text)) !== null) {
		last = match;
	}
	if (last) {
		return { offset: last.index + last[0].length, text: `\n@use '${importPath}';` };
	}
	return { offset: 0, text: `@use '${importPath}';\n\n` };
}
