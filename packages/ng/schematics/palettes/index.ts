import type { Rule } from '@angular-devkit/schematics';
import { CssMapper, currentSchematicContext, DeprecatedMapper, SchematicContextOpts } from '../lib';

// Nx need to see "@angular-devkit/schematics" in order to run this migration correctly (see https://github.com/nrwl/nx/blob/d9fed4b832bf01d1b9a44ae9e486a5e5cd2d2253/packages/nx/src/command-line/migrate/migrate.ts#L1729-L1738)
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('@angular-devkit/schematics');

export default (options?: SchematicContextOpts): Rule => {

	return async (tree, context) => {
		await currentSchematicContext.init(context, options);

		await new CssMapper(
			tree,
			{
				classes: {
					// Palette classes (Button, Callout, Gauge, Clear, Numeric Badge, Status Badge, …)
					'palette-{palette}': 'palette-{palette}',
					// Component color modifier (Box, Card, Section) — only `grey` existed
					'mod-grey': 'mod-neutral',
					// Icon color classes — only `primary`/`secondary` existed
					'icon-color-primary': 'icon-color-product',
					'icon-color-secondary': 'icon-color-product',
					// Text color utilities generated from the palette list
					'u-text{Palette}': 'u-text{Palette}',
					'pr-u-text{Palette}': 'pr-u-text{Palette}',
					'pr-u-colorText{Palette}': 'pr-u-colorText{Palette}',
				},
				variables: {
					'--palettes-{palette}-{val}': `--palettes-{palette}-{val}`,
					'--colors-grey-{val}': `--palettes-neutral-{val}`,
					'--colors-white-color': '--palettes-neutral-0',
					'--colors-black-color': '--palettes-neutral-900',
					'--palettes-grey-text': `--palettes-grey-0`,
					'--palettes-neutral-text': `--palettes-neutral-0`,
					'--palettes-primary-text': `--palettes-primary-0`,
					'--palettes-secondary-text': `--palettes-secondary-0`,
					'--palettes-product-text': `--palettes-product-0`,
					'--palettes-lucca-text': `--palettes-lucca-0`,
					'--palettes-brand-text': `--palettes-brand-0`,
					'--palettes-success-text': `--palettes-success-0`,
					'--palettes-warning-text': `--palettes-warning-0`,
					'--palettes-error-text': `--palettes-error-0`,
					'--palettes-critical-text': `--palettes-critical-0`,
				},
				mixins: {}
			},
			{
				// Deprecated palette -> new palette (used by both classes and CSS vars)
				palette: {
					grey: 'neutral',
					primary: 'product',
					secondary: 'product',
					lucca: 'brand',
				},
				val: {
					25: '25',
					50: '50',
					100: '100',
					200: '200',
					300: '300',
					400: '400',
					500: '500',
					600: '600',
					700: '700',
					800: '800',
					900: '900'
				}
			}
		).run();

		new DeprecatedMapper(tree, {
			modules: {},
			types: {},
			inputsOutputs: {
				// The `lu-icon` component `color` input is not a CSS class, so it isn't handled by CssMapper.
				// Deprecated `primary`/`secondary` values → `product` (handles both `color="primary"` and `[color]="'primary'"`).
				'lu-icon': { color: { primary: 'product', secondary: 'product' } },
			},
		}).run();
	};
};
