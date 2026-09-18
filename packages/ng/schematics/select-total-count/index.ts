import type { Rule } from '@angular-devkit/schematics';
import { currentSchematicContext, migrateFile, SchematicContextOpts } from '../lib';
import { migrateTotalCount } from './migration';

// Nx need to see "@angular-devkit/schematics" in order to run this migration correctly (see https://github.com/nrwl/nx/blob/d9fed4b832bf01d1b9a44ae9e486a5e5cd2d2253/packages/nx/src/command-line/migrate/migrate.ts#L1729-L1738)
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('@angular-devkit/schematics');

/** `detectUnused` is specific to this migration, the shared options stay untouched. */
type SelectTotalCountOpts = SchematicContextOpts & { detectUnused?: boolean };

export default (options?: SelectTotalCountOpts): Rule => {
	return async (tree, context) => {
		await currentSchematicContext.init(context, options);

		tree.visit((path, entry) => {
			if (path.includes('node_modules') || !entry) {
				return;
			}

			if (path.endsWith('.ts') && !path.endsWith('.d.ts')) {
				migrateFile(path, entry, tree, (content) => migrateTotalCount(path, content, options?.detectUnused));
			}
		});
	};
};
