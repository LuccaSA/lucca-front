// Regenerates the Composants, Classes and Variables CSS sections of docs/life-cycle.md
// and of docs/life-cycle-deleted.md, which gets the entries whose deletion shipped,
// from LFDeprecatedSelectors.mjs, LFDeprecatedProperties.mjs and the Angular `@deprecated` markers.
// Usage, from the repository root: node .claude/skills/update-deprecated-doc/scripts/generate.mjs
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { marked } from 'marked';
import { pathToFileURL } from 'url';
import { components } from './components.mjs';
import { linkNom } from './links.mjs';
import { nomItems, rootToken } from './nom.mjs';

const dir = 'packages/stylelint-config/';
// A Windows checkout (`core.autocrlf`) brings CRLF: every parser below matches LF only.
const read = (path) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

// Comments inside an `objectPattern` array label the patterns after them: only the source text keeps them.
const groupsOf = (chunk) => {
	const lines = chunk.split('\n').map((l) => l.trim());
	const start = lines.findIndex((l) => l.startsWith('objectPattern:'));
	if (start < 0) return [];
	// A pattern ends its line with a comma, an array closes on a `]` line: Prettier may wrap either.
	const array = lines[start].endsWith('[');
	const end = lines.findIndex((l, k) => (array ? k > start && /^\],?$/.test(l) : k >= start && l.endsWith(',')));
	const groups = [{ label: null, sources: [] }];
	for (const l of lines.slice(start, end + 1)) {
		if (l.startsWith('//')) {
			if (!l.startsWith('// SEE http')) groups.push({ label: l.replace(/^\/\/\s?/, ''), sources: [] });
		} else for (const m of l.matchAll(/\/((?:\\.|[^/])+)\/[gimsuy]*/g)) groups.at(-1).sources.push(m[1]);
	}
	return groups.filter((g) => g.sources.length || g.label);
};
// The data comes from the modules themselves, the labels from their text: both list the entries in the same order.
const load = async (file) => {
	const chunks = read(dir + file)
		.split(/\n\t\{\n/)
		.slice(1);
	const { default: data } = await import(pathToFileURL(dir + file));
	if (chunks.length !== data.length) throw new Error(`${file}: ${chunks.length} entry blocks for ${data.length} entries`);
	return data.map(({ urls, ...e }, k) => ({ ...e, ...urls, groups: groupsOf(chunks[k]) }));
};

const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const actionsHtml = (e) => {
	const schem = e.schematics ? `(<a href="${e.schematics}">schematics</a>)` : '';
	if (!e.actions) return schem || '–';
	const md = e.actions
		// A multi-line template literal keeps the indentation of its `.mjs` entry.
		.replace(/\r/g, '')
		.replace(/^\t{3}/gm, '')
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
// A cell holds one list per group of patterns, each after its label: an unlabeled entry is a single group.
const nomHtml = (e) => {
	const groups = e.groups.some((g) => g.label) ? e.groups : [{ sources: e.groups.flatMap((g) => g.sources) }];
	const list = (sources) =>
		sources.length &&
		nomItems(sources)
			.map((i) => `* ${i}`)
			.join('\n');
	return render(groups.flatMap((g) => [g.label, list(g.sources)].filter(Boolean)).join('\n\n'));
};
// A cell holding a single item takes no list.
const unlist = (html) => {
	const m = html.match(/^<ul>\s*<li>([\s\S]*?)<\/li>\s*<\/ul>(\s+\([\s\S]*\))?$/);
	return m && !m[1].includes('<li>') ? m[1] + (m[2] ?? '') : html;
};

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

// --- Tables ---
const cell = (html) =>
	html.includes('\n') || html.startsWith('<')
		? `\t\t\t<td>\n${html.replace(/^/gm, '\t'.repeat(4))}\n\t\t\t</td>`
		: `\t\t\t<td>${html}</td>`;
const version = (v) => `\t\t\t<td>${v ?? '–'}</td>`;
const row = (nom, e) =>
	['\t\t<tr>', cell(nom), version(e.versionDeprecated), version(e.versionDeleted), cell(unlist(actionsHtml(e))), '\t\t</tr>'].join('\n');
const heads = ['Nom', 'Depuis', 'Suppression', 'Action à réaliser'].map((h) => `\t\t\t<th>${h}</th>`).join('\n');
// Oldest first: by deprecation version, then deletion version; unversioned rows last, in source order.
// The `.mjs` order stays untouched, since Stylelint uses the first matching entry.
const compare = (a, b) => (a && b ? a.localeCompare(b, undefined, { numeric: true }) : !a - !b);
const byVersion = (x, y) =>
	compare(x.versionDeprecated ?? x.versionDeleted, y.versionDeprecated ?? y.versionDeleted) ||
	compare(x.versionDeleted ?? x.versionDeprecated, y.versionDeleted ?? y.versionDeprecated);
const section = (title, source, entries, nom) =>
	`## ${title}\n\n${source}\n\n<table>\n\t<thead>\n\t\t<tr>\n${heads}\n\t\t</tr>\n\t</thead>\n\t<tbody>\n${entries
		.sort(byVersion)
		.map((e) => row(nom(e), e))
		.join('\n')}\n\t</tbody>\n</table>\n`;
const blob = (file) => `[${file}](https://github.com/LuccaSA/lucca-front/blob/master/${dir}${file})`;

const [selectors, properties] = await Promise.all(['LFDeprecatedSelectors.mjs', 'LFDeprecatedProperties.mjs'].map(load));
// A deletion has shipped once its version is at or below the latest stable tag reachable from `HEAD`.
const shipped = execSync("git describe --tags --abbrev=0 --match 'v[0-9]*' --exclude '*-*' HEAD").toString().trim().slice(1);
const deleted = (e) => !!e.versionDeleted && compare(e.versionDeleted, shipped) <= 0;
const named = components([...selectors, ...properties]);
// An entry with a `name` deprecates a whole component: it goes to Composants.
const nom = (e) => unlist(linkNom(nomHtml(e), e));
// Each doc keeps everything before `## Composants`: its title, note and style.
const write = (path, keep) => {
	const pick = (entries) => entries.filter((e) => deleted(e) === keep);
	const sections = [
		section(
			'Composants',
			`Sources : ${blob('LFDeprecatedSelectors.mjs')} et les marqueurs \`@deprecated\` de [packages/ng](https://github.com/LuccaSA/lucca-front/tree/master/packages/ng)`,
			pick(named),
			(e) => nameHtml(e) + tokens(e),
		),
		section('Classes', `Source : ${blob('LFDeprecatedSelectors.mjs')}`, pick(selectors.filter((e) => !e.name)), nom),
		section('Variables CSS', `Source : ${blob('LFDeprecatedProperties.mjs')}`, pick(properties.filter((e) => !e.name)), nom),
	];
	writeFileSync(path, `${read(path).split('## Composants')[0].trimEnd()}\n\n${sections.join('\n')}`);
};
write('docs/life-cycle.md', false);
write('docs/life-cycle-deleted.md', true);
