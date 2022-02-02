import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ILuOnScrollBottomSubscriber, ALuOnScrollBottomSubscriber } from '@lucca-front/ng/core';
import { ILuOptionOperator, ALuOptionOperator } from '../option-operator.model';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
const MAGIC_STEP = 10;
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
		{
			provide: ALuOnScrollBottomSubscriber,
			useExisting: forwardRef(() => LuOptionPagerComponent),
			multi: true,
		},
	],
})
export class LuOptionPagerComponent<T = any> extends ALuOptionOperator<T> implements ILuOptionOperator<T>, ILuOnScrollBottomSubscriber {
	outOptions$: Observable<T[]>;
	set inOptions$(in$: Observable<T[]>) {
		this.outOptions$ = combineLatest(in$, this.paging$, (options, paging) => {
			return (options || []).slice(0, paging);
		});
	}
	paging$ = new BehaviorSubject<number>(MAGIC_STEP);
	next() {
		this.paging$.next(this.paging$.value + MAGIC_STEP);
	}
	onScrollBottom() {
		this.next();
	}
}
