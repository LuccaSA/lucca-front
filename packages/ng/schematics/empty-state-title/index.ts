import type { Rule } from '@angular-devkit/schematics';
import { spawnSync } from 'child_process';
import * as path from 'path';
import { replaceComponentInputName, updateAngularTemplate } from '../lib/angular-template';
import { migrateFile } from '../lib/schematics';

export default (options?: { skipInstallation?: boolean }): Rule => {
	const skipInstallation = options?.skipInstallation ?? false;

	return async (tree, context) => {
		if (!skipInstallation) {
			context.logger.info('Installing dependencies...');

			try {
				spawnSync('npm', ['ci'], {
					cwd: path.join(__dirname, '../lib/local-deps'),
				});
				context.logger.info('Installing dependencies... Done!');
			} catch (e) {
				// eslint-disable-next-line
				context.logger.error('Failed to install dependencies', (e as any).toString());
			}
		}

		const angularCompiler = await import('@angular/compiler');

		tree.visit((path, entry) => {
			if (path.includes('node_modules') || !entry) {
				return;
			}

			migrateFile(path, entry, tree, (content) =>
				updateAngularTemplate(path, content, (template) => {
					template = replaceComponentInputName('lu-empty-state-page', 'title', 'heading', template, angularCompiler);
					template = replaceComponentInputName('lu-empty-state-section', 'title', 'heading', template, angularCompiler);
					return template;
				}),
			);
		});
	};
};
