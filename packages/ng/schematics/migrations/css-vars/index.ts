import type { Rule } from '@angular-devkit/schematics';
import { spawnSync } from 'child_process';
import * as path from 'path';
import { extractAllCssClassNames } from '../../lib/html-ast';
import { getCssImports } from './css-class-registry';
import { migrateAngularJsonFile, migrateHTMLFile, migrateScssFile, optimizeScssGlobalImport } from './migration';

export default (options?: { skipInstallation?: boolean; skipGlobalImportOptimization: boolean }): Rule => {
	const skipInstallation = options?.skipInstallation ?? false;
	const skipGlobalImportOptimization = options?.skipGlobalImportOptimization ?? false;

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
				context.logger.error('Failed to install dependencies', (e as any).toString())
			}
		}

		const { postCss } = await import('../../lib/local-deps/postcss.js');
		const postCssScss = await import('../../lib/local-deps/postcss-scss.js');
		const angularCompiler = await import('@angular/compiler');
		const { postcssValueParser } = await import('../../lib/local-deps/postcss-value-parser.js');

		const allCssClasses = new Set<string>();

		tree.visit((path, entry) => {
			if (path.includes('node_modules') || !entry) {
				return;
			}

			function migrateFile(updater: (content: string) => string): void {
				if (!entry) {
					return;
				}

				const content = entry.content.toString();
				const newContent = updater(content);

				if (content !== newContent) {
					tree.overwrite(path, newContent);
				}
			}

			if (path.endsWith('angular.json')) {
				migrateFile((content) => migrateAngularJsonFile(content));
			}

			if (path.endsWith('.scss')) {
				migrateFile((content) => migrateScssFile(content, postCss, postCssScss, postcssValueParser));
			}

			if (path.endsWith('.html')) {
				migrateFile((content) => {
					if (!skipGlobalImportOptimization) {
						extractAllCssClassNames(content, angularCompiler).forEach((c) => allCssClasses.add(c));
					}

					return migrateHTMLFile(content, angularCompiler);
				});
			}
		});

		if (!skipGlobalImportOptimization) {
			const cssImports = getCssImports([...allCssClasses]);

			tree.visit((path, entry) => {
				if (path.includes('node_modules') || !entry || !path.endsWith('.scss')) {
					return;
				}

				const content = entry.content.toString();
				const newContent = optimizeScssGlobalImport(content, cssImports, postCss, postCssScss);

				if (content !== newContent) {
					tree.overwrite(path, newContent);
				}
			});
		}
	};
};
