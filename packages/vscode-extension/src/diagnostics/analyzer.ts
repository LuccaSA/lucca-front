/**
 * Pure diagnostics: given document text, its language, and the manifest index,
 * returns findings as plain offsets. No 'vscode' import.
 */

import { findClassAttributeValues } from '../context/class-context';
import { findImportedNamespaces, findMixinIncludes, findUseImports, isNamespaceReferenced } from '../context/scss-mixin-context';
import { findInlineTemplateRegions } from '../context/inline-template';
import { ManifestIndex } from '../manifest/index-model';
import { CSS_LANGUAGES, UTILITY_PREFIX } from '../constants';

export type FindingKind = 'deprecated-property' | 'deprecated-class' | 'unknown-class' | 'missing-mixin-import' | 'unused-mixin-import';

/** A commons/utils import path, e.g. `@lucca-front/scss/src/commons/utils/media`. */
const UTIL_IMPORT_RE = /(?:^|\/)commons\/utils\/([\w-]+)$/;

export interface Finding {
	startOffset: number;
	endOffset: number;
	kind: FindingKind;
	name: string;
	replacement?: string;
	note?: string;
}

// Public custom-property prefixes (mirrors the manifest categories). Unknown
// `--…` names are never flagged (local/theming vars are legitimate).
const PROPERTY_RE = /--(?:pr-t|palettes|commons|breakpoints|sizes|colors)-[\w-]+/g;

export interface AnalyzeFlags {
	/** When false, no deprecation findings are produced (experimental toggle off). */
	deprecations: boolean;
}

export function analyze(text: string, languageId: string, index: ManifestIndex, flags: AnalyzeFlags): Finding[] {
	if (CSS_LANGUAGES.includes(languageId)) {
		const findings = analyzeCss(text, index, flags);
		if (languageId === 'scss') {
			findings.push(...analyzeMixinImports(text, index));
			findings.push(...analyzeUnusedImports(text, index));
		}
		return findings;
	}
	if (languageId === 'html') {
		return analyzeClassSpans(text, findClassAttributeValues(text), index, flags);
	}
	if (languageId === 'typescript') {
		const findings: Finding[] = [];
		for (const region of findInlineTemplateRegions(text)) {
			const slice = text.slice(region.start, region.end);
			const spans = findClassAttributeValues(slice).map((s) => ({ start: s.start + region.start, end: s.end + region.start }));
			findings.push(...analyzeClassSpans(text, spans, index, flags));
		}
		return findings;
	}
	return [];
}

/**
 * Flags `@include namespace.mixin` references to known Lucca mixins whose
 * namespace isn't `@use`d in the file (a Sass compile error). Independent of the
 * deprecation toggle — a genuinely actionable, always-on finding.
 */
function analyzeMixinImports(text: string, index: ManifestIndex): Finding[] {
	if (index.mixins.length === 0) {
		return [];
	}
	const imported = findImportedNamespaces(text);
	const findings: Finding[] = [];
	for (const ref of findMixinIncludes(text)) {
		const key = `${ref.namespace}.${ref.name}`;
		if (index.mixinLookup.has(key) && !imported.has(ref.namespace)) {
			findings.push({ startOffset: ref.start, endOffset: ref.end, kind: 'missing-mixin-import', name: key });
		}
	}
	return findings;
}

/**
 * Flags `@use` of a Lucca `commons/utils` module whose namespace is never
 * referenced in the file, so it can be safely removed. Scoped to these modules
 * on purpose: they only define mixins/functions/variables (no CSS side effects
 * on import), so "no `namespace.` reference" reliably means "dead import".
 *
 * Deliberately conservative: `@use … as *` (wildcard, members used unqualified)
 * and aliased imports of unknown namespaces are never flagged, and `@forward`
 * is ignored entirely — it re-exports to other files, so local use can't be
 * determined here.
 */
function analyzeUnusedImports(text: string, index: ManifestIndex): Finding[] {
	if (index.mixins.length === 0) {
		return [];
	}
	const findings: Finding[] = [];
	for (const use of findUseImports(text)) {
		const utilMatch = UTIL_IMPORT_RE.exec(use.path.replace(/\.scss$/, ''));
		// Only known, side-effect-free util modules imported under their default namespace.
		if (!utilMatch || !use.namespace || use.namespace !== utilMatch[1] || !index.mixinNamespaces.has(use.namespace)) {
			continue;
		}
		if (!isNamespaceReferenced(text, use.namespace, use.start, use.end)) {
			findings.push({ startOffset: use.start, endOffset: use.end, kind: 'unused-mixin-import', name: use.namespace });
		}
	}
	return findings;
}

function analyzeCss(text: string, index: ManifestIndex, flags: AnalyzeFlags): Finding[] {
	if (!flags.deprecations) {
		return []; // custom-property deprecation is the only CSS finding
	}
	const findings: Finding[] = [];
	PROPERTY_RE.lastIndex = 0;
	let match: RegExpExecArray | null;
	while ((match = PROPERTY_RE.exec(text)) !== null) {
		const name = match[0];
		const prop = index.properties.get(name);
		if (prop?.deprecated) {
			findings.push({ startOffset: match.index, endOffset: match.index + name.length, kind: 'deprecated-property', name, note: prop.note });
		}
	}
	return findings;
}

/**
 * Tokenises the given class-attribute value spans and reports deprecated known
 * classes and unknown `pr-u-*` classes. The structural guard (only tokenising
 * attribute values, only flagging `pr-u-` prefixed unknowns) prevents false
 * positives on prose, comments, or other class systems.
 */
function analyzeClassSpans(text: string, spans: Array<{ start: number; end: number }>, index: ManifestIndex, flags: AnalyzeFlags): Finding[] {
	const findings: Finding[] = [];
	for (const span of spans) {
		const value = text.slice(span.start, span.end);
		// Trailing `%` is part of the class name (e.g. `pr-u-width100%`).
		const tokenRe = /[\w-]+%?/g;
		let match: RegExpExecArray | null;
		while ((match = tokenRe.exec(value)) !== null) {
			const name = match[0];
			const start = span.start + match.index;
			const end = start + name.length;
			const utility = index.utilities.get(name);
			if (utility) {
				if (flags.deprecations && utility.deprecated) {
					findings.push({ startOffset: start, endOffset: end, kind: 'deprecated-class', name, replacement: utility.replacement, note: utility.note });
				}
			} else if (name.startsWith(UTILITY_PREFIX)) {
				findings.push({ startOffset: start, endOffset: end, kind: 'unknown-class', name });
			}
		}
	}
	return findings;
}
