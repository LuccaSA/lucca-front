import { Tree } from '@angular-devkit/schematics';
import { shameScss, stylesScss } from './file-content';

// custom to make TS happy
type AngularProject = { architect: { build: { options: { stylePreprocessorOptions: { includePaths: string[] } } } } };
type AngularJsonSchema = { defaultProject?: string; projects: Record<string, AngularProject> };

const files = {
	globalStyles: 'src/styles.scss',
	shameStyles: 'src/scss/_shame.scss',
} as const;

export function updateStylesScss(tree: Tree) {
	const existingLength = tree.read(files.globalStyles)?.toString().length ?? 0;
	const styleUpdateRecord = tree.beginUpdate(files.globalStyles).insertRight(existingLength, stylesScss);
	tree.commitUpdate(styleUpdateRecord);
}

export function updateAngularJson(tree: Tree) {
	const angularJson = JSON.parse(tree.read('angular.json')?.toString() ?? '{}') as AngularJsonSchema;
	const { defaultProject, projects } = angularJson;

	const project = defaultProject ?? Object.keys(projects)[0];
	projects[project].architect.build.options.stylePreprocessorOptions = {
		includePaths: ['src/scss', 'node_modules'],
	};

	tree.overwrite('angular.json', JSON.stringify(angularJson, undefined, '  ') + '\n');
}

export function createShameScss(tree: Tree) {
	tree.create(files.shameStyles, shameScss);
}
