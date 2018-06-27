import { Injectable, SkipSelf, Optional } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
* To modify the labels and text displayed, create a new instance of LuSelectIntl and
* include it in a custom provider
*/
@Injectable()
export class LuSelectIntl {
	/**
	* Stream that emits whenever the labels here are changed. Use this to notify
	* components if the labels have changed after initialization.
	*/
	readonly changes: Subject<void> = new Subject<void>();
	/** A label for empty. */
	public selectAllLabel: string = 'Select all';
	public noLabel: string = 'No items';
	public allLabel: string = 'All';
	public allTypeLabel: string = 'the items';
	public typeLabel: string = 'items';

	setTrads(
		selectAllLabel: string = 'Select all',
		noLabel: string = 'No items',
		allLabel: string = 'All',
		allTypeLabel: string = 'the items',
		typeLabel: string = 'items',
	): this {
		this.selectAllLabel = selectAllLabel;
		this.noLabel = noLabel;
		this.allLabel = allLabel;
		this.allTypeLabel = allTypeLabel;
		this.typeLabel = typeLabel;
		return this;
	}
}

/** @docs-private */
export function LU_SELECT_INTL_PROVIDER_FACTORY(
	parentIntl: LuSelectIntl,
) {
	return parentIntl || new LuSelectIntl();
}

/** @docs-private */
export const LU_SELECT_INTL_PROVIDER = {
	// If there is already an MatPaginatorIntl available, use that. Otherwise, provide a new one.
	provide: LuSelectIntl,
	deps: [[new Optional(), new SkipSelf(), LuSelectIntl]],
	useFactory: LU_SELECT_INTL_PROVIDER_FACTORY,
};
