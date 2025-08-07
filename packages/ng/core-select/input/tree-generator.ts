import { TreeNode } from './model';

export interface TreeGenerator<T, R extends TreeNode<unknown>> {
	generateTrees(items: T[]): R[];
}
