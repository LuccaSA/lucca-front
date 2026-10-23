// Links each Nom token to a GitHub code search of the org's consumers.
import { comboRe } from './nom.mjs';

// An element selector opens with the lookbehind `(?<![\w.#-])`: it keeps classes and ids out.
const elementStart = /^\(\?<!\[\\w\.#-\]\)/;
// GitHub code search regexes have no lookaround: a token boundary is a non-token character or a line edge.
const ghBefore = '(^|[^\\w-])';
const ghAfter = '([^\\w-]|$)';
// A class is searched as a selector (`.name`) or as a token of a `class` attribute: the bare word would match any identifier.
const ghClassBefore = '(\\.|class="([^"]*\\s)?)';
const ghToken = (src) =>
	(src.startsWith('\\.') ? ghClassBefore : ghBefore) +
	src
		.replace(/^\\\./, '')
		.replace(elementStart, '')
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
const searchUrl = (q) =>
	`https://github.com/search?q=${encodeURIComponent(`${q.includes(' OR ') ? `(${q})` : q} org:LuccaSA NOT repo:LuccaSA/lucca-front`)}&amp;type=code`;
const unesc = (t) => t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
// `shared` links every item to the search of all the entry's patterns.
export const linkNom = (html, e, shared = false) => {
	const sources = e.groups.flatMap((g) => g.sources);
	const fallback = sources.map((s) => (sources.length > 1 && comboRe.test(s) ? `(${ghCombo(s)})` : ghCombo(s))).join(' OR ');
	const link = (q, code) => `<a href="${searchUrl(q)}">${code}</a>`;
	return html
		.replace(/<a href="https:\/\/github\.com\/search[^"]*">(<code>[\s\S]*?<\/code>)<\/a>/g, '$1')
		.replace(/<li>([\s\S]*?)<\/li>/g, (whole, inner) => {
			const codes = [...inner.matchAll(/<code>([\s\S]*?)<\/code>/g)].map((m) => unesc(m[1]));
			if (!codes.length) return whole;
			const query =
				shared || codes.some((c) => c.includes('…'))
					? fallback
					: codes.length === 2 && inner.includes('<strong>+</strong>')
						? codes.map(ghDisplayed).join(' AND ')
						: ghDisplayed(codes[0]);
			return `<li>${inner.replace(/<code>[\s\S]*?<\/code>/g, (code) => link(query, code))}</li>`;
		});
};
