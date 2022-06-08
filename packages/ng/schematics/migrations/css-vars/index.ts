import { Rule, Tree } from '@angular-devkit/schematics';
import { migrateFile } from './migration';

export default (): Rule => {
	return (tree: Tree) => {
		tree.visit((path, entry) => {
			if (!path.endsWith('.scss') || path.includes('node_modules') || !entry) {
				return;
			}

			tree.overwrite(path, migrateFile(entry.content.toString()));
		});
	};
};
