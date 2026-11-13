import { NgTemplateOutlet } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';

export type Grid = 'neutralVsPalette' | 'withinPalette' | 'withinNeutral';
type State = 'pass' | 'contrastedOnly' | 'fail';

const SHADES = ['900', '800', '700', '600', '500', '400', '300', '200', '100', '50'];
const NEUTRALS = ['900', '800', '700', '600', '500', '400', '300', '200', '100', '50', '25', '0'].map((n) => `N${n}`);

// Palettes that are not color palettes to check: the neutral axis, technical palettes and deprecated aliases.
// Contrasted variants are excluded too, they are read through the enhanced-contrast probe.
const EXCLUDED = ['neutral', 'navigation', 'product', 'ai', 'error', 'orchid'];

// Every color palette loaded in the page, read from the --palettes-<name>-700 variables of its style sheets
const detectPalettes = () => {
	const names = new Set<string>();
	const walk = (rules: CSSRuleList) => {
		for (const rule of Array.from(rules)) {
			if (rule instanceof CSSStyleRule) {
				for (const property of Array.from(rule.style)) {
					const name = /^--palettes-([a-zA-Z0-9]+)-700$/.exec(property)?.[1];
					if (name && !name.endsWith('Contrasted') && !EXCLUDED.includes(name)) {
						names.add(name);
					}
				}
			}
			if ('cssRules' in rule) {
				walk((rule as CSSGroupingRule).cssRules);
			}
		}
	};
	for (const sheet of Array.from(document.styleSheets)) {
		try {
			walk(sheet.cssRules);
		} catch {
			// Cross-origin style sheets cannot be read
		}
	}
	return [...names];
};

// Guaranteed pairs (foreground|background, symmetric), 4.5:1 unless listed in NON_TEXT
const pairs = (list: [string, string[]][]) => list.flatMap(([a, bs]) => bs.flatMap((b) => [`${a}|${b}`, `${b}|${a}`]));
const NEUTRAL_VS_PALETTE = new Set(
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
const WITHIN_PALETTE = new Set(
	pairs([
		['900', ['400', '300', '200', '100', '50']],
		['800', ['300', '200', '100', '50']],
		['700', ['50']],
	]),
);
const WITHIN_NEUTRAL = new Set(
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
	// Palettes that fail even in the enhanced-contrast mode
	failing: string[];
	// Palettes below the threshold in the default mode, with their ratio, split by outcome
	details: SafeHtml | null;
}

@Component({
	selector: 'contrast-grid-story',
	imports: [LuTooltipTriggerDirective, NgTemplateOutlet],
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
						<span class="contrastGrid-label" aria-hidden="true">{{ columnAxis() }}</span>
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
								<span class="contrastGrid-label mod-vertical" aria-hidden="true">{{ rowAxis() }}</span>
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
									<ng-template #mark>
										<span aria-hidden="true">{{ cell.state === 'fail' ? '✗' : '✓' }}</span>
										<span class="pr-u-mask"> {{ cell.state === 'fail' ? 'Insufficient' : 'Sufficient' }} contrast ({{ cell.threshold === 3 ? '3:1' : '4.5:1' }}) </span>
									</ng-template>
									<!-- The tooltip goes on an inner element: on the cell, its button role would break the table -->
									@if (cell.details) {
										<span class="contrastGrid-mark pr-u-focusVisible pr-u-borderRadiusSmall" [luTooltip]="cell.details!">
											<ng-container [ngTemplateOutlet]="mark" />
										</span>
									} @else {
										<ng-container [ngTemplateOutlet]="mark" />
									}
								}
							</td>
						}
					</tr>
				}
			</tbody>
		</table>
		<!-- Legend: a sample of each mark used in the grid, then its meaning; long lists go in tooltips -->
		@if (grid() !== 'withinNeutral') {
			<p class="contrastGrid-legend contrastGrid-key">
				@if (failing().length) {
					<span class="contrastGrid-keyItem contrastGrid-failing">
						<span class="contrastGrid-swatch mod-failing" aria-hidden="true">✗</span>
						Fails: {{ failing().join(', ') }}
					</span>
				}
				<span class="contrastGrid-keyItem">
					<span class="contrastGrid-swatch" aria-hidden="true">✓</span>
					Text (4.5:1)
				</span>
				@if (contrastedOnly().length) {
					<span class="contrastGrid-keyItem">
						<span class="contrastGrid-swatch mod-hatched" aria-hidden="true">✓</span>
						Enhanced contrast only
					</span>
				}
				@if (grid() === 'neutralVsPalette') {
					<span class="contrastGrid-keyItem">
						<span class="contrastGrid-swatch mod-dashed" aria-hidden="true">✓</span>
						Icons and borders only (3:1)
					</span>
				}
			</p>
			<details class="contrastGrid-legend">
				<summary class="contrastGrid-summary pr-u-focusVisible pr-u-borderRadiusSmall">{{ palettes().length }} palettes checked</summary>
				<!-- HTML tags rather than lu-tag: its palette input does not cover product palettes -->
				<!-- Palettes grouped by outcome, with the same samples as the legend -->
				@for (group of groups(); track group.mod) {
					@if (group.palettes.length) {
						<span class="contrastGrid-tags">
							<span class="contrastGrid-swatch {{ group.mod }}" aria-hidden="true">{{ group.mark }}</span>
							<span class="pr-u-mask">{{ group.label }}:</span>
							<span class="contrastGrid-tagList">
								@for (palette of group.palettes; track palette) {
									<span class="tag palette-{{ palette }}">{{ palette }}</span>
								}
							</span>
						</span>
					}
				}
			</details>
		}
		<p class="contrastGrid-legend">This grid is computed live from the Lucca Front color variables, and each cell works both ways.</p>
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

		.contrastGrid-mark {
			cursor: help;
			padding-inline: var(--pr-t-spacings-100);
		}

		.contrastGrid-failing {
			color: var(--palettes-critical-800);
		}

		/* First line under the grid: more room than between the notes */
		.contrastGrid-legend.contrastGrid-key {
			margin-block-start: var(--pr-t-spacings-200);
		}

		.contrastGrid-key {
			display: flex;
			flex-wrap: wrap;
			gap: var(--pr-t-spacings-50) var(--pr-t-spacings-200);
		}

		.contrastGrid-keyItem {
			align-items: center;
			display: inline-flex;
			gap: var(--pr-t-spacings-50);
		}

		/* Same look as the grid cells, at a smaller size */
		.contrastGrid-swatch {
			background-color: var(--palettes-success-50);
			block-size: 1.5rem;
			border: 1px solid var(--palettes-neutral-100);
			color: var(--palettes-success-700);
			display: inline-grid;
			flex-shrink: 0;
			font: var(--pr-t-font-body-XS);
			inline-size: 2.25rem;
			place-items: center;

			&.mod-hatched {
				background-image: repeating-linear-gradient(-45deg, transparent 0 4px, var(--palettes-success-100) 4px 8px);
			}

			&.mod-dashed {
				background-color: var(--palettes-neutral-50);
				color: var(--palettes-neutral-800);
				outline: 2px dashed var(--palettes-neutral-600);
				outline-offset: -3px;
			}

			&.mod-failing {
				background-color: var(--palettes-critical-50);
				color: var(--palettes-critical-800);
			}
		}

		.contrastGrid-tags {
			align-items: start;
			display: flex;
			gap: var(--pr-t-spacings-50);
			margin-block-start: var(--pr-t-spacings-100);
		}

		/* First row of tags centered on the sample (24px sample, 20px tags) */
		.contrastGrid-tagList {
			display: flex;
			margin-block-start: 0.125rem;
			flex-wrap: wrap;
			gap: var(--pr-t-spacings-50);
		}

		.contrastGrid-summary {
			cursor: pointer;
		}

		.contrastGrid-checked {
			cursor: help;
			text-decoration: underline dotted;
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
	readonly grid = input<Grid>('neutralVsPalette');

	// Probes always rendered, so the colors of both modes can be read at any time
	readonly normal = viewChild<ElementRef<HTMLElement>>('normal');
	readonly contrast = viewChild<ElementRef<HTMLElement>>('contrast');
	readonly #rendered = signal(false);
	readonly #sanitizer = inject(DomSanitizer);

	constructor() {
		afterNextRender(() => this.#rendered.set(true));
	}

	readonly rows = computed(() => (this.grid() === 'withinPalette' ? SHADES : NEUTRALS));
	// The contrast ratio is symmetric: axes name what they hold, not foreground and background
	readonly rowAxis = computed(() => (this.grid() === 'withinPalette' ? 'Palette' : 'Neutral'));
	readonly columnAxis = computed(() => (this.grid() === 'withinNeutral' ? 'Neutral' : 'Palette'));
	readonly columns = computed(() => (this.grid() === 'withinNeutral' ? NEUTRALS : SHADES));
	readonly caption = computed(() => `Contrast grid: ${{ neutralVsPalette: 'neutral vs palette', withinPalette: 'within a palette', withinNeutral: 'within the neutral palette' }[this.grid()]}`);

	readonly palettes = computed(() => (this.#rendered() ? detectPalettes() : []));

	readonly cells = computed<Cell[][]>(() => {
		const normal = this.normal()?.nativeElement;
		const contrast = this.contrast()?.nativeElement;
		if (!this.#rendered() || !normal || !contrast) {
			return [];
		}
		const styles = { normal: getComputedStyle(normal), contrast: getComputedStyle(contrast) };
		const palettes = this.grid() === 'withinNeutral' ? ['neutral'] : this.palettes();
		const shape = this.grid() === 'neutralVsPalette' ? NEUTRAL_VS_PALETTE : this.grid() === 'withinPalette' ? WITHIN_PALETTE : WITHIN_NEUTRAL;
		const color = (style: CSSStyleDeclaration, palette: string, key: string) =>
			style.getPropertyValue(key.startsWith('N') ? `--palettes-neutral-${key.slice(1)}` : `--palettes-${palette}-${key}`).trim();
		const contrastOf = (style: CSSStyleDeclaration, palette: string, row: string, column: string) => {
			const foreground = color(style, palette, row);
			const background = color(style, palette, column);
			return isHex(foreground) && isHex(background) ? ratio(foreground, background) : 0;
		};
		const passes = (style: CSSStyleDeclaration, palette: string, row: string, column: string, threshold: number) => contrastOf(style, palette, row, column) >= threshold;
		return this.rows().map((row) =>
			this.columns().map((column) => {
				const key = `${row}|${column}`;
				const threshold = shape.has(key) ? 4.5 : NON_TEXT.has(key) && this.grid() === 'neutralVsPalette' ? 3 : 0;
				if (!threshold) {
					return { key, threshold, state: 'pass', contrastedOnly: [], failing: [], details: null };
				}
				const failing = palettes.filter((palette) => !passes(styles.normal, palette, row, column, threshold));
				const contrastedOnly = failing.filter((palette) => passes(styles.contrast, palette, row, column, threshold));
				const state: State = !failing.length ? 'pass' : contrastedOnly.length === failing.length ? 'contrastedOnly' : 'fail';
				const lost = failing.filter((palette) => !contrastedOnly.includes(palette));
				// Failing palettes with their ratio, to size the fix; the others by name only
				const fails = lost.map((palette) => `${palette} · ${contrastOf(styles.normal, palette, row, column).toFixed(2)}:1`).join('<br>');
				const html = [lost.length ? `<strong>Fails</strong><br>${fails}` : '', contrastedOnly.length ? `<strong>Enhanced contrast only</strong><br>${contrastedOnly.join(', ')}` : '']
					.filter(Boolean)
					.join('<br><br>');
				// Palette names come from the page style sheets, not from user input
				const details = html ? this.#sanitizer.bypassSecurityTrustHtml(html) : null;
				return { key, threshold, state, contrastedOnly, failing: lost, details };
			}),
		);
	});

	readonly failing = computed(() => {
		const names = new Set(this.cells().flatMap((row) => row.flatMap((cell) => cell.failing)));
		return this.palettes().filter((palette) => names.has(palette));
	});

	// Each palette in its worst outcome across the grid
	readonly groups = computed(() => {
		const failing = this.failing();
		const contrasted = this.contrastedOnly().filter((palette) => !failing.includes(palette));
		return [
			{ mod: '', mark: '✓', label: 'Default mode', palettes: this.palettes().filter((palette) => !failing.includes(palette) && !contrasted.includes(palette)) },
			{ mod: 'mod-hatched', mark: '✓', label: 'Enhanced contrast only', palettes: contrasted },
			{ mod: 'mod-failing', mark: '✗', label: 'Fails', palettes: failing },
		];
	});

	readonly contrastedOnly = computed(() => {
		const names = new Set(this.cells().flatMap((row) => row.flatMap((cell) => cell.contrastedOnly)));
		return this.palettes().filter((palette) => names.has(palette));
	});

	label(key: string) {
		return key.startsWith('N') ? key.slice(1) : key;
	}
}
