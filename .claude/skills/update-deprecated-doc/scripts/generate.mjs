// Regenerates the Classes and Variables CSS sections of docs/life-cycle.md
// from LFDeprecatedSelectors.mjs and LFDeprecatedProperties.mjs.
// Everything before `## Classes` (title, note, style, Composants) is kept as is.
// Usage, from the repository root: node .claude/skills/update-deprecated-doc/scripts/generate.mjs
import { readFileSync, writeFileSync } from 'fs';
import overrides from './nom-overrides.mjs';

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
			const entry = { comments: [], groups: [{ label: null, sources: [] }], actions: null, schematics: null };
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
					else entry.comments.push(c);
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

const esc = (t) => t.replace(/&/g, '&amp;');
const inline = (t) =>
	esc(t.replace(/\\`/g, '`'))
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
		.replace(/`([^`]+)`/g, '<code>$1</code>')
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

const actionsHtml = (e) => {
	const schem = e.schematics ? `(<a href="${e.schematics}">schematics</a>)` : '';
	if (!e.actions) return schem || '–';
	const blocks = e.actions
		.replace(/\\`/g, '`')
		.split(/\n\s*\n/)
		.map((b) => b.trim())
		.filter(Boolean);
	const parts = blocks.map((b) => {
		if (b.startsWith('* ')) {
			const items = [];
			for (const l of b.split('\n')) {
				if (/^ {2}\S/.test(l)) items[items.length - 1].text += '\u0000' + l.trim();
				else if (/^\t\* /.test(l)) items[items.length - 1].children.push(l.replace(/^\t\*\s+/, ''));
				else items.push({ text: l.replace(/^\*\s+/, ''), children: [] });
			}
			const lis = items.map((it) =>
				it.children.length
					? `\t<li>\n\t\t${inline(it.text).replace(/\u0000/g, '<br>')}\n\t\t<ul>\n${it.children.map((ch) => `\t\t\t<li>${inline(ch)}</li>`).join('\n')}\n\t\t</ul>\n\t</li>`
					: `\t<li>${inline(it.text).replace(/\u0000/g, '<br>')}</li>`,
			);
			return `<ul>\n${lis.join('\n')}\n</ul>`;
		}
		if (/^(`\*` = |\(`\*`: )/.test(b)) return `<p><small>${inline(b)}</small></p>`;
		if (b.includes('\n')) return `<p>${b.split('\n').map(inline).join('<br>')}</p>`;
		return blocks.length === 1 && !schem ? inline(b) : `<p>${inline(b)}</p>`;
	});
	if (blocks.length === 1 && !blocks[0].startsWith('* ') && !schem) return parts[0];
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
const FR = new Map([
	[
		'Legacy grid columns and offsets, always suffixed with a breakpoint (`.grid-6\\@mediaMinS`)',
		'Colonnes et offsets de l’ancienne grille, toujours suffixés d’un breakpoint (`.grid-6\\@mediaMinS`)',
	],
	[
		'Legacy grid mods: any combination of .grid and an alignment or reverse mod, with any non-whitespace character between',
		'Mods de l’ancienne grille, combinés à `.grid`',
	],
	['Legacy grid ordering utilities', 'Utilitaires d’ordre de l’ancienne grille'],
	[
		'Any combination of .box, .card or .section and .mod-grey, with any non-whitespace character between',
		'Toute combinaison de `.box`, `.card` ou `.section` avec `.mod-grey`',
	],
	[
		'Zero border utilities: `.u-` names deleted with the t-shirt utilities, `.pr-u-` names still shipping',
		'Utilitaires de bordure à zéro : noms `.u-` supprimés avec les utilitaires t-shirt, noms `.pr-u-` toujours livrés',
	],
	['Font sizes and line heights', 'Tailles de police et hauteurs de ligne'],
	['Vertical paddings, only read with `$deprecatedSpacings: true`', 'Paddings verticaux, lus uniquement avec `$deprecatedSpacings: true`'],
]);
const nomHtml = (e) => {
	const key = e.groups.flatMap((g) => g.sources)[0];
	if (overrides[key]) return overrides[key];
	const parts = [];
	for (const g of e.groups) {
		const items = [];
		for (const src of g.sources) {
			const it = nomItems(src);
			if (!it) throw new Error(`Nom override needed for /${key}/ in nom-overrides.mjs`);
			items.push(...it);
		}
		if (g.label) parts.push(`<p>${inline(FR.get(g.label) ?? g.label)}</p>`);
		if (items.length) parts.push(`<ul>\n${items.map((i) => '\t' + i).join('\n')}\n</ul>`);
	}
	return parts.join('\n');
};

const indent = (html, tabs) =>
	html
		.split('\n')
		.map((l) => '\t'.repeat(tabs) + l)
		.join('\n');
const cell = (html) =>
	html.includes('\n') || html.startsWith('<') ? `\t\t\t<td>\n${indent(html, 4)}\n\t\t\t</td>` : `\t\t\t<td>${html}</td>`;
const row = (e) =>
	[
		'\t\t<tr>',
		cell(nomHtml(e)),
		`\t\t\t<td>${e.versionDeprecated ?? '–'}</td>`,
		`\t\t\t<td>${e.versionDeleted ?? '–'}</td>`,
		cell(actionsHtml(e)),
		'\t\t</tr>',
	].join('\n');

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
const section = (title, file) =>
	`## ${title}\n\nSource\u00a0: [${file}](https://github.com/LuccaSA/lucca-front/blob/master/packages/stylelint-config/${file})\n\n${thead}\n${parse(file).map(row).join('\n')}\n\t</tbody>\n</table>\n`;

const head = readFileSync(docPath, 'utf8').split('## Classes')[0].trimEnd();
writeFileSync(
	docPath,
	`${head}\n\n${section('Classes', 'LFDeprecatedSelectors.mjs')}\n${section('Variables CSS', 'LFDeprecatedProperties.mjs')}`,
);
