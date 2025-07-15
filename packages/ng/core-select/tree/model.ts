export type TreeGroupingFn<T> = (value: T, array: T[]) => T | null;

export interface TreeNode<T> {
	value: T;
	children?: TreeNode<T>[];
}
