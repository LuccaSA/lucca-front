import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { LuSelectClearerComponent } from './select-clearer.component';

@Component({
	selector: 'lu-select-clearer-first',
	templateUrl: './select-clearer.component.html',
	styleUrls: ['./select-clearer.component.scss'],
	providers: [
		{
			provide: LuSelectClearerComponent,
			useExisting: forwardRef(() => LuSelectClearerFirstOrDefaultComponent),
		},
	],
})
/**
 * Component that manage the will preselect the first element when we clear the select
 */
export class LuSelectClearerFirstOrDefaultComponent<T>
	extends LuSelectClearerComponent<T>
	implements OnInit {
	/**
	 * The list of options (values) to use, we will select the first
	 */
	@Input() options: any[];

	private init = false;

	constructor() {
		super();
	}

	ngOnInit() {
		this.init = true;
	}

	clearValue(): T {
		if (!this.init) {
			return null;
		}
		if (!this.options || this.options.length === 0) {
			throw new Error(
				'Empty list for the select ! As it is not clearable, the list cannot be empty !',
			);
		}
		return this.options[0];
	}
}
