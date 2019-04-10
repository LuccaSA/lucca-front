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
import { buildRelativePath } from '@schematics/angular/utility/find-module';
import { IIssueOptions } from './schema';
import { SourceFile, SyntaxKind, Node } from 'typescript';
import { Change, InsertChange, NoopChange } from '@schematics/angular/utility/change';
import { insertImport, findNodes } from '@schematics/angular/utility/ast-utils';


export default function factory(options: IIssueOptions): Rule {
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

		const parsedPath = parseName(options.path, options.name);
		options.name = parsedPath.name;
		options.path = `${parsedPath.path}/${parsedPath.name}`;

		const routerPath = findRouterFromOptions(tree, options);

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
function findRouterFromOptions(host: Tree, options: IIssueOptions) {
	const path = options.path;
	if (!path) { return; }
	let dir: DirEntry | null = host.getDir(path);
	while (dir) {
		const matches = dir.subfiles.filter(p => p === 'issues.router.ts');
		if (matches.length === 1) {
			return join(dir.path, matches[0]);
		}
		dir = dir.parent;
	}
}