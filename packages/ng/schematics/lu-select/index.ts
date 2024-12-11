import type { Rule } from '@angular-devkit/schematics';
import { installLocalDependencies } from '../lib/local-deps/installer';
import { migrateFile } from '../lib/schematics';
import { migrateComponent } from './migration';
import ts, { ScriptTarget } from 'typescript';

// Nx need to see "@angular-devkit/schematics" in order to run this migration correctly (see https://github.com/nrwl/nx/blob/d9fed4b832bf01d1b9a44ae9e486a5e5cd2d2253/packages/nx/src/command-line/migrate/migrate.ts#L1729-L1738)
require('@angular-devkit/schematics');

export default (options?: { skipInstallation?: boolean }): Rule => {
	const skipInstallation = options?.skipInstallation ?? false;

	return (tree, context) => {
		if (!skipInstallation) {
			installLocalDependencies(context);
		}

		tree.visit((path, entry) => {
			if (path.includes('node_modules') || !entry) {
				return;
			}
			if (path.endsWith('.ts')) {
				migrateFile(path, entry, tree, (content) => {
					const sourceFile = ts.createSourceFile(path, content, ScriptTarget.ESNext);
					return migrateComponent(sourceFile, path, tree);
				});
			}
		});
	};
};
