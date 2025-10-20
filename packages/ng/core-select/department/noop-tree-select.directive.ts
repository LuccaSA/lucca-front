import { Directive, inject, input, linkedSignal } from '@angular/core';
import { ALuSelectInputComponent, TreeGenerator, TreeGroupingFn, TreeNode } from '@lucca-front/ng/core-select';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[noopTreeSelect],lu-multi-select[noopTreeSelect]',
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class NoopTreeSelectDirective<T extends TreeNode<any>, V> implements TreeGenerator<T, T> {
	#select = inject<ALuSelectInputComponent<T, V>>(ALuSelectInputComponent);

	groupingFnInput = input<TreeGroupingFn<T>>(() => null, { alias: 'noopTreeSelect' });

	groupingFn = linkedSignal(() => this.groupingFnInput());

	constructor() {
		this.#select.treeGenerator = this;
	}

	generateTrees(items: T[]): T[] {
		return items;
	}
}
