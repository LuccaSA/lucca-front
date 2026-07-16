/**
 * Structural API differ — compares two PackageAPI snapshots (extracted from consecutive
 * git tags) and produces terse, human-readable markdown lines describing the delta.
 *
 * Deterministic, no AI. Feeds the per-component cumulative changelog (changelog-writer.ts).
 * Only the public, template-facing surface is compared (selectors, inputs, outputs, models),
 * which is naturally stable across patch releases → most version pairs produce no delta.
 */

import { PackageAPI, ExtractedAPI, ExtractedInput, ExtractedOutput, ExtractedModel } from '../types';

export interface ApiDelta {
	/** Markdown bullet lines describing the change. Empty array = no API change. */
	lines: string[];
}

/** Signature used to detect a *change* on an input of the same binding name. */
function inputSignature(i: ExtractedInput): string {
	return [i.type, i.required ? 'req' : 'opt', i.default ?? '', i.transform ?? ''].join('|');
}

/** Builds a human note for a changed input (only the parts that actually differ). */
function inputChangeNote(name: string, prev: ExtractedInput, curr: ExtractedInput): string | null {
	const parts: string[] = [];
	if (prev.type !== curr.type) parts.push(`${prev.type} → ${curr.type}`);
	if (prev.required !== curr.required) parts.push(curr.required ? 'devient requis' : 'devient optionnel');
	if ((prev.default ?? '') !== (curr.default ?? '')) parts.push(`défaut ${prev.default ?? '∅'} → ${curr.default ?? '∅'}`);
	if ((prev.transform ?? '') !== (curr.transform ?? '')) parts.push(`transform ${prev.transform ?? '∅'} → ${curr.transform ?? '∅'}`);
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

	// Outputs (identity = bindingName, change = type)
	lines.push(
		...diffMembers<ExtractedOutput>(
			prev.outputs,
			curr.outputs,
			(o) => o.bindingName,
			(o) => `${prefix}+ (output) \`${o.bindingName}\` : ${o.type}`,
			(o) => `${prefix}- (output) \`${o.bindingName}\``,
			(p, c) => (p.type !== c.type ? `${prefix}~ (output) \`${c.bindingName}\` : ${p.type} → ${c.type}` : null),
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
			(p, c) =>
				p.type !== c.type || p.required !== c.required
					? `${prefix}~ (model) \`${c.bindingName}\` : ${p.type}${p.required ? ' requis' : ''} → ${c.type}${c.required ? ' requis' : ''}`
					: null,
		),
	);

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

	return { lines };
}
