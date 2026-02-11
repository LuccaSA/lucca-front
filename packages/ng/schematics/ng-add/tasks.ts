import { Tree } from '@angular-devkit/schematics';
import { shameScss, stylesScss } from './file-content';

// custom to make TS happy
type AngularProject = { sourceRoot: string; architect: { build: { options: { stylePreprocessorOptions: { includePaths: string[] } } } } };
type AngularJsonSchema = { defaultProject?: string; projects: Record<string, AngularProject> };

const files = {
	globalStyles: 'styles.scss',
	shameStyles: 'scss/_shame.scss',
} as const;

export function getProject(angularJson: AngularJsonSchema): AngularProject {
	const { defaultProject, projects } = angularJson;

	const project = defaultProject ?? Object.keys(projects)[0];
	return projects[project];
}

export function getAngularJson(tree: Tree): AngularJsonSchema {
	return JSON.parse(tree.read('angular.json')?.toString() ?? '{}') as AngularJsonSchema;
}

export function updateStylesScss(tree: Tree, project: AngularProject) {
	const path = `${project.sourceRoot ?? 'src'}/${files.globalStyles}`;
	const existingLength = tree.read(path)?.toString().length ?? 0;
	const styleUpdateRecord = tree.beginUpdate(path).insertRight(existingLength, stylesScss);
	tree.commitUpdate(styleUpdateRecord);
}

export function updateAngularJson(tree: Tree, project: AngularProject, angularJson: AngularJsonSchema) {
	project.architect.build.options.stylePreprocessorOptions = {
		includePaths: ['src/scss', 'node_modules'],
	};

	tree.overwrite('angular.json', JSON.stringify(angularJson, undefined, '  ') + '\n');
}

export function createShameScss(tree: Tree, project: AngularProject) {
	const path = `${project.sourceRoot ?? 'src'}/${files.shameStyles}`;
	tree.create(path, shameScss);
}
