import { Rule, Tree } from '@angular-devkit/schematics';

export default (): Rule => {
	return (tree: Tree) => {
		console.log(tree);
	};
};
