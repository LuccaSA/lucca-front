export type TreeGroupingFn<T> = (value: T, array: T[]) => T | null;

export interface TreeNode<T> {
	node: T;
	children?: TreeNode<T>[];
	/**
	 * Internal: the node is displayed without its children, which it still selects (eg. the "My department" option).
	 */
	ɵcollapsed?: boolean;
}
