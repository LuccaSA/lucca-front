// Gathers the Composants rows: the `.mjs` entries holding a `name`, then the Angular `@deprecated` markers.
import { readdirSync, readFileSync } from 'fs';

const ngDir = 'packages/ng';
const earlier = (a, b) => a.localeCompare(b, undefined, { numeric: true }) < 0;
const slugName = (url) =>
	url
		.split('/')
		.pop()
		.replace(/^[0-9a-f]{6}-/, '')
		.replace(/-/g, ' ')
		.replace(/^./, (c) => c.toUpperCase());

export const components = (entries) => {
	// Entries sharing a name merge into one: their patterns and sources add up, the first defined value wins otherwise.
	const named = new Map();
	for (const e of entries.filter((e) => e.name)) {
		const m = named.get(e.name);
		if (!m) named.set(e.name, { ...e, groups: [...e.groups], sources: [...e.sources] });
		else {
			m.groups.push(...e.groups);
			m.sources = [...new Set([...m.sources, ...e.sources])];
			for (const k of ['versionDeprecated', 'versionDeleted', 'actions', 'prisme', 'schematics']) m[k] ??= e[k];
		}
	}
	// Convention: `@deprecated since X.Y.Z; use Symbol…` plus `@see <Prisme page of the deprecated component>`.
	// A required call may follow the symbol: `use Symbol with \`call()\``.
	// Classes sharing a page share the row, which takes the earliest version.
	const ngFiles = readdirSync(ngDir, { recursive: true }).filter(
		(f) => f.endsWith('.ts') && !/\.spec\.ts$|\.module\.ts$|\/schematics\//.test(`/${f}`),
	);
	for (const f of ngFiles) {
		for (const [, doc] of readFileSync(`${ngDir}/${f}`, 'utf8').matchAll(/\/\*\*([\s\S]*?)\*\//g)) {
			const dep = doc.match(/@deprecated since (\d+\.\d+\.\d+); use (\w+)(?: or (\w+))?(?: with (`[^`]+`))?/);
			const see = doc.match(/@see (https:\/\/prisme\.lucca\.io\/\S+)/);
			if (!dep || !see) continue;
			// The `@see` URL finds the row first: a slug like "Select deprecated" differs from the row name.
			const name = [...named.values()].find((x) => x.prisme === see[1])?.name ?? slugName(see[1]);
			const e = named.get(name) ?? { name, groups: [], sources: [], actions: null, schematics: null };
			named.set(name, e);
			if (!e.sources.includes('ng')) e.sources.push('ng');
			e.prisme ??= see[1];
			e.actions ??= `Remplacer par \`${dep[2]}\`${dep[3] ? ` ou \`${dep[3]}\`` : ''}${dep[4] ? ` avec ${dep[4]}` : ''}.`;
			if (!e.versionDeprecated || earlier(dep[1], e.versionDeprecated)) e.versionDeprecated = dep[1];
		}
	}
	return [...named.values()];
};
