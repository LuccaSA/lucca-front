import { Rule, Tree } from '@angular-devkit/schematics';
import { migrateAngularJsonFile, migrateHTMLFile, migrateScssFile } from './migration';

export default (): Rule => {
	return (tree: Tree) => {
		tree.visit((path, entry) => {
			if (path.includes('node_modules') || !entry) {
				return;
			}

			if (path.endsWith('angular.json')) {
				tree.overwrite(path, migrateAngularJsonFile(entry.content.toString()));
			}

			if (path.endsWith('.scss')) {
				tree.overwrite(path, migrateScssFile(entry.content.toString()));
			}

			if (path.endsWith('.html')) {
				tree.overwrite(path, migrateHTMLFile(entry.content.toString()));
			}
		});
	};
};
