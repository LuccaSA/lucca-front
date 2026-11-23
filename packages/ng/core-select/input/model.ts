export type TreeGroupingFn<T> = (value: T, array: T[]) => T | null;

export interface TreeNode<T> {
	node: T;
	children?: TreeNode<T>[];

	/**
	 * Whether the branch can be unfolded even though it holds no children yet, for a tree whose
	 * children are fetched when their parent is unfolded. Left out, a branch is foldable only
	 * once it actually has children.
	 */
	expandable?: boolean;

	/**
	 * Forces the branch open, whatever the user did with its chevron — a search unfolding the
	 * branches it matched inside. Left out, only the chevron decides.
	 */
	expanded?: boolean;
}
