import type { Rule } from '@angular-devkit/schematics';
import { replaceComponentInputName, updateAngularTemplate } from '../lib/angular-template';
import { migrateFile } from '../lib/schematics';
import { currentSchematicContext, SchematicContextOpts } from '../lib/lf-schematic-context';

// Nx need to see "@angular-devkit/schematics" in order to run this migration correctly (see https://github.com/nrwl/nx/blob/d9fed4b832bf01d1b9a44ae9e486a5e5cd2d2253/packages/nx/src/command-line/migrate/migrate.ts#L1729-L1738)
require('@angular-devkit/schematics');

export default (options?: SchematicContextOpts): Rule => {
	return async (tree, context) => {
		await currentSchematicContext.init(context, options);
		tree.visit((path, entry) => {
			if (path.includes('node_modules') || !entry) {
				return;
			}

			migrateFile(path, entry, tree, (content) =>
				updateAngularTemplate(path, content, (template) => {
					template = replaceComponentInputName('lu-empty-state-page', 'title', 'heading', template);
					template = replaceComponentInputName('lu-empty-state-section', 'title', 'heading', template);
					return template;
				})
			);
		});
	};
};
