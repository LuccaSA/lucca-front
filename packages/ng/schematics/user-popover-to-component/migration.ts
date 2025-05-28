import { SourceFile } from 'typescript';
import { Tree } from '@angular-devkit/schematics';

const DIRECTIVE_CLASS_NAME = "LuUserPopoverDirective";
const COMPONENT_CLASS_NAME = "LuUserPopoverComponent";

export function migrateComponent(_sourceFile: SourceFile, path: string, tree: Tree): string {
	if (tree.readText(path).includes(DIRECTIVE_CLASS_NAME)){
		let update = tree.beginUpdate(path);
		let stringPosition = tree.readText(path).indexOf(DIRECTIVE_CLASS_NAME)
		while (stringPosition > -1) {
			update.remove(stringPosition, DIRECTIVE_CLASS_NAME.length);
			update.insertRight(stringPosition, COMPONENT_CLASS_NAME);
			stringPosition = tree.readText(path).indexOf(DIRECTIVE_CLASS_NAME);
			tree.commitUpdate(update);
			update = tree.beginUpdate(path);
		}
	}
	return tree.readText(path);
}
