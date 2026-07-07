/**
 * Detects whether an offset sits inside the value of a `class="…"` attribute
 * and, if so, the token around the cursor. Pure — works on any text chunk (a
 * full .html document or an extracted Angular inline-template region).
 */

export interface ClassContext {
	/** Start offset of the class token under the cursor. */
	tokenStart: number;
	/** End offset of that token. */
	tokenEnd: number;
	/** Token text between tokenStart and the cursor. */
	token: string;
}

const CLASS_TOKEN_CHAR = /[\w-]/;
// Matches the opening of a `class` (or `className`) attribute value.
const CLASS_ATTR_RE = /(?:^|[\s"'`])(class|className)\s*=\s*(["'])/gi;

/**
 * @param text text chunk (html document or inline template region)
 * @param offset cursor offset within `text`
 */
export function getClassAttributeContext(text: string, offset: number): ClassContext | undefined {
	const before = text.slice(0, offset);

	// Find the last class attribute opener whose quote is still unclosed at the cursor.
	let open: { quote: string; valueStart: number } | undefined;
	CLASS_ATTR_RE.lastIndex = 0;
	let match: RegExpExecArray | null;
	while ((match = CLASS_ATTR_RE.exec(before)) !== null) {
		const quote = match[2];
		const valueStart = match.index + match[0].length;
		const closeIndex = before.indexOf(quote, valueStart);
		open = closeIndex === -1 ? { quote, valueStart } : undefined;
	}
	if (!open) {
		return undefined;
	}

	// Reject if the tag already closed before the cursor (broken/unbalanced input).
	if (before.slice(open.valueStart).includes('>')) {
		return undefined;
	}

	let tokenStart = offset;
	while (tokenStart > open.valueStart && CLASS_TOKEN_CHAR.test(text[tokenStart - 1])) {
		tokenStart--;
	}
	let tokenEnd = offset;
	while (tokenEnd < text.length && CLASS_TOKEN_CHAR.test(text[tokenEnd])) {
		tokenEnd++;
	}

	return { tokenStart, tokenEnd, token: text.slice(tokenStart, offset) };
}

/**
 * Enumerates every `class`/`className` attribute value span in a text chunk,
 * for diagnostics tokenisation. Returns [start, end] offsets of the value.
 */
export function findClassAttributeValues(text: string): Array<{ start: number; end: number }> {
	const spans: Array<{ start: number; end: number }> = [];
	const re = /(?:^|[\s"'`])(?:class|className)\s*=\s*(["'])([^"']*)\1/gi;
	let match: RegExpExecArray | null;
	while ((match = re.exec(text)) !== null) {
		const valueStart = match.index + match[0].length - match[2].length - 1;
		spans.push({ start: valueStart, end: valueStart + match[2].length });
	}
	return spans;
}
