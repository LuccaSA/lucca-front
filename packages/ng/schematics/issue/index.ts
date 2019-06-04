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
	SchematicsException,
} from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildRelativePath } from '@schematics/angular/utility/find-module';
import { IIssueOptions } from './schema';
import { SourceFile, SyntaxKind, Node, createSourceFile, ScriptTarget } from 'typescript';
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
			addRouteToRouter(routerPath, options),
		]);
		console.log(`new issue available at http://localhost:4200/${options.name}`);
		return rule(tree, _context);
	};
}

// =======================

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
function addRouteToRouter(routerPath: Path | undefined, options: IIssueOptions) {
	return (host: Tree) => {
		if (!routerPath) { return host; }

		const source = readIntoSourceFile(host, routerPath);
		const issuePath = `/${options.path}`;
		const relativePath = buildRelativePath(routerPath, issuePath);
		const issueModule = `${strings.classify(options.name)}Module`;
		const changes = addRoute(source, routerPath, options.name, issueModule, relativePath);
		const recorder = host.beginUpdate(routerPath);
		for (const change of changes) {
			if (change instanceof InsertChange) {
				recorder.insertLeft(change.pos, change.toAdd);
			}
		}
		host.commitUpdate(recorder);
		return host;
	};
}
function addRoute(source: SourceFile, routerPath: string, issueName: string, issueModule: string, relativePath: string): Change[] {
	const changes: Change[] = [];

	// find node containing all subpages
	const routesNode = findRoutesNode(source);
	if (!!routesNode) {
		const statement = `\t{ path: '${issueName}', loadChildren: () => import('./${issueName}').then(m => m.${issueModule}) },\r\n`;
		const routesChanges = new InsertChange(routerPath, routesNode.end - 1, statement);
		changes.push(routesChanges);
	}
	return changes;
}
function findRoutesNode(source: SourceFile): Node | null {
	const constNode = findNodes(source, SyntaxKind.ConstKeyword)[0];
	if (!constNode) { return null; }
	const routesNode = constNode.parent.getChildAt(1).getChildAt(0).getChildAt(4);

	return routesNode;
}

export function readIntoSourceFile(host: Tree, modulePath: string) {
	const text = host.read(modulePath);
	if (text === null) {
		throw new SchematicsException(`File ${modulePath} does not exist.`);
	}
	const sourceText = text.toString('utf-8');
	return createSourceFile(modulePath, sourceText, ScriptTarget.Latest, true);
}
