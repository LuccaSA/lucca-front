import { Directive, inject, input, OnInit } from '@angular/core';
import { ALuSelectInputComponent } from '@lucca-front/ng/core-select';
import { TreeGroupingFn } from './model';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[treeSelect],lu-multi-select[treeSelect]',
	standalone: true,
})
export class TreeSelectDirective<T, V> implements OnInit {
	#select = inject<ALuSelectInputComponent<T, V>>(ALuSelectInputComponent);

	groupingFn = input.required<TreeGroupingFn<T>>({ alias: 'treeSelect' });

	ngOnInit(): void {
		this.#select.tree = this;
	}
}
