import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ILuOptionItem } from '../../item/index';
import { ILuOptionOperator, ALuOptionOperator } from '../option-operator.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/operators/do';

@Component({
	selector: 'lu-option-pager',
	template: '',
	styleUrls: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuOptionPagerComponent),
			multi: true,
		},
	],
})
export class LuOptionPagerComponent<T = any> implements ILuOptionOperator<T> {
	set inOptions$(in$: Observable<ILuOptionItem<T>[]>) {
		// in$.do(options => this.outOptions$.next(options))
	}
	outOptions$: Observable<ILuOptionItem<T>[]> = new Subject<ILuOptionItem<T>[]>();
	// paging$ = new Subject<number>();

}
