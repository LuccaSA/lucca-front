// Turns `objectPattern` regex sources into the Markdown items of a Nom cell.
// Enumerable parts expand into items, the largest groups stay factored, the rest becomes `…`: SKILL.md gives the rules.

import { RegExpParser } from '@eslint-community/regexpp';

const OPEN = { open: true };
const DIGITS = { fixed: '(1|2|3|4|…)' };

// Converts a regex into a sequence of nodes:
// `{ lit }` for text, `{ alt: [sequence, …] }` for choices, OPEN or DIGITS for what can't be listed.
const parseRegex = (src) => {
	const seq = (alternative) => alternative.elements.map(convert).filter(Boolean);
	const convert = (el) => {
		switch (el.type) {
			case 'Character':
				return { lit: String.fromCodePoint(el.value) };
			case 'CharacterSet':
				return el.negate ? OPEN : el.kind === 'digit' ? DIGITS : el.kind === 'space' ? { lit: ' ' } : OPEN;
			case 'CharacterClass': {
				const ranges = el.elements.map((c) => (c.type === 'Character' ? [c.value, c.value] : [c.min?.value, c.max?.value]));
				const codes =
					el.negate || ranges.some(([min]) => min === undefined)
						? []
						: ranges.flatMap(([min, max]) => Array.from({ length: max - min + 1 }, (_, k) => min + k));
				return codes.length && codes.length <= 10 ? { alt: codes.map((c) => [{ lit: String.fromCodePoint(c) }]) } : OPEN;
			}
			case 'Group':
			case 'CapturingGroup':
				return { alt: el.alternatives.map(seq) };
			case 'Quantifier':
				return quantify(el);
			default:
				// Assertions only guard the token boundaries.
				return null;
		}
	};
	const quantify = ({ element, min, max, end }) => {
		const node = convert(element);
		if (!node || node === DIGITS) return node;
		if (max === Infinity || node === OPEN) return OPEN;
		if (min === 0 && max === 1) {
			if (onlyOpen(node)) return null;
			if (hasOpen(node) && /^(\\s|\(\?!|$)/.test(src.slice(end))) return OPEN;
		}
		return { alt: Array.from({ length: max - min + 1 }, (_, k) => Array(min + k).fill(node)) };
	};
	const { alternatives } = new RegExpParser().parsePattern(src);
	const nodes = alternatives.length > 1 ? [{ alt: alternatives.map(seq) }] : seq(alternatives[0]);
	// A pattern without an end guard matches any suffix.
	const guarded = /(\(\?!\[\\w-\]\)|\\b|\$)$/.test(src);
	if (!guarded && nodes.at(-1) !== OPEN) nodes.push(OPEN);
	return nodes;
};
const hasOpen = (node) => node === OPEN || (node.alt ?? []).some((opt) => opt.some(hasOpen));
const onlyOpen = (node) => node === OPEN || (!!node.alt && node.alt.every((opt) => opt.every((n) => n.lit === ' ' || onlyOpen(n))));

const crop = (values) => {
	const list = values.slice(0, 2).every((v) => v.length > 8)
		? [...values].sort((a, b) => a.length - b.length || a.localeCompare(b))
		: values;
	const limit = list.slice(0, 4).some((v) => v.length > 6) ? 2 : 4;
	return `(${list.length > limit ? [...list.slice(0, limit), '…'].join('|') : list.join('|')})`;
};

// Renders a sequence into its items: factored choices stay grouped, the others expand.
const render = (seq, factored = new Set()) =>
	seq.reduce(
		(items, node) => {
			const parts =
				node.lit !== undefined
					? [node.lit]
					: node === OPEN
						? ['…']
						: node.fixed
							? [node.fixed]
							: factored.has(node)
								? [crop([...new Set(node.alt.flatMap((opt) => render(opt)))])]
								: [...new Set(node.alt.flatMap((opt) => render(opt, factored)))];
			return items.flatMap((a) => parts.map((b) => a + b));
		},
		[''],
	);
// Unknown parts in a row read as one: `.menu… .label`, not `.menu… ….label`.
const tidy = (item) => item.replace(/…(\s*)…/g, '…$1');

// Every choice with the node before it, the part it varies.
const contexts = (seq, before = null) =>
	seq.flatMap((node, k) => {
		const prev = k ? seq[k - 1] : before;
		return node.alt ? [{ node, prev }, ...node.alt.flatMap((opt) => contexts(opt, prev))] : [];
	});
// The varying middle of some items, between their shared prefix and suffix.
const middle = (items) => {
	if (items.length < 2) return { prefix: '', suffix: '', values: items };
	let p = 0;
	while (items.every((it) => it[p] !== undefined && it[p] === items[0][p])) p++;
	let s = 0;
	while (items.every((it) => it.length - s > p && it.at(-1 - s) === items[0].at(-1 - s))) s++;
	return { prefix: items[0].slice(0, p), suffix: s ? items[0].slice(-s) : '', values: items.map((it) => it.slice(p, it.length - s)) };
};

const leaf = (node) => node.alt.every((opt) => opt.every((n) => n.lit !== undefined));
// A branch choice holds words around choices: `(stickyColumn-(s|m)|layoutFixed-(s|m))`.
const branch = (node) => node.alt.some((opt) => opt.some((n) => n.alt) && opt.filter((n) => n.lit !== undefined).length > 1);
const variant = ({ node, prev }) => {
	const values = node.alt.flatMap((opt) => render(opt));
	const suffix = (!!prev?.alt || prev === DIGITS || /[A-Za-z0-9]$/.test(prev?.lit ?? '')) && !values.some((v) => /^[-_]/.test(v));
	return suffix || values.every((v) => v.length <= 8);
};
const patternItems = (src, max = 10) => {
	const seq = parseRegex(src);
	const candidates = contexts(seq).filter(
		({ node }) =>
			node.alt.length > 1 &&
			node.alt.every((opt) => opt.length && !opt.some((n) => n === DIGITS || hasOpen(n))) &&
			!branch(node) &&
			node.alt.flatMap((opt) => contexts(opt)).every(({ node }) => leaf(node)),
	);
	const factored = new Set(candidates.filter(variant).map(({ node }) => node));
	let items = render(seq, factored);
	while (items.length > max) {
		let best = null;
		for (const { node } of candidates.filter(({ node }) => !factored.has(node))) {
			const count = render(seq, new Set([...factored, node])).length;
			if (!best || count <= best.count) best = { node, count };
		}
		if (!best || best.count >= items.length) break;
		factored.add(best.node);
		items = render(seq, factored);
	}
	return items.map(tidy);
};

export const comboRe = /^\(\?=\\S\*(.+?)\)\(\?=\\S\*(.+?)\)\\S\*$/;
const code = (t) => `\`${t}\``;
const byText = (a, b) => (a.replace(/`/g, '') < b.replace(/`/g, '') ? -1 : 1);

// The items of some patterns: a token, or two joined by a bold plus sign.
const itemsOf = (sources, max) =>
	sources.flatMap((src) => {
		const cm = src.match(comboRe);
		if (!cm) return patternItems(src, max).map((t) => ({ t, md: code(t) }));
		const [a, b] = [patternItems(cm[1], max), patternItems(cm[2], max)];
		return a.flatMap((x) => b.map((y) => ({ md: `${code(x)} **+** ${code(y)}` })));
	});

export const nomItems = (sources) => {
	let items = itemsOf(sources, 10);
	if (items.length > 10) items = itemsOf(sources, 1);
	const tokens = [...new Set(items.filter((i) => i.t).map((i) => i.t))];
	const { prefix, suffix, values } = middle(tokens);
	if (items.length > 10 && tokens.length === items.length && prefix) return [code(`${prefix}${crop(values)}${suffix}`)];
	return [...new Set(items.map((i) => i.md))].sort(byText);
};

// The shortest form of a pattern, which stands for it in Composants.
export const rootToken = (src) => patternItems(src).reduce((a, b) => (b.length < a.length ? b : a));
