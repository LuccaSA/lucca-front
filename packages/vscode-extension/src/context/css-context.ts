/**
 * Detects whether the cursor is at a spot where a custom-property completion
 * should be offered in CSS/SCSS/LESS. Pure — operates on text + offset.
 */

export interface CssCompletionContext {
	/** True when the cursor is inside an unclosed `var(` — offer the full list. */
	insideVar: boolean;
	/** Start offset of the token being replaced (word incl. any leading dashes). */
	tokenStart: number;
	/** End offset of that token. */
	tokenEnd: number;
	/** Token text between tokenStart and the cursor. */
	token: string;
}

const TOKEN_CHAR = /[\w-]/;

/**
 * @param text full document text
 * @param offset cursor offset
 */
export function getCssCompletionContext(text: string, offset: number): CssCompletionContext | undefined {
	// Current token boundaries (word characters and dashes).
	let tokenStart = offset;
	while (tokenStart > 0 && TOKEN_CHAR.test(text[tokenStart - 1])) {
		tokenStart--;
	}
	let tokenEnd = offset;
	while (tokenEnd < text.length && TOKEN_CHAR.test(text[tokenEnd])) {
		tokenEnd++;
	}
	const token = text.slice(tokenStart, offset);

	const insideVar = isInsideVar(text, tokenStart);
	if (insideVar) {
		return { insideVar: true, tokenStart, tokenEnd, token };
	}

	// Outside var(): only engage in a value position once the user starts a
	// custom property (`--…`), to stay out of the way otherwise.
	if (token.startsWith('-') && isValuePosition(text, tokenStart)) {
		return { insideVar: false, tokenStart, tokenEnd, token };
	}
	return undefined;
}

/** Is `pos` inside an unclosed `var(` call? */
function isInsideVar(text: string, pos: number): boolean {
	const before = text.slice(0, pos);
	const varIndex = before.lastIndexOf('var(');
	if (varIndex === -1) {
		return false;
	}
	// No closing paren between the `var(` and the cursor.
	return !before.slice(varIndex + 4).includes(')');
}

/**
 * Is `pos` in a declaration value position — i.e. after a `:` that follows the
 * last statement boundary (`{`, `}`, `;`)? Works for both CSS and SCSS.
 */
function isValuePosition(text: string, pos: number): boolean {
	const before = text.slice(0, pos);
	const boundary = Math.max(before.lastIndexOf('{'), before.lastIndexOf('}'), before.lastIndexOf(';'));
	const colon = before.lastIndexOf(':');
	return colon > boundary;
}
