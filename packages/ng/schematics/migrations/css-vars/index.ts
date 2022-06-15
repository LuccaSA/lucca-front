import { Rule, Tree } from '@angular-devkit/schematics';
import { migrateAngularJsonFile, migrateFile } from './migration';

export default (): Rule => {
	return (tree: Tree) => {
		tree.visit((path, entry) => {
			if (!path.endsWith('.scss') || path.includes('node_modules') || !entry) {
				return;
			}

			if (path === 'angular.json') {
				tree.overwrite(path, migrateAngularJsonFile(entry.content.toString()));
			}

			tree.overwrite(path, migrateFile(entry.content.toString()));
		});
	};
};
