/* eslint-disable @typescript-eslint/no-require-imports */
import { Rule } from '@angular-devkit/schematics';
import { createSourceFile, ScriptTarget } from 'typescript';
import { currentSchematicContext, migrateFile, SchematicContextOpts } from '../lib';
import { migrateComponent } from './migration';

// Nx need to see "@angular-devkit/schematics" in order to run this migration correctly (see https://github.com/nrwl/nx/blob/d9fed4b832bf01d1b9a44ae9e486a5e5cd2d2253/packages/nx/src/command-line/migrate/migrate.ts#L1729-L1738)
require('@angular-devkit/schematics');

export default (options?: SchematicContextOpts & { noComments?: boolean }): Rule => {

	return async (tree, context) => {
		await currentSchematicContext.init(context, options);

		tree.visit((path, entry) => {
			if (path.includes('node_modules') || !entry) {
				return;
			}
			if (path.endsWith('.ts')) {
				migrateFile(path, entry, tree, (content) => {
					const sourceFile = createSourceFile(path, content, ScriptTarget.ESNext);
					return migrateComponent(sourceFile, path, tree, options?.noComments);
				});
			}
		});
	};
};
