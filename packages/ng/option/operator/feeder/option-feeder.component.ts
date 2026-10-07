import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { ALuOptionOperator, ILuOptionOperator } from '../option-operator.model';

@Component({
	selector: 'lu-option-feeder',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuOptionFeederComponent),
			multi: true,
		},
	],
})
export class LuOptionFeederComponent<T> implements ILuOptionOperator<T> {
	/**
	 * Options fed to the picker, before the other operators (searcher, pager…) are applied.
	 */
	readonly options = input<T[]>([]);

	readonly outOptions$: Observable<T[]> = toObservable(this.options);
}
