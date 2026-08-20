/**
 * Structural API differ — compares two PackageAPI snapshots (extracted from consecutive
 * git tags) and produces terse, human-readable markdown lines describing the delta.
 *
 * Deterministic, no AI. Feeds the per-component cumulative changelog (changelog-writer.ts).
 * Only the public, template-facing surface is compared (selectors, inputs, outputs, models),
 * which is naturally stable across patch releases → most version pairs produce no delta.
 */

import {
	PackageAPI,
	ExtractedAPI,
	ExtractedInput,
	ExtractedOutput,
	ExtractedModel,
	ExtractedPipe,
	ExtractedProvider,
	ExtractedService,
	ExtractedToken,
} from '../types';

export interface ApiDelta {
	/** Markdown bullet lines describing the change. Empty array = no API change. */
	lines: string[];
}

/** Human note for a deprecation transition (none ↔ deprecated, or message change). */
function deprecationNote(prev?: string, curr?: string): string | null {
	if ((prev ?? '') === (curr ?? '')) return null;
	if (curr) return `devient déprécié${curr === 'Déprécié.' ? '' : ` (${curr})`}`;
	return "n'est plus déprécié";
}

/** Signature used to detect a *change* on an input of the same binding name. */
function inputSignature(i: ExtractedInput): string {
	return [i.type, i.required ? 'req' : 'opt', i.default ?? '', i.transform ?? '', i.deprecated ?? ''].join('|');
}

/** Builds a human note for a changed input (only the parts that actually differ). */
function inputChangeNote(name: string, prev: ExtractedInput, curr: ExtractedInput): string | null {
	const parts: string[] = [];
	if (prev.type !== curr.type) parts.push(`${prev.type} → ${curr.type}`);
	if (prev.required !== curr.required) parts.push(curr.required ? 'devient requis' : 'devient optionnel');
	if ((prev.default ?? '') !== (curr.default ?? '')) parts.push(`défaut ${prev.default ?? '∅'} → ${curr.default ?? '∅'}`);
	if ((prev.transform ?? '') !== (curr.transform ?? '')) parts.push(`transform ${prev.transform ?? '∅'} → ${curr.transform ?? '∅'}`);
	const dep = deprecationNote(prev.deprecated, curr.deprecated);
	if (dep) parts.push(dep);
	if (parts.length === 0) return null;
	return `~ \`${name}\` : ${parts.join(', ')}`;
}

/** Diffs a keyed collection of members; `id` extracts the identity, `sig` the change signature. */
function diffMembers<T>(
	prev: T[],
	curr: T[],
	id: (m: T) => string,
	added: (m: T) => string,
	removed: (m: T) => string,
	changed: (a: T, b: T) => string | null,
): string[] {
	const lines: string[] = [];
	const prevMap = new Map(prev.map((m) => [id(m), m]));
	const currMap = new Map(curr.map((m) => [id(m), m]));

	for (const [key, m] of currMap) {
		if (!prevMap.has(key)) lines.push(added(m));
	}
	for (const [key, m] of prevMap) {
		if (!currMap.has(key)) lines.push(removed(m));
	}
	for (const [key, c] of currMap) {
		const p = prevMap.get(key);
		if (p) {
			const line = changed(p, c);
			if (line) lines.push(line);
		}
	}
	return lines;
}

/** Diffs two versions of the same Angular class (matched by className). */
function diffClass(prev: ExtractedAPI, curr: ExtractedAPI, prefix: string): string[] {
	const lines: string[] = [];

	// Class-level deprecation transition
	const classDep = deprecationNote(prev.deprecated, curr.deprecated);
	if (classDep) lines.push(`${prefix}~ \`${curr.className}\` ${classDep}`);

	// Selectors
	for (const s of curr.selectors.filter((x) => !prev.selectors.includes(x))) lines.push(`${prefix}+ selector \`${s}\``);
	for (const s of prev.selectors.filter((x) => !curr.selectors.includes(x))) lines.push(`${prefix}- selector \`${s}\``);

	// Inputs (identity = bindingName)
	lines.push(
		...diffMembers<ExtractedInput>(
			prev.inputs,
			curr.inputs,
			(i) => i.bindingName,
			(i) => `${prefix}+ \`${i.bindingName}\` : ${i.type}${i.required ? ' (requis)' : ''}`,
			(i) => `${prefix}- \`${i.bindingName}\``,
			(p, c) => (inputSignature(p) !== inputSignature(c) ? prefix + (inputChangeNote(c.bindingName, p, c) ?? '') : null),
		),
	);

	// Outputs (identity = bindingName, change = type or deprecation)
	lines.push(
		...diffMembers<ExtractedOutput>(
			prev.outputs,
			curr.outputs,
			(o) => o.bindingName,
			(o) => `${prefix}+ (output) \`${o.bindingName}\` : ${o.type}`,
			(o) => `${prefix}- (output) \`${o.bindingName}\``,
			(p, c) => {
				const parts: string[] = [];
				if (p.type !== c.type) parts.push(`${p.type} → ${c.type}`);
				const dep = deprecationNote(p.deprecated, c.deprecated);
				if (dep) parts.push(dep);
				return parts.length > 0 ? `${prefix}~ (output) \`${c.bindingName}\` : ${parts.join(', ')}` : null;
			},
		),
	);

	// Models (two-way, identity = bindingName)
	lines.push(
		...diffMembers<ExtractedModel>(
			prev.models,
			curr.models,
			(m) => m.bindingName,
			(m) => `${prefix}+ (model) \`${m.bindingName}\` : ${m.type}`,
			(m) => `${prefix}- (model) \`${m.bindingName}\``,
			(p, c) => {
				const parts: string[] = [];
				if (p.type !== c.type || p.required !== c.required) {
					parts.push(`${p.type}${p.required ? ' requis' : ''} → ${c.type}${c.required ? ' requis' : ''}`);
				}
				const dep = deprecationNote(p.deprecated, c.deprecated);
				if (dep) parts.push(dep);
				return parts.length > 0 ? `${prefix}~ (model) \`${c.bindingName}\` : ${parts.join(', ')}` : null;
			},
		),
	);

	return lines;
}

/** Diffs the package-level symbols (providers, tokens, pipes, services, deprecated modules). */
function diffPackageSymbols(prev: PackageAPI, curr: PackageAPI): string[] {
	const lines: string[] = [];

	lines.push(
		...diffMembers<ExtractedProvider>(
			prev.providers ?? [],
			curr.providers ?? [],
			(p) => p.name,
			(p) => `+ provider \`${p.name}\` : ${p.signature}`,
			(p) => `- provider \`${p.name}\` retiré`,
			(p, c) => {
				const parts: string[] = [];
				if (p.signature !== c.signature) parts.push(`${p.signature} → ${c.signature}`);
				const dep = deprecationNote(p.deprecated, c.deprecated);
				if (dep) parts.push(dep);
				return parts.length > 0 ? `~ provider \`${c.name}\` : ${parts.join(', ')}` : null;
			},
		),
	);

	lines.push(
		...diffMembers<ExtractedToken>(
			prev.tokens ?? [],
			curr.tokens ?? [],
			(t) => t.name,
			(t) => `+ token \`${t.name}\` : ${t.type}`,
			(t) => `- token \`${t.name}\` retiré`,
			(p, c) => {
				const parts: string[] = [];
				if (p.type !== c.type) parts.push(`${p.type} → ${c.type}`);
				const dep = deprecationNote(p.deprecated, c.deprecated);
				if (dep) parts.push(dep);
				return parts.length > 0 ? `~ token \`${c.name}\` : ${parts.join(', ')}` : null;
			},
		),
	);

	lines.push(
		...diffMembers<ExtractedPipe>(
			prev.pipes ?? [],
			curr.pipes ?? [],
			(p) => p.name,
			(p) => `+ pipe \`${p.name}\`${p.transformSignature ? ` : transform${p.transformSignature}` : ''}`,
			(p) => `- pipe \`${p.name}\` retiré`,
			(p, c) => {
				const parts: string[] = [];
				if ((p.transformSignature ?? '') !== (c.transformSignature ?? '')) {
					parts.push(`transform${p.transformSignature ?? '(?)'} → transform${c.transformSignature ?? '(?)'}`);
				}
				const dep = deprecationNote(p.deprecated, c.deprecated);
				if (dep) parts.push(dep);
				return parts.length > 0 ? `~ pipe \`${c.name}\` : ${parts.join(', ')}` : null;
			},
		),
	);

	lines.push(
		...diffMembers<ExtractedService>(
			prev.services ?? [],
			curr.services ?? [],
			(s) => s.className,
			(s) => `+ service \`${s.className}\`${s.methods.length ? ` (${s.methods.length} méthode·s)` : ''}`,
			(s) => `- service \`${s.className}\` retiré`,
			(p, c) => {
				const parts: string[] = [];
				const prevMethods = new Set(p.methods);
				const currMethods = new Set(c.methods);
				const added = c.methods.filter((x) => !prevMethods.has(x));
				const removed = p.methods.filter((x) => !currMethods.has(x));
				for (const x of added) parts.push(`+ \`${x}\``);
				for (const x of removed) parts.push(`- \`${x}\``);
				const dep = deprecationNote(p.deprecated, c.deprecated);
				if (dep) parts.push(dep);
				return parts.length > 0 ? `~ service \`${c.className}\` : ${parts.join(', ')}` : null;
			},
		),
	);

	// Deprecated modules: only transitions INTO deprecation are meaningful (the set only ever
	// contains deprecated modules — a module leaving the set was removed or un-deprecated).
	const prevModules = new Set((prev.deprecatedModules ?? []).map((m) => m.className));
	for (const m of curr.deprecatedModules ?? []) {
		if (!prevModules.has(m.className)) lines.push(`~ module \`${m.className}\` devient déprécié (${m.deprecated})`);
	}

	return lines;
}

/**
 * Diffs two PackageAPI snapshots. `null` means "not present at that version":
 * - prev null, curr present → component introduced
 * - prev present, curr null → component removed
 */
export function diffPackageApi(prev: PackageAPI | null, curr: PackageAPI | null): ApiDelta {
	if (!prev && !curr) return { lines: [] };

	if (!prev && curr) {
		const classes = curr.apis.map((a) => `\`${a.className}\``).join(', ');
		return { lines: [`Composant introduit${classes ? ` (${classes})` : ''}.`] };
	}
	if (prev && !curr) {
		return { lines: ['Composant retiré.'] };
	}

	// Both present — diff class by class (identity = className)
	const lines: string[] = [];
	const multiClass = prev!.apis.length > 1 || curr!.apis.length > 1;
	const prevMap = new Map(prev!.apis.map((a) => [a.className, a]));
	const currMap = new Map(curr!.apis.map((a) => [a.className, a]));

	for (const [name, a] of currMap) {
		if (!prevMap.has(name)) lines.push(`+ ${a.kind} \`${name}\` (${a.selectors.join(', ') || 'sans selector'})`);
	}
	for (const [name, a] of prevMap) {
		if (!currMap.has(name)) lines.push(`- ${a.kind} \`${name}\` retiré`);
	}
	for (const [name, c] of currMap) {
		const p = prevMap.get(name);
		if (!p) continue;
		// When multiClass, group the class's changes under a sub-line for readability.
		const classLines = diffClass(p, c, multiClass ? '  ' : '');
		if (classLines.length > 0) {
			if (multiClass) lines.push(`\`${name}\` :`);
			lines.push(...classLines);
		}
	}

	// Package-level symbols (providers, tokens, pipes, services, deprecated modules)
	lines.push(...diffPackageSymbols(prev!, curr!));

	return { lines };
}
