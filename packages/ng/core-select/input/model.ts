export type TreeGroupingFn<T> = (value: T, array: T[]) => T | null;

export interface TreeNode<T> {
	node: T;
	children?: TreeNode<T>[];
}
