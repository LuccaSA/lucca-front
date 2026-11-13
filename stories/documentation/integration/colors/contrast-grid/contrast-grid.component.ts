import { afterNextRender, ChangeDetectionStrategy, Component, computed, ElementRef, input, signal, viewChild } from '@angular/core';

export type Grid = 'neutralOnGroup' | 'groupOnGroup' | 'neutralOnNeutral';
export type Group = 'products' | 'decoratives' | 'semantics';
type State = 'pass' | 'contrastedOnly' | 'fail';

const SHADES = ['900', '800', '700', '600', '500', '400', '300', '200', '100', '50'];
const NEUTRALS = ['900', '800', '700', '600', '500', '400', '300', '200', '100', '50', '25', '0'].map((n) => `N${n}`);

const GROUPS: Record<Group, { label: string; palettes: string[] }> = {
	products: { label: 'Product', palettes: ['brand', 'cleemy', 'timmi', 'poplee', 'coreHR', 'pagga', 'cc'] },
	decoratives: {
		label: 'Decorative',
		palettes: ['kiwi', 'lime', 'cucumber', 'mint', 'glacier', 'lagoon', 'blueberry', 'lavender', 'grape', 'dragonfruit', 'raspberry', 'watermelon', 'coral', 'cacao', 'pumpkin', 'pineapple'],
	},
	semantics: { label: 'Semantic', palettes: ['success', 'warning', 'critical'] },
};

// Guaranteed pairs (foreground|background, symmetric), 4.5:1 unless listed in NON_TEXT
const pairs = (list: [string, string[]][]) => list.flatMap(([a, bs]) => bs.flatMap((b) => [`${a}|${b}`, `${b}|${a}`]));
const NEUTRAL_ON_GROUP = new Set(
	pairs([
		['N900', ['500', '400', '300', '200', '100', '50']],
		['N800', ['400', '300', '200', '100', '50']],
		['N700', ['200', '100', '50']],
		['N600', ['50']],
		['N400', ['900']],
		['N300', ['900', '800']],
		['N200', ['900', '800']],
		['N100', ['900', '800']],
		['N50', ['900', '800']],
		['N25', ['900', '800', '700']],
		['N0', ['900', '800', '700']],
	]),
);
const GROUP_ON_GROUP = new Set(
	pairs([
		['900', ['400', '300', '200', '100', '50']],
		['800', ['300', '200', '100', '50']],
		['700', ['50']],
	]),
);
const NEUTRAL_ON_NEUTRAL = new Set(
	pairs([
		['N900', ['N500', 'N400', 'N300', 'N200', 'N100', 'N50', 'N25', 'N0']],
		['N800', ['N400', 'N300', 'N200', 'N100', 'N50', 'N25', 'N0']],
		['N700', ['N200', 'N100', 'N50', 'N25', 'N0']],
		['N600', ['N50', 'N25', 'N0']],
	]),
);
// Non-text elements (icons, borders): 3:1
const NON_TEXT = new Set(pairs([['N0', ['600']]]));

const luminance = (hex: string) => {
	const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: string, b: string) => {
	const [x, y] = [luminance(a), luminance(b)].sort((u, v) => v - u);
	return (x + 0.05) / (y + 0.05);
};
const isHex = (value: string) => /^#[0-9a-f]{6}$/i.test(value);

interface Cell {
	key: string;
	threshold: number;
	state: State;
	contrastedOnly: string[];
}

@Component({
	selector: 'contrast-grid-story',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div #normal hidden></div>
		<div #contrast class="pr-u-prefersContrastMore" hidden></div>
		<table class="contrastGrid">
			<caption class="pr-u-mask">
				{{
					caption()
				}}
			</caption>
			<colgroup>
				<col class="contrastGrid-axisColumn" />
				<col class="contrastGrid-headColumn" />
				@for (column of columns(); track column) {
					<col class="contrastGrid-column" />
				}
			</colgroup>
			<thead>
				<tr>
					<td class="contrastGrid-corner" colspan="2"></td>
					<td class="contrastGrid-axis" [attr.colspan]="columns().length">
						<span class="contrastGrid-label" aria-hidden="true">Background</span>
					</td>
				</tr>
				<tr>
					<td class="contrastGrid-corner" colspan="2"></td>
					@for (column of columns(); track column) {
						<th scope="col">{{ label(column) }}</th>
					}
				</tr>
			</thead>
			<tbody>
				@for (row of rows(); track row; let i = $index) {
					<tr>
						@if (i === 0) {
							<td class="contrastGrid-axis" [attr.rowspan]="rows().length">
								<span class="contrastGrid-label mod-vertical" aria-hidden="true">Foreground</span>
							</td>
						}
						<th scope="row">{{ label(row) }}</th>
						@for (cell of cells()[i]; track cell.key) {
							<td
								[class.is-required]="cell.threshold"
								[class.is-nonText]="cell.threshold === 3"
								[class.is-contrastedOnly]="cell.state === 'contrastedOnly'"
								[class.is-failing]="cell.threshold && cell.state === 'fail'"
							>
								@if (cell.threshold) {
									<span aria-hidden="true">{{ cell.state === 'fail' ? '✗' : '✓' }}</span>
									<span class="pr-u-mask">
										{{ cell.state === 'fail' ? 'Insufficient' : 'Sufficient' }} contrast ({{ cell.threshold === 3 ? '3:1' : '4.5:1' }}){{
											cell.state === 'contrastedOnly' ? ', in enhanced-contrast mode for ' + cell.contrastedOnly.join(', ') : ''
										}}
									</span>
								}
							</td>
						}
					</tr>
				}
			</tbody>
		</table>
		@if (contrastedOnly().length) {
			<p class="contrastGrid-legend">Hatched: only in enhanced-contrast mode for {{ contrastedOnly().join(', ') }}.</p>
		}
		@if (grid() === 'neutralOnGroup') {
			<p class="contrastGrid-legend">Dashed: 3:1 contrast, for icons and borders only.</p>
		}
	`,
	styles: `
		.contrastGrid {
			border-collapse: collapse;
			font: var(--pr-t-font-body-S);

			th {
				font-weight: var(--pr-t-font-fontWeight-regular);
				padding: var(--pr-t-spacings-50) var(--pr-t-spacings-100);
				white-space: nowrap;
			}

			td {
				block-size: 2.5rem;
				border: 1px solid var(--palettes-neutral-100);
				text-align: center;

				&.is-required {
					background-color: var(--palettes-success-50);
					color: var(--palettes-success-700);
				}

				&.is-nonText {
					background-color: var(--palettes-neutral-50);
					color: var(--palettes-neutral-800);
					outline: 2px dashed var(--palettes-neutral-600);
					outline-offset: -4px;
				}

				&.is-contrastedOnly {
					background-image: repeating-linear-gradient(-45deg, transparent 0 4px, var(--palettes-success-100) 4px 8px);
				}

				&.is-failing {
					background-color: var(--palettes-critical-50);
					color: var(--palettes-critical-800);
				}
			}
		}

		.contrastGrid-axisColumn {
			inline-size: 2rem;
		}

		.contrastGrid-headColumn {
			inline-size: 3rem;
		}

		.contrastGrid-column {
			inline-size: 4rem;
		}

		.contrastGrid .contrastGrid-corner,
		.contrastGrid .contrastGrid-axis {
			block-size: auto;
			border: 0;
		}

		.contrastGrid .contrastGrid-axis {
			padding: var(--pr-t-spacings-50);
			text-align: start;
			vertical-align: top;
		}

		.contrastGrid-label {
			background-color: var(--palettes-neutral-100);
			border-radius: var(--pr-t-border-radius-full);
			color: var(--pr-t-color-text);
			display: inline-block;
			font: var(--pr-t-font-body-XS);
			font-weight: var(--pr-t-font-fontWeight-semibold);
			padding-block: var(--pr-t-spacings-25);
			padding-inline: var(--pr-t-spacings-100);
			white-space: nowrap;

			&.mod-vertical {
				/* Read from bottom to top, like a vertical axis */
				transform: rotate(180deg);
				writing-mode: vertical-rl;
			}
		}

		.contrastGrid-legend {
			color: var(--pr-t-color-text-subtle);
			font: var(--pr-t-font-body-S);
			margin-block-start: var(--pr-t-spacings-100);
		}
	`,
})
export class ContrastGridComponent {
	/** Grid to display */
	readonly grid = input<Grid>('neutralOnGroup');

	/** Group of palettes summarized in the grid */
	readonly group = input<Group>('products');

	// Probes always rendered, so the colors of both modes can be read at any time
	readonly normal = viewChild<ElementRef<HTMLElement>>('normal');
	readonly contrast = viewChild<ElementRef<HTMLElement>>('contrast');
	readonly #rendered = signal(false);

	constructor() {
		afterNextRender(() => this.#rendered.set(true));
	}

	readonly rows = computed(() => (this.grid() === 'groupOnGroup' ? SHADES : NEUTRALS));
	readonly columns = computed(() => (this.grid() === 'neutralOnNeutral' ? NEUTRALS : SHADES));
	readonly caption = computed(() =>
		this.grid() === 'neutralOnNeutral'
			? 'Contrast grid: neutral on neutral'
			: `Contrast grid: ${this.grid() === 'neutralOnGroup' ? 'neutral' : GROUPS[this.group()].label.toLowerCase()} on ${GROUPS[this.group()].label.toLowerCase()} palettes`,
	);

	readonly cells = computed<Cell[][]>(() => {
		const normal = this.normal()?.nativeElement;
		const contrast = this.contrast()?.nativeElement;
		if (!this.#rendered() || !normal || !contrast) {
			return [];
		}
		const styles = { normal: getComputedStyle(normal), contrast: getComputedStyle(contrast) };
		const palettes = this.grid() === 'neutralOnNeutral' ? ['neutral'] : GROUPS[this.group()].palettes;
		const shape = this.grid() === 'neutralOnGroup' ? NEUTRAL_ON_GROUP : this.grid() === 'groupOnGroup' ? GROUP_ON_GROUP : NEUTRAL_ON_NEUTRAL;
		const color = (style: CSSStyleDeclaration, palette: string, key: string) =>
			style.getPropertyValue(key.startsWith('N') ? `--palettes-neutral-${key.slice(1)}` : `--palettes-${palette}-${key}`).trim();
		const passes = (style: CSSStyleDeclaration, palette: string, row: string, column: string, threshold: number) => {
			const foreground = color(style, palette, row);
			const background = color(style, palette, column);
			return isHex(foreground) && isHex(background) && ratio(foreground, background) >= threshold;
		};
		return this.rows().map((row) =>
			this.columns().map((column) => {
				const key = `${row}|${column}`;
				const threshold = shape.has(key) ? 4.5 : NON_TEXT.has(key) && this.grid() === 'neutralOnGroup' ? 3 : 0;
				if (!threshold) {
					return { key, threshold, state: 'pass', contrastedOnly: [] };
				}
				const failing = palettes.filter((palette) => !passes(styles.normal, palette, row, column, threshold));
				const contrastedOnly = failing.filter((palette) => passes(styles.contrast, palette, row, column, threshold));
				const state: State = !failing.length ? 'pass' : contrastedOnly.length === failing.length ? 'contrastedOnly' : 'fail';
				return { key, threshold, state, contrastedOnly };
			}),
		);
	});

	readonly contrastedOnly = computed(() => {
		const names = new Set(this.cells().flatMap((row) => row.flatMap((cell) => cell.contrastedOnly)));
		return GROUPS[this.group()].palettes.filter((palette) => names.has(palette));
	});

	label(key: string) {
		return key.startsWith('N') ? key.slice(1) : key;
	}
}
