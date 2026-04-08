import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { syncInputSignal } from '@lucca-front/ng/core';
import { BehaviorSubject } from 'rxjs';
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
	readonly outOptions$ = new BehaviorSubject<T[]>([]);

	readonly options = input<T[]>([]);

	constructor() {
		syncInputSignal(this.options, (options) => this.outOptions$.next(options));
	}
}
