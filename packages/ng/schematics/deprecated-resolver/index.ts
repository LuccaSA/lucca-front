import type { Rule } from '@angular-devkit/schematics';
import { currentSchematicContext, DeprecatedMapper, SchematicContextOpts } from '../lib';

// Nx need to see "@angular-devkit/schematics" in order to run this migration correctly (see https://github.com/nrwl/nx/blob/d9fed4b832bf01d1b9a44ae9e486a5e5cd2d2253/packages/nx/src/command-line/migrate/migrate.ts#L1729-L1738)
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('@angular-devkit/schematics');

export default (options: SchematicContextOpts): Rule => {
	return async (tree, context) => {
		await currentSchematicContext.init(context, options);

		new DeprecatedMapper(tree, {
			modules: {
					LuDateSelectInputModule: 'LuDateSelectInputComponent',
					LuUserSelectInputModule: 'LuUserSelectInputComponent',
				},
				types: {
					ILuTranslation: 'LuTranslation',
				},
		}).run();
	};
};
