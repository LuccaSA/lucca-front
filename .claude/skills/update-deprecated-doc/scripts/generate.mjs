// Regenerates the Composants, Classes and Variables CSS sections of docs/life-cycle.md
// from LFDeprecatedSelectors.mjs and LFDeprecatedProperties.mjs.
// Composants lists the entries holding a `name`.
// Everything before `## Composants` (title, note, style) is kept as is.
// Usage, from the repository root: node .claude/skills/update-deprecated-doc/scripts/generate.mjs
import { readFileSync, writeFileSync } from 'fs';
import { marked } from 'marked';
import { components } from './components.mjs';
import { linkNom } from './links.mjs';
import { nomItems, rootToken } from './nom.mjs';

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
				const pm = l.match(/^prisme: '([^']+)'/);
				if (pm) {
					entry.prisme = pm[1];
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
// Nom cells are built in Markdown, then rendered by `marked`: no blank line survives inside a cell.
const code = (t) => `\`${t}\``;
const render = (md) => marked.parse(md).replace(/\n+/g, '\n').trim();
const doc = read(docPath);
const docHead = doc.split('## Composants')[0];
// A cell holds one list per group of patterns, each after its label: an unlabeled entry is a single group.
const nomHtml = (e) => {
	const groups = e.groups.some((g) => g.label) ? e.groups : [{ label: null, sources: e.groups.flatMap((g) => g.sources) }];
	const md = groups.flatMap((g) => [
		...(g.label ? [g.label] : []),
		...(g.sources.length
			? [
					nomItems(g.sources)
						.map((i) => `* ${i}`)
						.join('\n'),
				]
			: []),
	]);
	return render(md.join('\n\n'));
};

const indent = (html, tabs) =>
	html
		.split('\n')
		.map((l) => '\t'.repeat(tabs) + l)
		.join('\n');
const cell = (html, attrs = '') =>
	html.includes('\n') || html.startsWith('<') ? `\t\t\t<td${attrs}>\n${indent(html, 4)}\n\t\t\t</td>` : `\t\t\t<td${attrs}>${html}</td>`;
// A cell holding a single item takes no list.
const unlist = (html) => {
	const m = html.match(/^<ul>\s*<li>([\s\S]*?)<\/li>\s*<\/ul>(\s+\([\s\S]*\))?$/);
	return m && !m[1].includes('<li>') ? m[1] + (m[2] ?? '') : html;
};
const row = (e) => {
	return [
		'\t\t<tr>',
		cell(unlist(linkNom(nomHtml(e), e))),
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
const table = (entries, toRow = row) => `${thead}\n${entries.map(toRow).join('\n')}\n\t</tbody>\n</table>\n`;
const files = { Classes: 'LFDeprecatedSelectors.mjs', 'Variables CSS': 'LFDeprecatedProperties.mjs' };
const entries = Object.fromEntries(Object.entries(files).map(([title, file]) => [title, parse(file)]));
// An entry with a `name` deprecates a whole component: it goes to Composants.
const section = (title) =>
	`## ${title}\n\nSource\u00a0: [${files[title]}](https://github.com/LuccaSA/lucca-front/blob/master/packages/stylelint-config/${files[title]})\n\n${table(
		entries[title].filter((e) => !e.name).sort(byVersionAsc),
	)}`;

// --- Composants ---
// A component shows one root class per pattern, its shortest form: the search still covers every class.
const tokens = (e) => {
	const roots = [...new Set(e.groups.flatMap((g) => g.sources).map(rootToken))];
	// A component without a CSS pattern shows its name only.
	if (!roots.length) return '';
	const html = unlist(linkNom(render(roots.map((r) => `* ${code(r)}`).join('\n')), e, true));
	// A single root sits inline after the name, behind a comma.
	return html.startsWith('<ul>') ? `\n${html}` : `, ${html}`;
};
// The name links to its Prisme page when `urls.prisme` gives one.
const nameHtml = (e) => (e.prisme ? `<a href="${e.prisme}">${esc(e.name)}</a>` : esc(e.name));
const compRow = (e) =>
	[
		'\t\t<tr>',
		cell(nameHtml(e) + tokens(e)),
		`\t\t\t<td>${e.versionDeprecated ?? '–'}</td>`,
		`\t\t\t<td>${e.versionDeleted ?? '–'}</td>`,
		cell(unlist(actionsHtml(e))),
		'\t\t</tr>',
	].join('\n');
const composants = `## Composants\n\nSources\u00a0: [${files.Classes}](https://github.com/LuccaSA/lucca-front/blob/master/packages/stylelint-config/${files.Classes}) et les marqueurs \`@deprecated\` de [packages/ng](https://github.com/LuccaSA/lucca-front/tree/master/packages/ng)\n\n${table(components(Object.values(entries).flat()).sort(byVersionAsc), compRow)}`;

writeFileSync(docPath, `${docHead.trimEnd()}\n\n${composants}\n${section('Classes')}\n${section('Variables CSS')}`);
