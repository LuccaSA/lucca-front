import type { Rule } from '@angular-devkit/schematics';
import { CssMapper, currentSchematicContext, SchematicContextOpts } from '../lib';

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
					'palette-grey': 'palette-neutral',
					'palette-primary': 'palette-product',
					'palette-secondary': 'palette-product',
					'palette-lucca': 'palette-brand',
				},
				variables: {
					'--palettes-grey-{val}': `--palettes-neutral-{val}`,
					'--palettes-primary-{val}': `--palettes-product-{val}`,
					'--palettes-secondary-{val}': `--palettes-product-{val}`,
					'--palettes-lucca-{val}': `--palettes-brand-{val}`,
					'--colors-grey-{val}': `--palettes-neutral-{val}`,
					'--colors-white-color': '--palettes-neutral-0',
					'--colors-black-color': '--palettes-neutral-900'
				},
				mixins: {}
			},
			{
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
	};
};
