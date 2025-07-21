import { Directive, inject, input, linkedSignal } from '@angular/core';
import { ALuSelectInputComponent } from '@lucca-front/ng/core-select';
import { TreeGroupingFn, TreeNode } from './model';
import { TreeGenerator } from './tree-generator';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[noopTreeSelect],lu-multi-select[noopTreeSelect]',
	standalone: true,
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class NoopTreeSelectDirective<T extends TreeNode<any>, V> implements TreeGenerator<T, T> {
	#select = inject<ALuSelectInputComponent<T, V>>(ALuSelectInputComponent);

	groupingFnInput = input.required<TreeGroupingFn<T>>({ alias: 'noopTreeSelect' });

	groupingFn = linkedSignal(() => this.groupingFnInput());

	constructor() {
		this.#select.treeGenerator = this;
	}

	generateTrees(items: T[]): T[] {
		return items;
	}
}
