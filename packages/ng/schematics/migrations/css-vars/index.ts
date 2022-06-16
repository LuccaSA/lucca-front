import type { Rule } from '@angular-devkit/schematics';
import { spawnSync } from 'child_process';
import * as path from 'path';
import { migrateAngularJsonFile, migrateHTMLFile, migrateScssFile } from './migration';

export default (options?: { skipInstallation?: boolean }): Rule => {
	const skipInstallation = options?.skipInstallation ?? false;

	return async (tree, context) => {
		if (!skipInstallation) {
			context.logger.info('Installing dependencies...');

			try {
				spawnSync('npm', ['ci'], {
					cwd: path.join(__dirname, '../../lib/local-deps'),
				});
			} catch (e) {
				// eslint-disable-next-line
				context.logger.error('Failed to install dependencies', (e as any).toString())
			}
		}

		const { postCss } = await import('../../lib/local-deps/postcss');
		const postCssScss = await import('../../lib/local-deps/postcss-scss');
		const { postcssValueParser } = await import('../../lib/local-deps/postcss-value-parser');

		tree.visit((path, entry) => {
			if (path.includes('node_modules') || !entry) {
				return;
			}

			if (path.endsWith('angular.json')) {
				tree.overwrite(path, migrateAngularJsonFile(entry.content.toString()));
			}

			if (path.endsWith('.scss')) {
				tree.overwrite(path, migrateScssFile(entry.content.toString(), postCss, postCssScss, postcssValueParser));
			}

			if (path.endsWith('.html')) {
				tree.overwrite(path, migrateHTMLFile(entry.content.toString()));
			}
		});
	};
};
