import { Tree } from '@angular-devkit/schematics';
import { createSourceFile, forEachChild, isIdentifier, ScriptTarget } from 'typescript';
import { createVisitor } from './angular-template';
import { applyUpdates, FileUpdate } from './file-update';
import { migrateFile } from './schematics';

export interface DeprecatedMappings {
	/**
	 * Mapping of deprecated NgModule names to their replacement standalone component/directive names.
	 * The identifier will be renamed everywhere it appears (import declarations, Angular imports array, etc.).
	 * The import path is kept unchanged.
	 * @example { "LuDateSelectInputModule": "LuDateSelectInputComponent" }
	 */
	modules: Record<string, string>;

	/**
	 * Mapping of deprecated type/interface names to their replacement names.
	 * The identifier will be renamed everywhere it appears (import declarations, type annotations, etc.).
	 * The import path is kept unchanged.
	 * @example { "ILuTranslation": "LuTranslation" }
	 */
	types: Record<string, string>;
}

export class DeprecatedMapper {
	private allIdentifierMappings: Record<string, string>;

	constructor(
		private tree: Tree,
		private mappings: DeprecatedMappings,
	) {
		this.allIdentifierMappings = { ...mappings.modules, ...mappings.types };
	}

	run() {
		this.tree.visit((path, entry) => {
			if (path.includes('node_modules') || !entry) {
				return;
			}

			if (path.endsWith('.ts') && !path.endsWith('.d.ts')) {
				migrateFile(path, entry, this.tree, (content) => this.migrateTsFile(path, content));
			}
		});
	}

	private migrateTsFile(fileName: string, content: string): string {
		const sourceFile = createSourceFile(fileName, content, ScriptTarget.ESNext);
		const updates: FileUpdate[] = [];

		forEachChild(
			sourceFile,
			createVisitor(isIdentifier, (node) => {
				const newName = this.allIdentifierMappings[node.text];

				if (newName !== undefined && newName !== node.text) {
					updates.push({
						position: node.getStart(sourceFile),
						oldContent: node.text,
						newContent: newName,
					});
				}
			}),
		);

		return applyUpdates(content, updates);
	}
}
