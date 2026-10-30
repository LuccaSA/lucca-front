// Regenerates the Composants, Classes, Variables CSS and Mixins sections of docs/life-cycle.md
// and of docs/life-cycle-deleted.md, which gets the entries whose deletion shipped,
// from LFDeprecatedSelectors.mjs, LFDeprecatedProperties.mjs, LFDeprecatedScss.mjs and the Angular `@deprecated` markers.
// Usage, from the repository root: node .claude/skills/update-deprecated-doc/scripts/generate.mjs
import { execFileSync } from 'child_process';
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
	return data.map(({ urls, ...e }, k) => ({ ...e, ...urls, groups: groupsOf(chunks[k]), sources: [file] }));
};

// A schematics link shows the schematic name `collection.json` registers for its folder: `tokens-spacing/` holds `tokens-spacings`.
const schematicNames = Object.fromEntries(
	Object.entries(JSON.parse(read('packages/ng/schematics/collection.json')).schematics).map(([name, { factory }]) => [
		factory.split('/')[1],
		name,
	]),
);
const schematicLink = (url) => {
	const name = schematicNames[url.split('/').pop()];
	if (!name) throw new Error(`No registered schematic at ${url}`);
	return `[**Schematic** : ${name}](${url})`;
};

// --- Cells ---
// ZeroHeight renders no HTML in Markdown but `<br>`: a cell stacks its lines with it.
// A line is a paragraph (`depth` -1) or a list item: items open with `-`, sub-items with `•` behind no-break spaces.
const line = (md, depth = -1) => ({ md, depth });
const marker = (depth) => (depth < 0 ? '' : depth ? `${'\u00A0'.repeat(4 * depth)}• ` : '- ');
const cell = (lines) =>
	lines
		// The sources write their mapping arrows `=>`: the docs show them as `⇒`.
		.map(({ md, depth }) => marker(depth) + md.replace(/ =>(?= |$)/g, ' ⇒'))
		.join('<br>')
		// A pipe ends the cell, even inside a code span.
		.replace(/\|/g, '\\|') || '–';
// A cell holding a single item takes no list.
const unlist = (lines) => (lines.length === 1 && lines[0].depth === 0 ? [line(lines[0].md)] : lines);
// A list item keeps its text, its sub-list goes one level deeper.
const mdLines = (tokens, depth = -1) =>
	tokens.flatMap((t) => {
		if (t.type === 'space') return [];
		if (t.type === 'paragraph' || t.type === 'text') return [line(t.text.replace(/\n/g, ' '), depth)];
		if (t.type === 'list') return t.items.flatMap((i) => mdLines(i.tokens, depth + 1));
		throw new Error(`Unsupported Markdown block in actions: ${t.type}`);
	});
const actionLines = (e) => {
	const schem = e.schematics ? [line(schematicLink(e.schematics))] : [];
	if (!e.actions) return schem;
	const md = e.actions
		// A multi-line template literal keeps the indentation of its `.mjs` entry.
		.replace(/\r/g, '')
		.replace(/^\t{3}/gm, '')
		.trim();
	return [...schem, ...mdLines(marked.lexer(md))];
};

// --- Nom derivation ---
const code = (t) => `\`${t}\``;
// A cell holds one list per group of patterns, each after its label: an unlabeled entry is a single group.
const nomLines = (e) => {
	const groups = e.groups.some((g) => g.label) ? e.groups : [{ sources: e.groups.flatMap((g) => g.sources) }];
	return groups.flatMap((g) => [
		...(g.label ? [line(g.label)] : []),
		...(g.sources.length ? linkNom(nomItems(g.sources), e) : []).map((md) => line(md, 0)),
	]);
};

// --- Composants ---
// A component shows one root class per pattern, its shortest form: the search still covers every class.
// The name links to its Prisme page when `urls.prisme` gives one.
const componentLines = (e) => {
	const name = e.prisme ? `[${e.name}](${e.prisme})` : e.name;
	const roots = linkNom([...new Set(e.groups.flatMap((g) => g.sources).map(rootToken))].map(code), e, true);
	// A single root sits inline after the name, behind a comma: a component without a CSS pattern shows its name only.
	return roots.length === 1 ? [line(`${name}, ${roots[0]}`)] : [line(name), ...roots.map((md) => line(md, 0))];
};

// --- Tables ---
const row = (nom, e) => `| ${[cell(nom), e.versionDeprecated ?? '–', e.versionDeleted ?? '–', cell(unlist(actionLines(e)))].join(' | ')} |`;
// The version columns are centered.
const heads = '| Nom | Depuis | Suppression | Action à réaliser |\n| --- | :---: | :---: | --- |';
// Oldest first: by deprecation version, then deletion version; unversioned rows last, in source order.
// The `.mjs` order stays untouched, since Stylelint uses the first matching entry.
const compare = (a, b) => (a && b ? a.localeCompare(b, undefined, { numeric: true }) : !a - !b);
const byVersion = (x, y) =>
	compare(x.versionDeprecated ?? x.versionDeleted, y.versionDeprecated ?? y.versionDeleted) ||
	compare(x.versionDeleted ?? x.versionDeprecated, y.versionDeleted ?? y.versionDeprecated);
const byDeletion = (x, y) => compare(x.versionDeleted, y.versionDeleted) || compare(x.versionDeprecated, y.versionDeprecated);
// A section cites only the sources of its rows, in a fixed order.
const ngMarkers = 'les marqueurs `@deprecated` de [packages/ng](https://github.com/LuccaSA/lucca-front/tree/master/packages/ng)';
const sourceOrder = ['LFDeprecatedSelectors.mjs', 'LFDeprecatedProperties.mjs', 'LFDeprecatedScss.mjs', 'ng'];
const sourceLine = (entries) => {
	const used = sourceOrder.filter((s) => entries.some((e) => e.sources.includes(s))).map((s) => (s === 'ng' ? ngMarkers : blob(s)));
	return `${used.length > 1 ? 'Sources' : 'Source'} : ${used.length > 1 ? `${used.slice(0, -1).join(', ')} et ${used.at(-1)}` : used[0]}`;
};
// A section without rows is left out.
const section = (title, entries, nom) =>
	!entries.length ? '' : `## ${title}\n\n${sourceLine(entries)}\n\n${heads}\n${entries.map((e) => row(nom(e), e)).join('\n')}\n`;
const blob = (file) => `[${file}](https://github.com/LuccaSA/lucca-front/blob/master/${dir}${file})`;

const [selectors, properties, scss] = await Promise.all(
	['LFDeprecatedSelectors.mjs', 'LFDeprecatedProperties.mjs', 'LFDeprecatedScss.mjs'].map(load),
);
// A deletion has shipped once its version is at or below the latest stable tag reachable from `HEAD`.
// `execFileSync` skips the shell: `cmd.exe` would pass the quotes of a shell command to git.
const shipped = execFileSync('git', ['describe', '--tags', '--abbrev=0', '--match', 'v[0-9]*', '--exclude', '*-*', 'HEAD'])
	.toString()
	.trim()
	.slice(1);
const deleted = (e) => !!e.versionDeleted && compare(e.versionDeleted, shipped) <= 0;
const named = components([...selectors, ...properties, ...scss]);
// An entry with a `name` deprecates a whole component: it goes to Composants.
const nom = (e) => unlist(nomLines(e));
// Each doc keeps everything before `## Composants`: its title and note.
const write = (path, keep) => {
	// The deleted doc sorts by deletion first.
	const pick = (entries) => entries.filter((e) => deleted(e) === keep).sort(keep ? byDeletion : byVersion);
	const sections = [
		section('Composants', pick(named), componentLines),
		section('Classes', pick(selectors.filter((e) => !e.name)), nom),
		section('Variables CSS', pick(properties.filter((e) => !e.name)), nom),
		section('Mixins', pick(scss.filter((e) => !e.name)), nom),
	];
	const body = sections.filter(Boolean).join('\n');
	writeFileSync(path, `${read(path).split('## Composants')[0].trimEnd()}\n\n${body}`);
};
write('docs/life-cycle.md', false);
write('docs/life-cycle-deleted.md', true);
