// Links each Nom token to a GitHub code search of the org's consumers.
import { comboRe } from './nom.mjs';

// A token can open with a negative lookbehind, such as the `(?<![\w.#="'-])` of an element selector.
const leadingGuard = /^\(\?<!\[[^\]]*\]\)/;
// GitHub code search regexes have no lookaround: a token boundary is a non-token character or a line edge.
const ghBefore = '(^|[^\\w-])';
const ghAfter = '([^\\w-]|$)';
// A class is searched as a selector (`.name`) or as a token of a `class` attribute: the bare word would match any identifier.
const ghClassBefore = '(\\.|class="([^"]*\\s)?)';
const ghToken = (src) =>
	(src.startsWith('\\.') ? ghClassBefore : ghBefore) +
	src
		.replace(/^\\\./, '')
		.replace(leadingGuard, '')
		.replace(/\(\?!\[\\w-\]\)/g, ghAfter)
		.replace(/\\b/g, ghAfter)
		// `\@` in a Sass selector is a plain `@` in markup.
		.replace(/\\\\@/g, '\\\\?@');
const ghCombo = (src) => {
	const m = src.match(comboRe);
	return (m ? [m[1], m[2]] : [src]).map((s) => `/${ghToken(s)}/`).join(' AND ');
};
// A displayed token: `(a|b)` groups stay alternations, `…` crops fall back to the entry patterns.
const ghDisplayed = (text) =>
	`/${text.startsWith('.') ? ghClassBefore : ghBefore}${text.replace(/^\./, '').replace(/[.*+[\]{}^$\\]/g, '\\$&')}${ghAfter}/`;
// Alternatives are grouped: the repository filters must apply to every one of them.
// Parentheses are encoded too: an unbalanced one would end the Markdown link destination.
const searchUrl = (q) =>
	`https://github.com/search?q=${encodeURIComponent(`${q.includes(' OR ') ? `(${q})` : q} org:LuccaSA NOT repo:LuccaSA/lucca-front`).replace(/[()]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)}&type=code`;
// `shared` links every item to the search of all the entry's patterns.
export const linkNom = (items, e, shared = false) => {
	const sources = e.groups.flatMap((g) => g.sources);
	const fallback = sources.map((s) => (sources.length > 1 && comboRe.test(s) ? `(${ghCombo(s)})` : ghCombo(s))).join(' OR ');
	return items.map((item) => {
		const codes = [...item.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
		if (!codes.length) return item;
		const query =
			shared || codes.some((c) => c.includes('…'))
				? fallback
				: codes.length === 2 && item.includes('**+**')
					? codes.map(ghDisplayed).join(' AND ')
					: ghDisplayed(codes[0]);
		return item.replace(/`[^`]+`/g, (code) => `[${code}](${searchUrl(query)})`);
	});
};
