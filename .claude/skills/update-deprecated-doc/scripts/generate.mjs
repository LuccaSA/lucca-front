// Regenerates the Classes and Variables CSS sections of docs/life-cycle.md
// from LFDeprecatedSelectors.mjs and LFDeprecatedProperties.mjs.
// Everything before `## Classes` (title, note, style, Composants) is kept as is.
// Usage, from the repository root: node .claude/skills/update-deprecated-doc/scripts/generate.mjs
import { readFileSync, writeFileSync } from 'fs';

const dir = 'packages/stylelint-config/';
const docPath = 'docs/life-cycle.md';

const parse = (file) => {
	const text = readFileSync(dir + file, 'utf8');
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
const inline = (t) =>
	esc(t)
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
		.replace(/`([^`]+)`/g, '<code>$1</code>')
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

const actionsHtml = (e) => {
	const schem = e.schematics ? `(<a href="${e.schematics}">schematics</a>)` : '';
	if (!e.actions) return schem || '–';
	// Template literals in the `.mjs` files escape their backticks.
	const blocks = e.actions
		.replace(/\\`/g, '`')
		.split(/\n\s*\n/)
		.map((b) => b.trim())
		.filter(Boolean);
	const parts = blocks.map((b) => {
		if (b.startsWith('* ')) {
			const items = [];
			for (const l of b.split('\n')) {
				// A two-space continuation line goes on a new line of the same item; a tab-indented item nests.
				if (/^ {2}\S/.test(l)) items.at(-1).lines.push(l.trim());
				else if (/^\t\* /.test(l)) items.at(-1).children.push(l.replace(/^\t\*\s+/, ''));
				else items.push({ lines: [l.replace(/^\*\s+/, '')], children: [] });
			}
			const lis = items.map(({ lines, children }) => {
				const text = lines.map(inline).join('<br>');
				if (!children.length) return `\t<li>${text}</li>`;
				const sub = children.map((ch) => `\t\t\t<li>${inline(ch)}</li>`).join('\n');
				return `\t<li>\n\t\t${text}\n\t\t<ul>\n${sub}\n\t\t</ul>\n\t</li>`;
			});
			return `<ul>\n${lis.join('\n')}\n</ul>`;
		}
		if (/^(`\*` = |\(`\*`: )/.test(b)) return `<p><small>${inline(b)}</small></p>`;
		return `<p>${b.split('\n').map(inline).join('<br>')}</p>`;
	});
	// A lone one-line sentence without schematics stays bare in its cell.
	if (blocks.length === 1 && !schem && !/^\* |\n/.test(blocks[0])) return inline(blocks[0]);
	if (schem) parts.push(schem);
	return parts.join('\n');
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
	[...readFileSync(docPath, 'utf8').matchAll(/<td data-pattern="([^"]*)">\n([\s\S]*?)\n\t\t\t<\/td>/g)].map(([, key, body]) => [
		unescAttr(key),
		body.replace(/^\t{4}/gm, ''),
	]),
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
		cell(nom.html, nom.key ? ` data-pattern="${escAttr(nom.key)}"` : ''),
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
// Newest first: by deprecation version, then deletion version; unversioned rows last, in source order.
// The `.mjs` order stays untouched, since Stylelint uses the first matching entry.
const semver = (v) => (v ? v.split('.').map(Number) : null);
const compareDesc = (a, b) => {
	if (!a || !b) return (a ? 0 : 1) - (b ? 0 : 1);
	for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return b[i] - a[i];
	return 0;
};
const byVersionDesc = (x, y) =>
	compareDesc(semver(x.versionDeprecated ?? x.versionDeleted), semver(y.versionDeprecated ?? y.versionDeleted)) ||
	compareDesc(semver(x.versionDeleted ?? x.versionDeprecated), semver(y.versionDeleted ?? y.versionDeprecated));
const section = (title, file) =>
	`## ${title}\n\nSource\u00a0: [${file}](https://github.com/LuccaSA/lucca-front/blob/master/packages/stylelint-config/${file})\n\n${thead}\n${parse(file).sort(byVersionDesc).map(row).join('\n')}\n\t</tbody>\n</table>\n`;

const head = readFileSync(docPath, 'utf8').split('## Classes')[0].trimEnd();
writeFileSync(
	docPath,
	`${head}\n\n${section('Classes', 'LFDeprecatedSelectors.mjs')}\n${section('Variables CSS', 'LFDeprecatedProperties.mjs')}`,
);
if (missing.length) {
	console.error(`Write these Nom cells in ${docPath}, following SKILL.md:\n${missing.map((k) => `- /${k}/`).join('\n')}`);
	process.exit(1);
}
