import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ILuOptionItem } from '../../item/index';
import { ILuOptionOperator, ALuOptionOperator } from '../option-operator.model';
import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'lu-option-feeder',
	template: '',
	styleUrls: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuOptionFeederComponent),
			multi: true,
		},
	],
})
export class LuOptionFeederComponent<T = any> implements ILuOptionOperator<T> {
	outOptions$ = new Subject<ILuOptionItem<T>[]>();
	@Input() set options(options: ILuOptionItem<T>[]) {
		this.outOptions$.next(options);
	}
}
