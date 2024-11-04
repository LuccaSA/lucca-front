import { Directive, forwardRef, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider } from '../select.model';

@Directive({
	// The attribute is already prefixed with "lu-simple-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[totalCount],lu-multi-select[totalCount]',
	standalone: true,
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectTotalCountDirective),
		},
	],
})
export class LuCoreSelectTotalCountDirective implements CoreSelectApiTotalCountProvider {
	totalCount = input.required<number>({ alias: 'totalCount' });

	totalCount$ = toObservable(this.totalCount);
}
