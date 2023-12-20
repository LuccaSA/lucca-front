import type { Rule } from '@angular-devkit/schematics';
import { spawnSync } from 'child_process';
import * as path from 'path';
import { migrateFile } from '../lib/schematics.js';
import { migrateHTMLFile, migrateScssFile, migrateTsFile } from './migration.js';

export default (options?: { skipInstallation?: boolean }): Rule => {
	const skipInstallation = options?.skipInstallation ?? false;

	return async (tree, context) => {
		if (!skipInstallation) {
			context.logger.info('Installing dependencies...');

			try {
				spawnSync('npm', ['ci'], {
					cwd: path.join(__dirname, '../../lib/local-deps'),
				});
				context.logger.info('Installing dependencies... Done!');
			} catch (e) {
				// eslint-disable-next-line
				context.logger.error('Failed to install dependencies', (e as any).toString());
			}
		}

		const postCssScss = await import('../lib/local-deps/postcss-scss.js');
		const angularCompiler = await import('@angular/compiler');
		const { postcssValueParser } = await import('../lib/local-deps/postcss-value-parser.js');
		const { postcssSelectorParser } = await import('../lib/local-deps/postcss-selector-parser.js');

		tree.visit((path, entry) => {
			if (path.includes('node_modules') || !entry) {
				return;
			}
			if (path.endsWith('.scss')) {
				migrateFile(path, entry, tree, (content) => migrateScssFile(content, postCssScss, postcssValueParser, postcssSelectorParser));
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
