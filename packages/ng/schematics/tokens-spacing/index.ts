import type { Rule } from '@angular-devkit/schematics';
import { CssMapper } from '../lib/css-mapper';
import { installLocalDependencies } from '../lib/local-deps/installer';

// Nx need to see "@angular-devkit/schematics" in order to run this migration correctly (see https://github.com/nrwl/nx/blob/d9fed4b832bf01d1b9a44ae9e486a5e5cd2d2253/packages/nx/src/command-line/migrate/migrate.ts#L1729-L1738)
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('@angular-devkit/schematics');

export default (options?: { skipInstallation?: boolean }): Rule => {
	const skipInstallation = options?.skipInstallation ?? false;

	return async (tree, context) => {
		if (!skipInstallation) {
			installLocalDependencies(context);
		}

		await new CssMapper(
			tree,
			{
				classes: {
					'u-margin{tshirt}': 'pr-u-margin{tshirt}',
					'u-marginTop{tshirt}': 'pr-u-marginBlockStart{tshirt}',
					'u-marginBottom{tshirt}': 'pr-u-marginBlockEnd{tshirt}',
					'u-marginLeft{tshirt}': 'pr-u-marginInlineStart{tshirt}',
					'u-marginRight{tshirt}': 'pr-u-marginInlineEnd{tshirt}',
					'u-marginInline{tshirt}': 'pr-u-marginInline{tshirt}',
					'u-marginBlock{tshirt}': 'pr-u-marginBlock{tshirt}',
					'u-padding{tshirt}': 'pr-u-padding{tshirt}',
					'u-paddingTop{tshirt}': 'pr-u-paddingBlockStart{tshirt}',
					'u-paddingBottom{tshirt}': 'pr-u-paddingBlockEnd{tshirt}',
					'u-paddingLeft{tshirt}': 'pr-u-paddingInlineStart{tshirt}',
					'u-paddingRight{tshirt}': 'pr-u-paddingInlineEnd{tshirt}',
					'u-paddingInline{tshirt}': 'pr-u-paddingInline{tshirt}',
					'u-paddingBlock{tshirt}': 'pr-u-paddingBlock{tshirt}',
					'u-gap{tshirt}': 'pr-u-gap{tshirt}',
					'u-rowGap{tshirt}': 'pr-u-rowGap{tshirt}',
					'u-columnGap{tshirt}': 'pr-u-columnGap{tshirt}',
				},
				variables: {
					'--spacings-{tshirt}': `--pr-t-spacings-{tshirt}`,
				},
				mixins: {},
			},
			{
				tshirt: {
					Auto: 'Auto',
					0: '0',
					XXS: '50',
					XS: '100',
					S: '200',
					M: '300',
					L: '400',
					XL: '600',
					XXL: '800',
				},
			},
		).run();
	};
};
