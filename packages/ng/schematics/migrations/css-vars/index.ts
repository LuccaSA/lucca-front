import { Rule, Tree } from '@angular-devkit/schematics';

export default (): Rule => {
	return (tree: Tree) => {
		// eslint-disable-next-line no-console
		console.log(tree);
	};
};
