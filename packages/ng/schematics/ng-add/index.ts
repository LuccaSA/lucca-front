import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { createPalettesOverrideScss, createShameScss, updateAngularJson, updateStylesScss } from './tasks';

export function ngAdd(): Rule {
	return async (tree: Tree, context: SchematicContext) => {
		context.addTask(new NodePackageInstallTask({ packageName: '@lucca-front/icons' }));
		context.addTask(new NodePackageInstallTask({ packageName: '@lucca-front/scss' }));

		// Add LF @import and init css vars
		updateStylesScss(tree);

		// Add empty shame file
		createShameScss(tree);

		// Copy default palette in scss/overrides/_palettes.override.scss
		createPalettesOverrideScss(tree);

		// Add stylePreprocessorOptions
		updateAngularJson(tree);
	};
}
