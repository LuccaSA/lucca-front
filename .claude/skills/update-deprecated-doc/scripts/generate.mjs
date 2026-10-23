// Regenerates the Classes and Variables CSS sections of docs/life-cycle.md
// from LFDeprecatedSelectors.mjs and LFDeprecatedProperties.mjs.
// Composants keeps the Prisme rows and merges the entries holding a `name` into them.
// Everything else before `## Classes` (title, note, style) is kept as is.
// Usage, from the repository root: node .claude/skills/update-deprecated-doc/scripts/generate.mjs
import { readFileSync, writeFileSync } from 'fs';
import { marked } from 'marked';

const dir = 'packages/stylelint-config/';
const docPath = 'docs/life-cycle.md';
// A Windows checkout (`core.autocrlf`) brings CRLF: every parser below matches LF only.
const read = (path) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

const parse = (file) => {
	const text = read(dir + file);
	return text
		.split(/\n\t\{\n/)
		.slice(1)
		.map((chunk) => {
			chunk = chunk.split(/\n\t\},?/)[0];
			const lines = chunk.split('\n');
			const entry = { groups: [{ label: null, sources: [] }], actions: null, schematics: null };
			let inPattern = false,
				inActions = false,
				actionsBuf = [];
			for (const raw of lines) {
				const l = raw.trim();
				if (inActions) {
					if (l === '`,') {
						entry.actions = actionsBuf.join('\n');
						inActions = false;
						continue;
					}
					actionsBuf.push(raw.replace(/^\t\t\t/, ''));
					continue;
				}
				if (l.startsWith('objectPattern:')) inPattern = true;
				if (l.startsWith('//')) {
					const c = l.replace(/^\/\/\s?/, '');
					if (/^SEE http/.test(c)) continue;
					if (inPattern) entry.groups.push({ label: c, sources: [] });
					continue;
				}
				const vm = l.match(/^version(Deprecated|Deleted): '([^']+)'/);
				if (vm) {
					entry['version' + vm[1]] = vm[2];
					continue;
				}
				if (/^actions: `$/.test(l)) {
					inActions = true;
					continue;
				}
				const am = l.match(/^actions: `(.*)`,$/);
				if (am) {
					entry.actions = am[1];
					continue;
				}
				// Any other actions form would be dropped silently: refuse it.
				if (l.startsWith('actions:')) throw new Error(`${file}: actions must be a template literal, got: ${l}`);
				const nm = l.match(/^name: '([^']+)'/);
				if (nm) {
					entry.name = nm[1];
					continue;
				}
				const sm = l.match(/^schematics: '([^']+)'/);
				if (sm) {
					entry.schematics = sm[1];
					continue;
				}
				// regex literals on the line
				for (const rm of l.matchAll(/\/((?:\\.|[^\/])+)\/[gimsuy]*/g)) entry.groups[entry.groups.length - 1].sources.push(rm[1]);
				if (inPattern && /\],?$/.test(l) && !l.includes('[')) inPattern = false;
			}
			entry.groups = entry.groups.filter((g) => g.sources.length || g.label);
			return entry;
		});
};

const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const actionsHtml = (e) => {
	const schem = e.schematics ? `(<a href="${e.schematics}">schematics</a>)` : '';
	if (!e.actions) return schem || '–';
	const md = e.actions
		// The `.mjs` files hold template literals: undo their escapes.
		.replace(/\\([\\`$])/g, '$1')
		// A `*` legend renders small.
		.replace(/^((?:`\*` = |\(`\*`: ).*)$/gm, '<small>$1</small>')
		.trim();
	// A lone one-line sentence without schematics stays bare in its cell.
	if (!schem && !/\n|^\* /.test(md)) return marked.parseInline(md);
	const html = marked.parse(md).trim();
	return schem ? `${html}\n${schem}` : html;
};

// --- Nom derivation ---
const clean = (src) =>
	src
		.replace(/\(\?!\[\\w-\]\)/g, '')
		.replace(/\\b/g, '')
		.replace(/\\([.@-])/g, '$1');
const expand = (s) => {
	// expand one (a|b|c) group (optionally suffixed ?) recursively; bail on regex syntax leftovers
	const m = s.match(/\(([^()]*)\)(\?)?/);
	if (!m) return /[\[\]{}?*+|\\]/.test(s.replace(/\\@/g, '@')) ? null : [s];
	const alts = m[1].split('|');
	if (m[1].includes('(') || alts.some((a) => /[\[\]{}?*+]/.test(a))) return null;
	const opts = m[2] ? ['', ...alts] : alts;
	const out = [];
	for (const o of opts) {
		const sub = expand(s.slice(0, m.index) + o + s.slice(m.index + m[0].length));
		if (!sub) return null;
		out.push(...sub);
	}
	return out;
};
const li = (t) => `<li><code>${esc(t)}</code></li>`;
const comboRe = /^\(\?=\\S\*(.+?)\)\(\?=\\S\*(.+?)\)\\S\*$/;
const nomItems = (src) => {
	const cm = src.match(comboRe);
	if (cm) {
		const a = expand(clean(cm[1])),
			b = expand(clean(cm[2]));
		if (!a || !b) return null;
		return a.flatMap((x) => b.map((y) => `<li><code>${esc(x)}</code> <strong>+</strong> <code>${esc(y)}</code></li>`));
	}
	const ex0 = expand(clean(src));
	const ex = ex0 && [...new Set(ex0)];
	return ex && ex.length <= 10 ? ex.map(li) : null;
};
// Derives the Nom cell when every pattern expands to a short plain list and no comment labels it.
const autoNom = (e) => {
	if (e.groups.some((g) => g.label)) return null;
	const items = [];
	for (const src of e.groups.flatMap((g) => g.sources)) {
		const it = nomItems(src);
		if (!it) return null;
		items.push(...it);
	}
	// Longer lists need factoring, which the agent writes.
	if (items.length > 10) return null;
	return `<ul>\n${items.map((i) => '\t' + i).join('\n')}\n</ul>`;
};
// Agent-written Nom cells from the current doc, keyed by their `data-pattern`.
const escAttr = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const unescAttr = (t) => t.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
const doc = read(docPath);
const [docHead, docTail = ''] = doc.split('## Classes');
const composantsText = docHead.slice(docHead.indexOf('## Composants'));
const writtenIn = (text) =>
	[...text.matchAll(/<td data-pattern="([^"]*)">\n([\s\S]*?)\n\t\t\t<\/td>/g)]
		// A leftover TODO placeholder is not a written cell: keep reporting it until the agent fills it.
		.filter(([, , body]) => !body.includes('<!-- TODO'))
		.map(([, key, body]) => [unescAttr(key), body.replace(/^\t{4}/gm, '')]);
const written = new Map([
	...writtenIn(docTail),
	// A Composants Nom cell starts with the component name line: the written part follows it.
	...writtenIn(composantsText).map(([key, body]) => [key, body.split('\n').slice(1).join('\n')]),
]);
const missing = [];

// Returns the Nom cell, plus the pattern key when the agent writes it.
const nomHtml = (e) => {
	const key = e.groups.flatMap((g) => g.sources)[0];
	const kept = written.get(key);
	if (kept) return { html: kept, key };
	const auto = autoNom(e);
	if (auto) return { html: auto };
	missing.push(key);
	return { html: '<!-- TODO: write this Nom cell, see SKILL.md -->', key };
};

// --- Search links: each Nom token links to a GitHub code search of the org's consumers ---
// GitHub code search regexes have no lookaround: a token boundary is a non-token character or a line edge.
const ghBefore = '(^|[^\\w-])';
const ghAfter = '([^\\w-]|$)';
// A class is searched as a selector (`.name`) or as a token of a `class` attribute: the bare word would match any identifier.
const ghClassBefore = '(\\.|class="([^"]*\\s)?)';
const ghToken = (src) =>
	(src.startsWith('\\.') ? ghClassBefore : ghBefore) +
	src
		.replace(/^\\\./, '')
		.replace(/\(\?!\[\\w-\]\)/g, ghAfter)
		.replace(/\\b/g, ghAfter)
		// `\@` in a Sass selector is a plain `@` in markup.
		.replace(/\\\\@/g, '\\\\?@');
const ghCombo = (src) => {
	const m = src.match(comboRe);
	return (m ? [m[1], m[2]] : [src]).map((s) => `/${ghToken(s)}/`).join(' AND ');
};
// A displayed token: `(a|b)` groups stay alternations, `…` crops fall back to the entry patterns.
const ghDisplayed = (text) => `/${text.startsWith('.') ? ghClassBefore : ghBefore}${text.replace(/^\./, '').replace(/[.*+[\]{}^$\\]/g, '\\$&')}${ghAfter}/`;
// Alternatives are grouped: the repository filters must apply to every one of them.
const searchUrl = (q) => `https://github.com/search?q=${encodeURIComponent(`${q.includes(' OR ') ? `(${q})` : q} org:LuccaSA NOT repo:LuccaSA/lucca-front`)}&amp;type=code`;
const unesc = (t) => t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
// `shared` links every item to the search of all the entry's patterns.
const linkNom = (html, e, shared = false) => {
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

const indent = (html, tabs) =>
	html
		.split('\n')
		.map((l) => '\t'.repeat(tabs) + l)
		.join('\n');
const cell = (html, attrs = '') =>
	html.includes('\n') || html.startsWith('<') ? `\t\t\t<td${attrs}>\n${indent(html, 4)}\n\t\t\t</td>` : `\t\t\t<td${attrs}>${html}</td>`;
// A cell holding a single item takes no list. A kept Nom cell may come back list-less from the doc:
// it is wrapped again so that `linkNom` finds its item.
// A `(qualifier)` after the list stays after the item.
const unlist = (html) => {
	const m = html.match(/^<ul>\s*<li>([\s\S]*?)<\/li>\s*<\/ul>(\s+\([\s\S]*\))?$/);
	return m && !m[1].includes('<li>') ? m[1] + (m[2] ?? '') : html;
};
const relist = (html) => {
	if (html.includes('<li>') || !html.includes('<code>')) return html;
	const [, item, qualifier = ''] = html.match(/^([\s\S]*<\/code>(?:<\/a>)?)(\s+\([\s\S]*\))?$/) ?? [, html];
	return `<ul>\n\t<li>${item}</li>\n</ul>${qualifier}`;
};
const row = (e) => {
	const nom = nomHtml(e);
	return [
		'\t\t<tr>',
		cell(unlist(linkNom(relist(nom.html), e)), nom.key ? ` data-pattern="${escAttr(nom.key)}"` : ''),
		`\t\t\t<td>${e.versionDeprecated ?? '–'}</td>`,
		`\t\t\t<td>${e.versionDeleted ?? '–'}</td>`,
		cell(unlist(actionsHtml(e))),
		'\t\t</tr>',
	].join('\n');
};

const thead = [
	'<table>',
	'\t<thead>',
	'\t\t<tr>',
	'\t\t\t<th>Nom</th>',
	'\t\t\t<th>Depuis</th>',
	'\t\t\t<th>Suppression</th>',
	'\t\t\t<th>Action à réaliser</th>',
	'\t\t</tr>',
	'\t</thead>',
	'\t<tbody>',
].join('\n');
// Oldest first: by deprecation version, then deletion version; unversioned rows last, in source order.
// The `.mjs` order stays untouched, since Stylelint uses the first matching entry.
const semver = (v) => (v ? v.split('.').map(Number) : null);
const compareDesc = (a, b) => {
	if (!a || !b) return (a ? 0 : 1) - (b ? 0 : 1);
	for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return b[i] - a[i];
	return 0;
};
const compareAsc = (a, b) => (!a || !b ? compareDesc(a, b) : compareDesc(b, a));
const byVersionAsc = (x, y) =>
	compareAsc(semver(x.versionDeprecated ?? x.versionDeleted), semver(y.versionDeprecated ?? y.versionDeleted)) ||
	compareAsc(semver(x.versionDeleted ?? x.versionDeprecated), semver(y.versionDeleted ?? y.versionDeprecated));
const table = (entries) => `${thead}\n${entries.map(row).join('\n')}\n\t</tbody>\n</table>\n`;
const files = { Classes: 'LFDeprecatedSelectors.mjs', 'Variables CSS': 'LFDeprecatedProperties.mjs' };
const entries = Object.fromEntries(Object.entries(files).map(([title, file]) => [title, parse(file)]));
// An entry with a `name` deprecates a whole component: it goes to Composants.
const section = (title) =>
	`## ${title}\n\nSource\u00a0: [${files[title]}](https://github.com/LuccaSA/lucca-front/blob/master/packages/stylelint-config/${files[title]})\n\n${table(
		entries[title].filter((e) => !e.name).sort(byVersionAsc),
	)}`;

// --- Composants: the Prisme rows, merged with the named entries ---
// Entries sharing a name merge into one: their patterns add up, the first defined value wins otherwise.
const named = new Map();
for (const e of Object.values(entries)
	.flat()
	.filter((e) => e.name)) {
	const m = named.get(e.name);
	if (!m) named.set(e.name, { ...e, groups: [...e.groups] });
	else {
		m.groups.push(...e.groups);
		for (const k of ['versionDeprecated', 'versionDeleted', 'actions', 'schematics']) m[k] ??= e[k];
	}
}
const plainText = (html) => unesc(html.replace(/<[^>]*>/g, '')).trim();
const tdRe = /\t\t\t<td[^>]*>(?:\n([\s\S]*?)\n\t\t\t<\/td>|(.*?)<\/td>)/g;
const dash = (v) => (v === '–' ? undefined : v);
// A row the generator added carries `data-name`: each run rebuilds it.
const prismeRows = [...composantsText.matchAll(/\t\t<tr( data-name="[^"]*")?>\n([\s\S]*?)\n\t\t<\/tr>/g)]
	.filter(([, marker, body]) => !marker && body.includes('<td'))
	.map(([raw, , body]) => {
		const tds = [...body.matchAll(tdRe)];
		const content = tds.map((m) => (m[1] !== undefined ? m[1].replace(/^\t{4}/gm, '') : m[2]));
		// Every row is a deprecation: Prisme's `Deprecated` prefix goes.
		// A single root sits inline after the name: it goes too, each run adds it back.
		const line = content[0]
			.split('\n')[0]
			.replace(/^Deprecated /, '')
			.replace(/, <a href="https:\/\/github\.com\/search[^"]*"><code>[^<]*<\/code><\/a>$/, '');
		return {
			raw,
			tds: tds.map((m) => m[0]),
			line,
			versionDeprecated: dash(content[1]),
			versionDeleted: dash(content[2]),
			action: content[3],
		};
	});
// A component shows one root class per pattern, its shortest form: the search still covers every class.
const root = (src) => {
	const ex = expand(clean(src));
	return ex ? ex.reduce((a, b) => (b.length < a.length ? b : a)) : clean(src);
};
const tokens = (e) => {
	const roots = [...new Set(e.groups.flatMap((g) => g.sources).map(root))];
	const html = unlist(linkNom(`<ul>\n${roots.map((r) => '\t' + li(r)).join('\n')}\n</ul>`, e, true));
	// A single root sits inline after the name, behind a comma.
	return html.startsWith('<ul>') ? `\n${html}` : `, ${html}`;
};
const compRow = ({ line, tds, action }, e, marker = '') => {
	return [
		`\t\t<tr${marker}>`,
		cell(line + tokens(e)),
		`\t\t\t<td>${e.versionDeprecated ?? '–'}</td>`,
		`\t\t\t<td>${e.versionDeleted ?? '–'}</td>`,
		// The Prisme action wins: the entry's fills a missing one.
		tds && action !== '–' ? tds[3] : cell(unlist(actionsHtml(e))),
		'\t\t</tr>',
	].join('\n');
};
const compRows = prismeRows.map((r) => {
	const e = named.get(plainText(r.line));
	if (!e) return { ...r, html: r.raw.replace(/(\t\t\t<td[^>]*>(?:\n\t{4})?)Deprecated /, '$1') };
	named.delete(plainText(r.line));
	// The entry's dates win: Prisme fills the missing ones.
	const merged = {
		...e,
		versionDeprecated: e.versionDeprecated ?? r.versionDeprecated,
		versionDeleted: e.versionDeleted ?? r.versionDeleted,
	};
	return { ...merged, html: compRow(r, merged) };
});
for (const [name, e] of named) compRows.push({ ...e, html: compRow({ line: esc(name) }, e, ` data-name="${escAttr(name)}"`) });
const composants = composantsText.replace(
	/(<tbody>\n)[\s\S]*(\n\t<\/tbody>)/,
	(_, open, close) =>
		`${open}${compRows
			.sort(byVersionAsc)
			.map((r) => r.html)
			.join('\n')
			// Prisme's actions match the `.mjs` wording.
			.replace(/À remplacer par/g, 'Remplacer par')}${close}`,
);

const head = (docHead.slice(0, docHead.indexOf('## Composants')) + composants).trimEnd();
writeFileSync(docPath, `${head}\n\n${section('Classes')}\n${section('Variables CSS')}`);
if (missing.length) {
	console.error(`Write these Nom cells in ${docPath}, following SKILL.md:\n${missing.map((k) => `- /${k}/`).join('\n')}`);
	process.exit(1);
}
