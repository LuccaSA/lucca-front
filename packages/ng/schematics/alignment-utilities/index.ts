import type { Rule } from '@angular-devkit/schematics';
import { CssMapper } from '../lib/css-mapper';
import { currentSchematicContext, SchematicContextOpts } from '../lib/lf-schematic-context';

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
					'u-textLeft': 'pr-u-textAlignStart',
					'u-textCenter': 'pr-u-textAlignCenter',
					'u-textRight': 'pr-u-textAlignEnd'
				},
				variables: {},
				mixins: {}
			},
			{}
		).run();
	};
};
