import { Tree } from '@angular-devkit/schematics';
import { createSourceFile, forEachChild, isStringLiteral, ScriptTarget } from 'typescript';
import { createVisitor } from './angular-template';
import { applyUpdates, FileUpdate } from './file-update';
import { expand } from "./schematic.utils";
import { migrateFile } from './schematics';

interface Mappings {
	paths: Record<string, string>;
	components: Record<string, string>;
	selectors: Record<string, string>;
}

export class ComponentMapper {
	private mappings: Mappings = {
		paths: expand(this.rawMappings.paths, this.mappingProps),
		components: expand(this.rawMappings.components, this.mappingProps),
		selectors: expand(this.rawMappings.selectors, this.mappingProps)
	}
	private pathsToUpdate = new Set(Object.keys(this.mappings.paths));

	constructor(
			private tree: Tree,
			private rawMappings: Mappings,
			private mappingProps?: Record<string, Record<string, string>>
		) {
		}

		run() {
			this.tree.visit((path, entry) => {
				if (path.includes('node_modules') || !entry) {
					return;
				}
				if (path.endsWith('.ts')) {
					migrateFile(path, entry, this.tree, (content) => this.migrateTsFile(path, content));
				}
				else {
					return;
				}
			});
		}

		private migrateTsFile(fileName: string, content: string): string {
				const sourcefile = createSourceFile(fileName, content, ScriptTarget.ESNext);
				const updates: FileUpdate[] = [];

				forEachChild(
					sourcefile,
					createVisitor(isStringLiteral, (node) => {
						const newText = this.updatePathText(node.text);
						if (newText !== null &&  newText !== node.text) {
							const position = node.pos + node.getLeadingTriviaWidth(sourcefile) /* Spaces before the single/double quote */ + 1; /* Single or double quote before the string content */
							updates.push({
								position,
								oldContent: node.text,
								newContent: newText
							});
						}
					})
				);

				return applyUpdates(content, updates);
			}

			private updatePathText(text: string): string | null {
				return this.pathsToUpdate.has(text) ?  this.mappings.paths[text] || text : null;
			}
}
