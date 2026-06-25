import type { TmplAstElement } from '@angular/compiler';
import { SourceFile } from 'typescript';

// --- Grid container ---

export interface GridInputs {
	mode?: string;
	columns?: string;
	extraClasses?: string;
}

export interface HtmlGrid {
	node: TmplAstElement;
	inputs: GridInputs;
	nodeOffset: number;
	filePath: string;
	componentTS: SourceFile;
}

// --- Grid column ---

interface GridColumnInputs {
	colspan?: string;
	rowspan?: string;
	column?: string;
	row?: string;
	justify?: string;
	align?: string;
	responsive?: Record<string, string>;
}

export interface HtmlGridColumn {
	node: TmplAstElement;
	inputs: GridColumnInputs;
	remainingStyle?: string;
	extraClasses?: string;
	nodeOffset: number;
	filePath: string;
	componentTS: SourceFile;
}

// --- CSS custom properties helpers ---

export function parseCssCustomProperties(style: string): Record<string, string> {
	const result: Record<string, string> = {};
	style.split(';').map((p) => p.trim()).filter(Boolean).forEach((part) => {
		const colonIdx = part.indexOf(':');
		if (colonIdx === -1) {
			return;
		}
		const prop = part.substring(0, colonIdx).trim();
		const value = part.substring(colonIdx + 1).trim();
		result[prop] = value;
	});
	return result;
}

// CSS custom properties that map directly to GridColumnComponent inputs
const GRID_COLUMN_DIRECT_PROPS: Record<string, string> = {
	'--grid-colspan': 'colspan',
	'--grid-rowspan': 'rowspan',
	'--grid-column': 'column',
	'--grid-row': 'row',
	'--grid-justify': 'justify',
	'--grid-align': 'align',
};

// Prefix for responsive CSS custom properties
const RESPONSIVE_PREFIX = '--grid-';

export function extractGridColumnInputs(style: string): { inputs: GridColumnInputs; remainingStyle: string } {
	const cssProps = parseCssCustomProperties(style);
	const inputs: GridColumnInputs = {};
	const responsive: Record<string, string> = {};
	const remaining: string[] = [];

	for (const [prop, value] of Object.entries(cssProps)) {
		if (GRID_COLUMN_DIRECT_PROPS[prop]) {
			(inputs as Record<string, string>)[GRID_COLUMN_DIRECT_PROPS[prop]] = value;
		} else if (prop.startsWith(RESPONSIVE_PREFIX) && prop.includes('AtMedia')) {
			// e.g. --grid-colspanAtMediaMinXS → colspanAtMediaMinXS
			const key = prop.substring(RESPONSIVE_PREFIX.length);
			responsive[key] = value;
		} else if (prop.startsWith('--grid-')) {
			// Unknown grid property — drop it (it was grid-specific)
		} else {
			remaining.push(`${prop}: ${value}`);
		}
	}

	if (Object.keys(responsive).length > 0) {
		inputs.responsive = responsive;
	}

	return { inputs, remainingStyle: remaining.join('; ') };
}

const NEUTRAL_HTML_ELEMENTS = ['div', 'span', 'section'] as const;
type NeutralHtmlElement = (typeof NEUTRAL_HTML_ELEMENTS)[number];

export function isNeutralElement(name: string): name is NeutralHtmlElement {
	return (NEUTRAL_HTML_ELEMENTS as readonly string[]).includes(name);
}

