import { Directive, inject, input, linkedSignal } from '@angular/core';
import { ALuSelectInputComponent, TreeGenerator, TreeGroupingFn, TreeNode } from '@lucca-front/ng/core-select';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[treeSelect],lu-multi-select[treeSelect]',
})
export class TreeSelectDirective<T, V> implements TreeGenerator<T, TreeNode<T>> {
	#select = inject<ALuSelectInputComponent<T, V>>(ALuSelectInputComponent);

	readonly groupingFnInput = input.required<TreeGroupingFn<T>>({ alias: 'treeSelect' });

	readonly groupingFn = linkedSignal(() => this.groupingFnInput());

	constructor() {
		this.#select.treeGenerator = this;
	}

	generateTrees(items: T[]): TreeNode<T>[] {
		const res: TreeNode<T>[] = [];
		// Keep a registry of what has been handled already
		const itemToNode = new Map<T, TreeNode<T>>();
		const parentCache = new Map<T, T | null>();
		// Items we are allowed to nest under, so a parent that is missing from `items` can be told
		// apart from one we simply haven't reached yet. Also deduplicates `items`.
		const knownItems = new Set(items);
		const getParent = (item: T): T | null => {
			if (!parentCache.has(item)) {
				parentCache.set(item, this.groupingFn()(item, items));
			}
			return parentCache.get(item) ?? null;
		};
		const createNode = (item: T): TreeNode<T> => {
			const itemNode: TreeNode<T> = {
				node: item,
				children: [],
			};
			itemToNode.set(item, itemNode);
			return itemNode;
		};
		const addRoot = (item: T): void => {
			res.push(createNode(item));
		};
		// Items whose parent node doesn't exist in the resultset yet
		let pending = [...knownItems];
		// While we haven't handled all the items
		while (pending.length) {
			const stillPending: T[] = [];
			for (const item of pending) {
				const parent = getParent(item);
				// Parent null or undefined means it's a root element, and so is an item whose parent
				// isn't part of `items`: filtered out by a search, it will never show up to nest under.
				if (!parent || !knownItems.has(parent)) {
					addRoot(item);
					continue;
				}
				const parentNode = itemToNode.get(parent);
				// If the parent is already in the resultset, we can add this
				if (parentNode) {
					parentNode.children?.push(createNode(item));
				} else {
					// Else, we fizzle till the next iteration
					stillPending.push(item);
				}
			}
			// A whole pass without progress means the remaining items form a parent cycle: they can
			// never be nested, so display them as roots rather than looping forever.
			if (stillPending.length === pending.length) {
				stillPending.forEach(addRoot);
				break;
			}
			pending = stillPending;
		}
		return res;
	}
}
