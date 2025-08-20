import { Directive, inject, input, linkedSignal } from '@angular/core';
import { ALuSelectInputComponent, TreeGenerator, TreeGroupingFn, TreeNode } from '@lucca-front/ng/core-select';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[treeSelect],lu-multi-select[treeSelect]',
	standalone: true,
})
export class TreeSelectDirective<T, V> implements TreeGenerator<T, TreeNode<T>> {
	#select = inject<ALuSelectInputComponent<T, V>>(ALuSelectInputComponent);

	groupingFnInput = input.required<TreeGroupingFn<T>>({ alias: 'treeSelect' });

	groupingFn = linkedSignal(() => this.groupingFnInput());

	constructor() {
		this.#select.treeGenerator = this;
	}

	generateTrees(items: T[]): TreeNode<T>[] {
		const res: TreeNode<T>[] = [];
		// Keep a registry of what has been handled already
		const itemToNode = new Map<T, TreeNode<T>>();
		const parentCache = new Map<T, T | null>();
		const handled: T[] = [];
		// While we haven't handled all the items
		while (items.length > handled.length) {
			for (const item of items) {
				if (itemToNode.has(item)) {
					// item already in resultset
					continue;
				}
				let parent: T | null;
				if (parentCache.has(item)) {
					parent = parentCache.get(item);
				} else {
					parent = this.groupingFn()(item, items);
					parentCache.set(item, parent);
				}
				const itemNode: TreeNode<T> = {
					node: item,
					children: [],
				};
				// Parent null means it's a root element
				if (parent === null) {
					res.push(itemNode);
					itemToNode.set(item, itemNode);
					handled.push(item);
				} else {
					// If the parent is already in the resultset, we can add this
					if (itemToNode.has(parent)) {
						itemToNode.get(parent).children.push(itemNode);
						itemToNode.set(item, itemNode);
						handled.push(item);
					}
					// Else, we fizzle till the next iteration
				}
			}
		}
		return res;
	}
}
