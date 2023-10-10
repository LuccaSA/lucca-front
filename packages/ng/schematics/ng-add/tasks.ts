import { Tree } from '@angular-devkit/schematics';
import { shameScss, stylesScss } from './file-content';

// custom to make TS happy
type AngularProject = { architect: { build: { options: { stylePreprocessorOptions: { includePaths: readonly string[] } } } } };
type AngularJsonSchema = { defaultProject: string; projects: Record<string, AngularProject> };

const files = {
	globalStyles: 'src/styles.scss',
	shameStyles: 'src/scss/_shame.scss',
	palettesOverride: 'src/scss/overrides/_palettes.override.scss',
} as const;

export function updateStylesScss(tree: Tree) {
	const existingLength = tree.read(files.globalStyles)?.toString().length ?? 0;
	const styleUpdateRecord = tree.beginUpdate(files.globalStyles).insertRight(existingLength, stylesScss);
	tree.commitUpdate(styleUpdateRecord);
}

export function updateAngularJson(tree: Tree) {
	const angularJson = JSON.parse(tree.read('angular.json')?.toString() ?? '{}') as AngularJsonSchema;
	const { defaultProject, projects } = angularJson;
	projects[defaultProject].architect.build.options.stylePreprocessorOptions = {
		includePaths: ['src/scss/overrides', 'src/scss', 'node_modules/@lucca-front/ng/src'],
	};

	tree.overwrite('angular.json', JSON.stringify(angularJson, undefined, '  ') + '\n');
}

export function createPalettesOverrideScss(tree: Tree) {
	tree.create(files.palettesOverride, tree.read('node_modules/@lucca-front/scss/src/theming/_palettes.scss') ?? '');
}

export function createShameScss(tree: Tree) {
	tree.create(files.shameStyles, shameScss);
}
