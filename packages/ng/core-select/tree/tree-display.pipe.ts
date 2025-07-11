import { Pipe, PipeTransform } from '@angular/core';
import { TreeGroupingFn, TreeNode } from './model';

@Pipe({
	name: 'luTreeDisplay',
	pure: true,
})
export class TreeDisplayPipe<T> implements PipeTransform {
	transform(items: T[], groupingFn: TreeGroupingFn<T>): TreeNode<T>[] {
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
					parent = groupingFn(item, items);
					parentCache.set(item, parent);
				}
				const itemNode = {
					value: item,
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
