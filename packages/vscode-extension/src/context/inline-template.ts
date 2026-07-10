/**
 * Extracts Angular inline `template: `…`` regions from a TypeScript source
 * file. Pure and regex-based (v1) — nested template literals inside `${…}`
 * interpolation are out of scope (Angular templates use `{{ }}`, not `${ }`).
 */

export interface TemplateRegion {
	/** Offset of the first character inside the backticks. */
	start: number;
	/** Offset of the closing backtick. */
	end: number;
}

const TEMPLATE_OPEN_RE = /\btemplate\s*:\s*`/g;

/** All inline-template regions in a .ts source. */
export function findInlineTemplateRegions(tsText: string): TemplateRegion[] {
	const regions: TemplateRegion[] = [];
	TEMPLATE_OPEN_RE.lastIndex = 0;
	let match: RegExpExecArray | null;
	while ((match = TEMPLATE_OPEN_RE.exec(tsText)) !== null) {
		const start = match.index + match[0].length;
		let i = start;
		while (i < tsText.length && !(tsText[i] === '`' && tsText[i - 1] !== '\\')) {
			i++;
		}
		regions.push({ start, end: i });
		TEMPLATE_OPEN_RE.lastIndex = i + 1;
	}
	return regions;
}

/** The inline-template region containing `offset`, if any. */
export function getInlineTemplateRegionAt(tsText: string, offset: number): TemplateRegion | undefined {
	return findInlineTemplateRegions(tsText).find((region) => offset >= region.start && offset <= region.end);
}
