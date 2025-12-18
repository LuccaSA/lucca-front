import { Tree } from '@angular-devkit/schematics';
import { createSourceFile, forEachChild, isStringLiteral, ScriptTarget } from 'typescript';
import { createVisitor, extractNgTemplates } from './angular-template';
import { applyUpdates, FileUpdate } from './file-update';
import { updateComponentPathImports } from './html-ast';
import { expand } from "./schematic.utils";
import { migrateFile } from './schematics';

interface Mappings {
	paths: Record<string, string>;
}

export class PathMapper {
	private mappings: Mappings = {
		paths: expand(this.rawMappings.paths, this.mappingProps),
	}

	constructor(
			private tree: Tree,
			private rawMappings: Mappings,
			private mappingProps?: Record<string, Record<string, string>>
		) {
		}

		async run() {
			console.log(this.mappings.paths);
			this.tree.visit((path, entry) => {
						if (path.includes('node_modules') || !entry) {
							return;
						}
						if (path.endsWith('.ts')) {
							migrateFile(path, entry, this.tree, (content) => this.migrateTsFile(path, content));
						}
					});
		}
		private migrateTsFile(fileName: string, content: string): string {
				const sourcefile = createSourceFile(fileName, content, ScriptTarget.ESNext);
				const templates = extractNgTemplates(sourcefile);

				const updates: FileUpdate[] = templates.map((tpl) => ({
					position: tpl.offsetStart,
					oldContent: tpl.content,
					newContent: updateComponentPathImports(tpl.content, this.mappings.paths)
				}));

				forEachChild(
					sourcefile,
					createVisitor(isStringLiteral, (node) => {
						const newText = this.updateCssText(node.text);
						if (newText !== node.text) {
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

			private updateCssText(text: string): string {
				return text;
			}
}
