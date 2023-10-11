import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import fs from 'fs';
import path from 'path';

export function createTreeFromFiles(testsRoot: string, files: string[], filePartFilter: string): Tree {
	const tree = new UnitTestTree(Tree.empty());
	const filteredFiles = files.filter((f) => f.includes(filePartFilter));

	for (const file of filteredFiles) {
		tree.create(file.replace(filePartFilter, '.'), fs.readFileSync(path.join(testsRoot, file)).toString().replace(/\r/g, ''));
	}

	return tree;
}

export async function runMigration(collectionPath: string, migrationName: string, migrationOptions: object, tree: Tree) {
	const schematicRunner = new SchematicTestRunner('migrations', collectionPath);
	await schematicRunner.runSchematic(migrationName, migrationOptions, tree);
}

export function expectTree(tree: Tree): { toMatchTree(expectedTree: Tree): void } {
	return {
		toMatchTree(expectedTree: Tree) {
			tree.visit((path, entry) => {
				if (!expectedTree.exists(path)) {
					throw new Error(`Expected tree does not contain file: ${path}`);
				}

				const actualContent = entry?.content.toString();
				const expectedContent = expectedTree.get(path)?.content.toString();

				try {
					expect(stripLastNewLine(actualContent)).toEqual(stripLastNewLine(expectedContent));
				} catch (error) {
					throw error instanceof Error ? new Error(`Expected file content to match for ${path}: \n${error.message}`) : error;
				}
			});

			// Ensure all files in expected tree exist in actual tree
			expectedTree.visit((path) => {
				if (!tree.exists(path)) {
					throw new Error(`Input tree does not contain file: ${path}`);
				}
			});
		},
	};
}

function stripLastNewLine(input: string | undefined): string | undefined {
	return input && input.endsWith('\n') ? input.slice(0, -1) : input;
}
