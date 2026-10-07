import { Directive, forwardRef, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider } from '../select.model';

@Directive({
	// The attribute is already prefixed with "lu-simple-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[totalCount],lu-multi-select[totalCount]',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectTotalCountDirective),
		},
	],
})
export class LuCoreSelectTotalCountDirective implements CoreSelectApiTotalCountProvider {
	/**
	 * Total number of available options, used by the select-all feature of `lu-multi-select` when options are not provided by an API directive
	 */
	readonly totalCount = input.required<number>({ alias: 'totalCount' });

	readonly totalCount$ = toObservable(this.totalCount);
}
