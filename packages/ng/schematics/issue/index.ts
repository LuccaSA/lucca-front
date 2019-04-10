import { strings, join, Path } from '@angular-devkit/core';
import {
	Rule,
	SchematicContext,
	Tree,
	apply,
	url,
	template,
	move,
	chain,
	mergeWith,
	DirEntry,
} from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';
import { findModuleFromOptions, buildRelativePath } from '@schematics/angular/utility/find-module';
import { IExampleOptions } from './schema';
import { SourceFile, SyntaxKind, Node } from 'typescript';
import { Change, InsertChange, NoopChange } from '@schematics/angular/utility/change';
import { insertImport, findNodes } from '@schematics/angular/utility/ast-utils';

const FEATURE_EXT = '.feature.ts';

export default function example(options: IExampleOptions): Rule {
	return (tree: Tree, _context: SchematicContext) => {
		const workspace = getWorkspace(tree);
		options.name = strings.dasherize(options.name);
		if (!options.project) {
			options.project = workspace.defaultProject || Object.keys(workspace.projects)[0];
		}
		const project = workspace.projects[options.project];
		options.prefix = project.prefix;

		if (options.path === undefined) {
			const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
			options.path = `/${project.root}/src/${projectDirName}/issues`;
		}

		options.module = findModuleFromOptions(tree, options);

		const parsedPath = parseName(options.path, options.name);
		options.name = parsedPath.name;
		options.path = `${parsedPath.path}/${parsedPath.name}`;

		// const featurePath = findFeatureFromOptions(tree, options);

		const templateSource = apply(url('./files'), [
			template({
				...strings,
				...options,
			}),
			move(options.path),
		]);
		const rule = chain([
			mergeWith(templateSource),
			// addRoute(options),
		]);
		return rule(tree, _context);
	};
}
// function addRoute(options) {
// }

// -------------------------------------------------------------------------------------------------------------

// function findFeatureFromOptions(host: Tree, options: IExampleOptions) {
// 	const path = options.path;
// 	if (!path) { return; }
// 	let dir: DirEntry | null = host.getDir(path);
// 	while (dir) {
// 		const matches = dir.subfiles.filter(p => p.endsWith(FEATURE_EXT));
// 		if (matches.length === 1) {
// 			return join(dir.path, matches[0]);
// 		}
// 		dir = dir.parent;
// 	}
// }
// function addExampleToFeature(featurePath: Path | undefined, options: IExampleOptions) {
// 	return (host: Tree) => {
// 		if (!featurePath) { return host; }

// 		const source = readIntoSourceFile(host, featurePath);
// 		const examplePath = `/${options.path}/${strings.dasherize(options.name)}.example`;
// 		const relativePath = buildRelativePath(featurePath, examplePath);
// 		const exampleName = `${strings.classify(options.name)}Example`;
// 		const changes = addExample(source, featurePath, examplePath, exampleName, relativePath, options);
// 		const recorder = host.beginUpdate(featurePath);
// 		for (const change of changes) {
// 			if (change instanceof InsertChange) {
// 				recorder.insertLeft(change.pos, change.toAdd);
// 			}
// 		}
// 		host.commitUpdate(recorder);
// 		return host;
// 	};
// }
// function addExample(source: SourceFile, featurePath: string, examplePath: string, exampleName: string, relativePath: string, options: IExampleOptions): Change[] {
// 	const changes: Change[] = [];
// 	// insert import { xxxExample } from './xxx/xxx.example';
// 	const insertImportChange = insertImport(source, featurePath, exampleName, relativePath);
// 	changes.push(insertImportChange);

// 	// find node containing all examples
// 	const examplesNode = findExamplesNode(source);
// 	if (!!examplesNode) {
// 		const tsStatement = options.ts ? `\r\n\t\t\t\ttsCode: require('!!prismjs-loader?lang=typescript!./${strings.dasherize(options.name)}/${strings.dasherize(options.name)}.example.ts')` : '';
// 		const statement = `\t{
// 				title: '${options.name}',
// 				component: ${exampleName},
// 				code: require('!!prismjs-loader?lang=markup!./${strings.dasherize(options.name)}/${strings.dasherize(options.name)}.example.html'),${tsStatement}
// 			},\r\n\t\t`;
// 		const exampleChange = new InsertChange(featurePath, examplesNode.end - 1, statement);
// 		changes.push(exampleChange);
// 	}
// 	return changes;
// }
// function findExamplesNode(source: SourceFile): Node | null {
// 	const classNode = findNodes(source, SyntaxKind.ClassKeyword)[0];
// 	if (!classNode) { return null; }
// 	const infosNode = classNode.parent.getChildAt(5).getChildAt(0);
// 	const infosPropertiesNode = infosNode.getChildAt(4).getChildAt(1);
// 	const examplespropertyNode = infosPropertiesNode.getChildren().find(n => n.getText().startsWith('examples'));
// 	if (!examplespropertyNode) { return null; }
// 	const exampleListNode = examplespropertyNode.getChildAt(2);

// 	return exampleListNode;
// }
