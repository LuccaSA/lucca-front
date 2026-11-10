/** Skill authoring guidance: a reference file longer than this gets a table of contents, so a partial read still shows its whole scope. */
const TOC_MIN_LINES = 100;

const FENCE = /^\s*(```|~~~)/;
const HEADING = /^(#{1,3})\s+(.+?)\s*#*\s*$/;

/**
 * Inserts a table of contents under the title of a long page: headings up to H3, plain text with no
 * anchors or line numbers, which would change on every regeneration. ZeroHeight pages carry several
 * H1s, so every H1 after the title is listed too.
 */
export function withTableOfContents(content: string): string {
	const lines = content.split('\n');
	if (lines.length <= TOC_MIN_LINES) return content;

	const hasTitle = /^# /.test(lines[0]);
	const headings: { level: number; text: string }[] = [];
	let inFence = false;
	for (const [i, line] of lines.entries()) {
		if (FENCE.test(line)) inFence = !inFence;
		if (inFence || (hasTitle && i === 0)) continue;
		const match = HEADING.exec(line);
		if (!match) continue;
		const text = match[2].replace(/\*\*|__/g, '').trim();
		if (text) headings.push({ level: match[1].length, text });
	}
	if (headings.length === 0) return content;

	const topLevel = Math.min(...headings.map((h) => h.level));
	const toc = ['**Sommaire**', '', ...headings.map((h) => `${'  '.repeat(h.level - topLevel)}- ${h.text}`)];
	const [head, body] = hasTitle ? [[lines[0], ''], lines.slice(1)] : [[], lines];
	return [...head, ...toc, ...(body[0] === '' ? [] : ['']), ...body].join('\n');
}
