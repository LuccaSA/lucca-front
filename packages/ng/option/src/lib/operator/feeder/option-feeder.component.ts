import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ALuOptionOperator, ILuOptionOperator } from '../option-operator.model';

@Component({
	selector: 'lu-option-feeder',
	template: '',
	styleUrls: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuOptionFeederComponent),
			multi: true,
		},
	],
})
export class LuOptionFeederComponent<T> implements ILuOptionOperator<T> {
	outOptions$ = new BehaviorSubject<T[]>([]);
	@Input() set options(options: T[]) {
		this.outOptions$.next(options);
	}
}
