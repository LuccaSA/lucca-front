import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { createShameScss, getAngularJson, getProject, updateAngularJson, updateStylesScss } from './tasks';

export function ngAdd(): Rule {
	return (tree: Tree, context: SchematicContext) => {
		context.addTask(new NodePackageInstallTask({ packageName: '@lucca-front/icons' }));
		context.addTask(new NodePackageInstallTask({ packageName: '@lucca-front/scss' }));

		const angularJson = getAngularJson(tree);
		const project = getProject(angularJson);

		// Add LF @import and init css vars
		updateStylesScss(tree, project);

		// Add empty shame file
		createShameScss(tree, project);

		// Add stylePreprocessorOptions
		updateAngularJson(tree, project, angularJson);
	};
}
