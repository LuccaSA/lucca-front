import { TreeNode } from './model';

export interface TreeGenerator<T, R extends TreeNode<unknown>> {
	generateTrees(items: T[]): R[];

	/**
	 * Whether a branch folds its children behind a chevron, collapsed by default. Left out, the
	 * tree shows every level at once. Read by the panel, which snapshots the generator when it
	 * opens, so it cannot change while a panel is open.
	 */
	readonly collapsable?: boolean;

	/**
	 * Whether selecting a branch stands for everything it holds instead of selecting its children
	 * one by one. Set, a parent is published alone and keeps covering the children added to it
	 * later; left out, selecting a parent selects every descendant, which freezes the selection
	 * to the children known at that moment.
	 */
	readonly parentStandsForChildren?: boolean;
}
