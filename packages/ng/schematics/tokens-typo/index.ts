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
				classes: {},
				variables: {
					'--commons-font-family':	'--pr-t-font-family',
					'--commons-font-family-brand':	'--pr-t-font-family-brand',
					'--commons-font-family-cursive':	'--pr-t-font-family-cursive',
					'--sizes-XXL-fontSize':	'--pr-t-font-heading-1-fontSize',
					'--sizes-XL-fontSize':	'--pr-t-font-heading-2-fontSize',
					'--sizes-L-fontSize':	'--pr-t-font-heading-3-fontSize',
					'--sizes-M-fontSize':	'--pr-t-font-body-M-fontSize /* [LF] Prefer --pr-t-font-heading-4-fontSize for heading style */',
					'--sizes-S-fontSize':	'--pr-t-font-body-S-fontSize',
					'--sizes-XS-fontSize':	'--pr-t-font-body-XS-fontSize',
					'--sizes-XXL-lineHeight':	'--pr-t-font-heading-1-lineHeight',
					'--sizes-XL-lineHeight':	'--pr-t-font-heading-2-lineHeight',
					'--sizes-L-lineHeight':	'--pr-t-font-heading-3-lineHeight',
					'--sizes-M-lineHeight':	'--pr-t-font-body-M-lineHeight /* [LF] Prefer --pr-t-font-heading-4-lineHeight for heading style */',
					'--sizes-S-lineHeight':	'--pr-t-font-body-S-lineHeight',
					'--sizes-XS-lineHeight':	'--pr-t-font-body-XS-lineHeight',
				},
				mixins: {}
			},
			{}
		).run();
	};
};
