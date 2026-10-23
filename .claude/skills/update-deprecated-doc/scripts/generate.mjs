// Regenerates the Classes and Variables CSS sections of docs/life-cycle.md
// from LFDeprecatedSelectors.mjs and LFDeprecatedProperties.mjs.
// Everything before `## Classes` (title, note, style, Composants) is kept as is.
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
const written = new Map(
	[...read(docPath).matchAll(/<td data-pattern="([^"]*)">\n([\s\S]*?)\n\t\t\t<\/td>/g)]
		// A leftover TODO placeholder is not a written cell: keep reporting it until the agent fills it.
		.filter(([, , body]) => !body.includes('<!-- TODO'))
		.map(([, key, body]) => [unescAttr(key), body.replace(/^\t{4}/gm, '')]),
);
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
// The `.` of a class is dropped: markup writes `class="name"`, not `.name`.
const ghToken = (src) =>
	ghBefore +
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
const ghDisplayed = (text) => `/${ghBefore}${text.replace(/^\./, '').replace(/[.*+[\]{}^$\\]/g, '\\$&')}${ghAfter}/`;
const searchUrl = (q) => `https://github.com/search?q=${encodeURIComponent(`${q} org:LuccaSA NOT repo:LuccaSA/lucca-front`)}&amp;type=code`;
const unesc = (t) => t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const linkNom = (html, e) => {
	const sources = e.groups.flatMap((g) => g.sources);
	const fallback = sources.map((s) => (sources.length > 1 && comboRe.test(s) ? `(${ghCombo(s)})` : ghCombo(s))).join(' OR ');
	const link = (q, code) => `<a href="${searchUrl(q)}">${code}</a>`;
	return html
		.replace(/<a href="https:\/\/github\.com\/search[^"]*">(<code>[\s\S]*?<\/code>)<\/a>/g, '$1')
		.replace(/<li>([\s\S]*?)<\/li>/g, (whole, inner) => {
			const codes = [...inner.matchAll(/<code>([\s\S]*?)<\/code>/g)].map((m) => unesc(m[1]));
			if (!codes.length) return whole;
			const query = codes.some((c) => c.includes('…'))
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
const row = (e) => {
	const nom = nomHtml(e);
	return [
		'\t\t<tr>',
		cell(linkNom(nom.html, e), nom.key ? ` data-pattern="${escAttr(nom.key)}"` : ''),
		`\t\t\t<td>${e.versionDeprecated ?? '–'}</td>`,
		`\t\t\t<td>${e.versionDeleted ?? '–'}</td>`,
		cell(actionsHtml(e)),
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
// Deletions up to this version affect under 25% of the org's projects: SKILL.md gives the refresh steps.
const collapseUpTo = '21.2.2';
const removedUpTo = (e) => e.versionDeleted && compareDesc(semver(e.versionDeleted), semver(collapseUpTo)) >= 0;
const table = (entries) => `${thead}\n${entries.map(row).join('\n')}\n\t</tbody>\n</table>\n`;
const section = (title, file) => {
	const entries = parse(file).sort(byVersionAsc);
	const removed = entries.filter(removedUpTo);
	const collapsed = removed.length
		? `\n<details>\n<summary>Suppressions jusqu\u2019\u00e0 la ${collapseUpTo}</summary>\n\n${table(removed)}\n</details>\n`
		: '';
	return `## ${title}\n\nSource\u00a0: [${file}](https://github.com/LuccaSA/lucca-front/blob/master/packages/stylelint-config/${file})\n\n${table(entries.filter((e) => !removedUpTo(e)))}${collapsed}`;
};

const head = read(docPath).split('## Classes')[0].trimEnd();
writeFileSync(
	docPath,
	`${head}\n\n${section('Classes', 'LFDeprecatedSelectors.mjs')}\n${section('Variables CSS', 'LFDeprecatedProperties.mjs')}`,
);
if (missing.length) {
	console.error(`Write these Nom cells in ${docPath}, following SKILL.md:\n${missing.map((k) => `- /${k}/`).join('\n')}`);
	process.exit(1);
}
