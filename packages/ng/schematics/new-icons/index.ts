import type { Rule } from '@angular-devkit/schematics';
import { installLocalDependencies } from '../lib/local-deps/installer.js';
import { migrateFile } from '../lib/schematics.js';
import { migrateHTMLFile, migrateScssFile, migrateTsFile } from './migration.js';

// Nx need to see "@angular-devkit/schematics" in order to run this migration correctly (see https://github.com/nrwl/nx/blob/d9fed4b832bf01d1b9a44ae9e486a5e5cd2d2253/packages/nx/src/command-line/migrate/migrate.ts#L1729-L1738)
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('@angular-devkit/schematics');

export default (options?: { skipInstallation?: boolean }): Rule => {
	const skipInstallation = options?.skipInstallation ?? false;

	return async (tree, context) => {
		if (!skipInstallation) {
			installLocalDependencies(context);
		}

		const postCssScss = await import('../lib/local-deps/postcss-scss.js');
		const angularCompiler = await import('@angular/compiler');
		const { postcssSelectorParser } = await import('../lib/local-deps/postcss-selector-parser.js');

		tree.visit((path, entry) => {
			if (path.includes('node_modules') || !entry) {
				return;
			}
			if (path.endsWith('.scss')) {
				migrateFile(path, entry, tree, (content) => migrateScssFile(content, postCssScss, postcssSelectorParser));
			}
			if (path.endsWith('.html')) {
				migrateFile(path, entry, tree, (content) => migrateHTMLFile(content, angularCompiler));
			}
			if (path.endsWith('.ts')) {
				migrateFile(path, entry, tree, (content) => migrateTsFile(path, content, angularCompiler));
			}
		});
	};
};
