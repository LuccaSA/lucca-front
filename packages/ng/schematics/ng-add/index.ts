import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { createShameScss, updateAngularJson, updateStylesScss } from './tasks';

export function ngAdd(): Rule {
	return (tree: Tree, context: SchematicContext) => {
		context.addTask(new NodePackageInstallTask({ packageName: '@lucca-front/icons' }));
		context.addTask(new NodePackageInstallTask({ packageName: '@lucca-front/scss' }));

		// Add LF @import and init css vars
		updateStylesScss(tree);

		// Add empty shame file
		createShameScss(tree);

		// Add stylePreprocessorOptions
		updateAngularJson(tree);
	};
}
