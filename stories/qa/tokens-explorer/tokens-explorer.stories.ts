import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, StoryObj } from '@storybook/angular';

type TokenCategory = 'all' | 'palette' | 'color' | 'spacing' | 'radius' | 'typography' | 'elevation';
type TokenPreview = 'swatch' | 'text' | 'spacing' | 'radius' | 'font' | 'fontSize' | 'lineHeight' | 'fontWeight' | 'fontFamily' | 'shadow' | 'surface' | 'raw';

interface TokenEntry {
	name: string;
	previewVar?: string;
	value: string;
	category: TokenCategory;
	group: string;
	preview: TokenPreview;
}

const PALETTE_SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;
const PALETTES_FULL = ['brand', 'brandContrasted', 'neutral', 'product', 'success', 'successContrasted', 'warning', 'warningContrasted', 'critical'] as const;
const PALETTES_NAVIGATION = ['700', '800', '900'] as const;
const PALETTES_DECORATIVE = ['kiwi', 'lime', 'cucumber', 'mint', 'glacier', 'lagoon', 'blueberry', 'lavender', 'grape', 'watermelon', 'pumpkin', 'pineapple'] as const;

function buildPaletteTokens(): TokenEntry[] {
	const out: TokenEntry[] = [];

	for (const palette of PALETTES_FULL) {
		for (const shade of PALETTE_SHADES) {
			out.push({
				name: `--palettes-${palette}-${shade}`,
				...(palette === 'product' ? { previewVar: `--palettes-${shade}` } : {}),
				value: `Shade ${shade}`,
				category: 'palette',
				group: palette,
				preview: 'swatch',
			});
		}
	}

	for (const shade of PALETTES_NAVIGATION) {
		out.push({
			name: `--palettes-navigation-${shade}`,
			value: `Shade ${shade}`,
			category: 'palette',
			group: 'navigation',
			preview: 'swatch',
		});
	}

	for (const palette of PALETTES_DECORATIVE) {
		for (const shade of PALETTE_SHADES) {
			out.push({
				name: `--palettes-${palette}-${shade}`,
				value: `Shade ${shade}`,
				category: 'palette',
				group: `decorative / ${palette}`,
				preview: 'swatch',
			});
		}
	}

	out.push(
		{ name: '--palettes-AI-500', value: 'AI 500', category: 'palette', group: 'AI', preview: 'swatch' },
		{ name: '--palettes-AI-600', value: 'AI 600', category: 'palette', group: 'AI', preview: 'swatch' },
	);

	return out;
}

const SEMANTIC_COLOR_TOKENS: TokenEntry[] = [
	{ name: '--pr-t-color-text', value: 'Neutral 800', category: 'color', group: 'Text', preview: 'text' },
	{ name: '--pr-t-color-text-heading', value: 'Neutral 900', category: 'color', group: 'Text', preview: 'text' },
	{ name: '--pr-t-color-text-highlight', value: 'Neutral 900', category: 'color', group: 'Text', preview: 'text' },
	{ name: '--pr-t-color-text-subtle', value: 'Neutral 600', category: 'color', group: 'Text', preview: 'text' },
	{ name: '--pr-t-color-text-disabled', value: 'Neutral 500', category: 'color', group: 'Text', preview: 'text' },
	{ name: '--pr-t-color-text-reverse', value: 'Neutral 0', category: 'color', group: 'Text', preview: 'text' },
	{ name: '--pr-t-color-text-success', value: 'Success 700', category: 'color', group: 'Text', preview: 'text' },
	{ name: '--pr-t-color-text-warning', value: 'Warning 700', category: 'color', group: 'Text', preview: 'text' },
	{ name: '--pr-t-color-text-critical', value: 'Critical 700', category: 'color', group: 'Text', preview: 'text' },
];

const SPACING_KEYS = ['0', '25', '50', '75', '100', '150', '200', '250', '300', '400', '500', '600', '700', '800'] as const;
const SPACING_VALUES: Record<(typeof SPACING_KEYS)[number], string> = {
	'0': '0',
	'25': '2px',
	'50': '4px',
	'75': '6px',
	'100': '8px',
	'150': '12px',
	'200': '16px',
	'250': '20px',
	'300': '24px',
	'400': '32px',
	'500': '40px',
	'600': '48px',
	'700': '56px',
	'800': '64px',
};

const SPACING_TOKENS: TokenEntry[] = SPACING_KEYS.map((k) => ({
	name: `--pr-t-spacings-${k}`,
	value: SPACING_VALUES[k],
	category: 'spacing',
	group: 'Spacings',
	preview: 'spacing',
}));

const RADIUS_SCALE: Array<{ key: string; value: string }> = [
	{ key: '0', value: '0px' },
	{ key: '25', value: '2px' },
	{ key: '50', value: '4px' },
	{ key: '75', value: '6px' },
	{ key: '100', value: '8px' },
	{ key: '150', value: '12px' },
	{ key: '200', value: '16px' },
	{ key: '300', value: '24px' },
	{ key: '400', value: '32px' },
];

const RADIUS_SEMANTIC: Array<{ key: string; value: string }> = [
	{ key: 'structure', value: 'var(--pr-t-border-radius-150)' },
	{ key: 'default', value: 'var(--pr-t-border-radius-100)' },
	{ key: 'small', value: 'var(--pr-t-border-radius-75)' },
	{ key: 'full', value: '9999px' },
	{ key: 'input', value: 'var(--pr-t-border-radius-default)' },
];

const RADIUS_TOKENS: TokenEntry[] = [
	...RADIUS_SCALE.map((r) => ({ name: `--pr-t-border-radius-${r.key}`, value: r.value, category: 'radius' as const, group: 'Scale', preview: 'radius' as const })),
	...RADIUS_SEMANTIC.map((r) => ({ name: `--pr-t-border-radius-${r.key}`, value: r.value, category: 'radius' as const, group: 'Semantic', preview: 'radius' as const })),
];

const FONT_SIZE_SCALE: Array<{ key: string; value: string }> = [
	{ key: '150', value: '0.75rem' },
	{ key: '175', value: '0.875rem' },
	{ key: '200', value: '1rem' },
	{ key: '225', value: '1.125rem' },
	{ key: '250', value: '1.25rem' },
	{ key: '275', value: '1.375rem' },
	{ key: '300', value: '1.5rem' },
	{ key: '325', value: '1.625rem' },
	{ key: '350', value: '1.75rem' },
];

const LINE_HEIGHT_SCALE: Array<{ key: string; value: string }> = [
	{ key: '200', value: '1rem' },
	{ key: '250', value: '1.25rem' },
	{ key: '300', value: '1.5rem' },
	{ key: '350', value: '1.75rem' },
	{ key: '400', value: '2rem' },
];

const FONT_WEIGHT: Array<{ key: string; value: string }> = [
	{ key: 'regular', value: '400' },
	{ key: 'semibold', value: '600' },
	{ key: 'bold', value: '700' },
	{ key: 'black', value: '800' },
];

const FONT_SEMANTIC: string[] = ['heading-1', 'heading-2', 'heading-3', 'heading-4', 'highlight-XXL', 'highlight-XL', 'highlight-L', 'body-M', 'body-S', 'body-XS'];

const FONT_FAMILY: Array<{ key: string; value: string }> = [
	{ key: 'family', value: '"SourceSans", Tahoma, sans-serif' },
	{ key: 'family-brand', value: '"LuccaSans", Tahoma, sans-serif' },
	{ key: 'family-cursive', value: '"Caveat", cursive' },
];

const TYPOGRAPHY_TOKENS: TokenEntry[] = [
	...FONT_SEMANTIC.map((key) => ({
		name: `--pr-t-font-${key}`,
		value: `${key} shorthand`,
		category: 'typography' as const,
		group: 'Shorthands',
		preview: 'font' as const,
	})),
	...FONT_SIZE_SCALE.map((s) => ({
		name: `--pr-t-font-fontSize-${s.key}`,
		value: s.value,
		category: 'typography' as const,
		group: 'Font size',
		preview: 'fontSize' as const,
	})),
	...LINE_HEIGHT_SCALE.map((s) => ({
		name: `--pr-t-font-lineHeight-${s.key}`,
		value: s.value,
		category: 'typography' as const,
		group: 'Line height',
		preview: 'lineHeight' as const,
	})),
	...FONT_WEIGHT.map((s) => ({
		name: `--pr-t-font-fontWeight-${s.key}`,
		value: s.value,
		category: 'typography' as const,
		group: 'Font weight',
		preview: 'fontWeight' as const,
	})),
	...FONT_FAMILY.map((s) => ({
		name: `--pr-t-font-${s.key}`,
		value: s.value,
		category: 'typography' as const,
		group: 'Font family',
		preview: 'fontFamily' as const,
	})),
];

const ELEVATION_TOKENS: TokenEntry[] = [
	{ name: '--pr-t-elevation-surface-sunken', value: 'Neutral 50', category: 'elevation', group: 'Surface', preview: 'surface' },
	{ name: '--pr-t-elevation-surface-default', value: 'Neutral 25', category: 'elevation', group: 'Surface', preview: 'surface' },
	{ name: '--pr-t-elevation-surface-raised', value: 'Neutral 0', category: 'elevation', group: 'Surface', preview: 'surface' },
	{ name: '--pr-t-elevation-surface-backdrop', value: 'Neutral 400 @ 40%', category: 'elevation', group: 'Surface', preview: 'surface' },
	{ name: '--pr-t-elevation-shadow-raised', value: 'Card-like shadow', category: 'elevation', group: 'Shadow', preview: 'shadow' },
	{ name: '--pr-t-elevation-shadow-button', value: 'Button shadow', category: 'elevation', group: 'Shadow', preview: 'shadow' },
	{ name: '--pr-t-elevation-shadow-overflow', value: 'Scroll overflow shadow', category: 'elevation', group: 'Shadow', preview: 'shadow' },
	{ name: '--pr-t-elevation-shadow-overlay', value: 'Popover / dropdown shadow', category: 'elevation', group: 'Shadow', preview: 'shadow' },
];

const ALL_TOKENS: TokenEntry[] = [...buildPaletteTokens(), ...SEMANTIC_COLOR_TOKENS, ...SPACING_TOKENS, ...RADIUS_TOKENS, ...TYPOGRAPHY_TOKENS, ...ELEVATION_TOKENS];

const PRODUCT_OPTIONS: Array<{ value: string; name: string }> = [
	{ value: 'pagga', name: 'Pagga' },
	{ value: 'poplee', name: 'Poplee' },
	{ value: 'coreHR', name: 'Core HR' },
	{ value: 'timmi', name: 'Timmi' },
	{ value: 'cleemy', name: 'Cleemy' },
	{ value: 'cc', name: 'Cloud Control' },
];

@Component({
	selector: 'tokens-explorer-stories',
	templateUrl: './tokens-explorer.stories.html',
	imports: [
		FormsModule,
		FormFieldComponent,
		TextInputComponent,
		SegmentedControlComponent,
		SegmentedControlFilterComponent,
		IconComponent,
		LuTooltipModule,
		FilterBarComponent,
		FilterPillComponent,
		FilterPillAddonBeforeDirective,
		FilterPillAddonAfterDirective,
		NumericBadgeComponent,
		LuSimpleSelectInputComponent,
	],
	styles: [
		`
			.tokensExplorer {
				display: flex;
				flex-direction: column;
				gap: var(--pr-t-spacings-300);
			}

			.tokensExplorer-results {
				font: var(--pr-t-font-body-S);
				color: var(--pr-t-color-text-subtle);
				white-space: nowrap;
			}

			.tokensExplorer-empty {
				padding: var(--pr-t-spacings-400);
				text-align: center;
				color: var(--pr-t-color-text-subtle);
				background-color: var(--pr-t-elevation-surface-sunken);
				border-radius: var(--pr-t-border-radius-structure);
			}

			.tokensExplorer-group {
				display: flex;
				flex-direction: column;
				gap: var(--pr-t-spacings-150);
			}

			.tokensExplorer-group-title {
				font: var(--pr-t-font-heading-4);
				color: var(--pr-t-color-text-heading);
				margin: 0;
				padding-block-end: var(--pr-t-spacings-50);
				border-block-end: 1px solid var(--palettes-neutral-100);
			}

			.tokensExplorer-grid {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
				gap: var(--pr-t-spacings-150);
			}

			.tokensExplorer-card {
				position: relative;
				display: flex;
				align-items: center;
				gap: var(--pr-t-spacings-200);
				padding: var(--pr-t-spacings-150);
				background-color: var(--pr-t-elevation-surface-raised);
				border: 1px solid var(--palettes-neutral-100);
				border-radius: var(--pr-t-border-radius-default);
				min-block-size: 5rem;
				text-align: start;
				font-family: inherit;
				color: inherit;
				cursor: pointer;
				transition:
					border-color 150ms ease,
					box-shadow 150ms ease;
			}

			.tokensExplorer-card:hover {
				border-color: var(--palettes-product-400);
				box-shadow: var(--pr-t-elevation-shadow-raised);
			}

			.tokensExplorer-card:focus-visible {
				outline: 2px solid var(--palettes-product-600);
				outline-offset: 2px;
			}

			.tokensExplorer-card.is-copied {
				border-color: var(--palettes-success-500);
			}

			.tokensExplorer-card-icon {
				flex: 0 0 auto;
				color: var(--pr-t-color-text-subtle);
				opacity: 0;
				transition: opacity 150ms ease;
			}

			.tokensExplorer-card:hover .tokensExplorer-card-icon,
			.tokensExplorer-card:focus-visible .tokensExplorer-card-icon,
			.tokensExplorer-card.is-copied .tokensExplorer-card-icon {
				opacity: 1;
			}

			.tokensExplorer-card.is-copied .tokensExplorer-card-icon {
				color: var(--palettes-success-700);
			}

			.tokensExplorer-card-preview {
				flex: 0 0 auto;
				inline-size: 3rem;
				block-size: 3rem;
				border-radius: var(--pr-t-border-radius-small);
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: var(--pr-t-elevation-surface-default);
				overflow: hidden;
			}

			.tokensExplorer-card-preview.mod-swatch {
				border: 1px solid var(--palettes-neutral-100);
			}

			.tokensExplorer-card-preview.mod-surface {
				border: 1px solid var(--palettes-neutral-200);
			}

			.tokensExplorer-card-preview.mod-shadow {
				background-color: var(--pr-t-elevation-surface-raised);
			}

			.tokensExplorer-card-preview.mod-radius {
				border-radius: 0;
			}

			.tokensExplorer-card-preview-spacing {
				background-color: var(--palettes-product-500);
			}

			.tokensExplorer-card-preview-radius {
				inline-size: 100%;
				block-size: 100%;
				background-color: var(--palettes-neutral-200);
				border: 2px solid var(--palettes-neutral-600);
			}

			.tokensExplorer-card-preview-font {
				color: var(--pr-t-color-text-heading);
				line-height: 1;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				max-inline-size: 100%;
				max-block-size: 100%;
				padding-inline: var(--pr-t-spacings-50);
			}

			.tokensExplorer-card-preview-fontSize {
				color: var(--pr-t-color-text-heading);
				font-family: var(--pr-t-font-family);
				font-weight: var(--pr-t-font-fontWeight-semibold);
				line-height: 1;
				display: block;
				max-inline-size: 100%;
				max-block-size: 100%;
				overflow: hidden;
			}

			.tokensExplorer-card-preview-lineHeight {
				position: relative;
				display: block;
				inline-size: 100%;
				font-family: var(--pr-t-font-family);
				font-size: var(--pr-t-font-fontSize-150);
				color: var(--pr-t-color-text);
				text-align: center;
				overflow: hidden;
				max-block-size: 100%;
			}

			.tokensExplorer-card-preview-lineHeight::before,
			.tokensExplorer-card-preview-lineHeight::after {
				content: '';
				position: absolute;
				inset-inline: 0;
				block-size: 1px;
				background-color: var(--palettes-product-400);
			}

			.tokensExplorer-card-preview-lineHeight::before {
				inset-block-start: 0;
			}

			.tokensExplorer-card-preview-lineHeight::after {
				inset-block-end: 0;
			}

			.tokensExplorer-card-preview-fontWeight {
				color: var(--pr-t-color-text-heading);
				font-family: var(--pr-t-font-family);
				font-size: var(--pr-t-font-fontSize-250);
				line-height: 1;
				display: block;
				max-inline-size: 100%;
				max-block-size: 100%;
				overflow: hidden;
			}

			.tokensExplorer-card-preview-fontFamily {
				color: var(--pr-t-color-text-heading);
				font-size: var(--pr-t-font-fontSize-275);
				font-weight: var(--pr-t-font-fontWeight-bold);
				line-height: 1;
			}

			.tokensExplorer-card-preview-raw {
				font: var(--pr-t-font-body-S);
				color: var(--pr-t-color-text-subtle);
			}

			.tokensExplorer-card-info {
				display: flex;
				flex-direction: column;
				gap: var(--pr-t-spacings-25);
				min-inline-size: 0;
				flex: 1 1 auto;
			}

			.tokensExplorer-card-name {
				font-family: var(--pr-t-font-family);
				font-size: var(--pr-t-font-fontSize-175);
				font-weight: var(--pr-t-font-fontWeight-semibold);
				color: var(--pr-t-color-text);
				word-break: break-all;
			}

			.tokensExplorer-card-value {
				font: var(--pr-t-font-body-XS);
				color: var(--pr-t-color-text-subtle);
				word-break: break-all;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TokensExplorerStory {
	readonly search = signal('');
	readonly category = signal<TokenCategory>('all');
	readonly product = signal<{ value: string; name: string } | null>(null);
	readonly copiedToken = signal<string | null>(null);

	readonly productOptions = PRODUCT_OPTIONS;

	protected readonly categoryOptions: Array<{ value: TokenCategory; label: string; count: number }> = [
		{ value: 'all', label: 'Tous', count: ALL_TOKENS.length },
		{ value: 'palette', label: 'Palettes', count: ALL_TOKENS.filter((t) => t.category === 'palette').length },
		{ value: 'color', label: 'Couleurs', count: ALL_TOKENS.filter((t) => t.category === 'color').length },
		{ value: 'spacing', label: 'Espacements', count: ALL_TOKENS.filter((t) => t.category === 'spacing').length },
		{ value: 'radius', label: 'Arrondis', count: ALL_TOKENS.filter((t) => t.category === 'radius').length },
		{ value: 'typography', label: 'Typographie', count: ALL_TOKENS.filter((t) => t.category === 'typography').length },
		{ value: 'elevation', label: 'Élévations', count: ALL_TOKENS.filter((t) => t.category === 'elevation').length },
	];

	protected async copyToken(token: TokenEntry): Promise<void> {
		const text = `var(${token.name})`;
		try {
			await navigator.clipboard.writeText(text);
			this.copiedToken.set(token.name);
			setTimeout(() => {
				if (this.copiedToken() === token.name) {
					this.copiedToken.set(null);
				}
			}, 1500);
		} catch {
			// Clipboard access denied; silently ignore.
		}
	}

	readonly filteredTokens = computed(() => {
		const search = this.search().trim().toLowerCase();
		const category = this.category();
		return ALL_TOKENS.filter((token) => {
			if (category !== 'all' && token.category !== category) {
				return false;
			}
			if (!search) {
				return true;
			}
			return token.name.toLowerCase().includes(search) || token.value.toLowerCase().includes(search) || token.group.toLowerCase().includes(search);
		});
	});

	readonly groupedTokens = computed(() => {
		const tokens = this.filteredTokens();
		if (this.search().trim()) {
			return tokens.length === 0 ? [] : [{ label: '', tokens }];
		}
		const groups = new Map<string, TokenEntry[]>();
		for (const token of tokens) {
			const key = `${this.categoryLabel(token.category)} · ${token.group}`;
			if (!groups.has(key)) {
				groups.set(key, []);
			}
			groups.get(key)!.push(token);
		}
		return Array.from(groups.entries()).map(([label, tokens]) => ({ label, tokens }));
	});

	private categoryLabel(category: TokenCategory): string {
		switch (category) {
			case 'palette':
				return 'Palettes';
			case 'color':
				return 'Colors';
			case 'spacing':
				return 'Spacings';
			case 'radius':
				return 'Radius';
			case 'typography':
				return 'Typography';
			case 'elevation':
				return 'Elevation';
			default:
				return 'All';
		}
	}
}

export default {
	title: 'QA/TokensExplorer',
	component: TokensExplorerStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TokensExplorerStory> = {
	args: {},
	render: template,
};
