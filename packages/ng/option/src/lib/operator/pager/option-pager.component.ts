import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ALuOnScrollBottomSubscriber, ILuOnScrollBottomSubscriber } from '@lucca-front/ng/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ALuOptionOperator, ILuOptionOperator } from '../option-operator.model';
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
export class LuOptionPagerComponent<T> extends ALuOptionOperator<T> implements ILuOptionOperator<T>, ILuOnScrollBottomSubscriber {
	outOptions$: Observable<T[]>;
	set inOptions$(in$: Observable<T[]>) {
		this.outOptions$ = combineLatest([in$, this.paging$]).pipe(
			map(([options, paging]) => {
				return (options || []).slice(0, paging);
			}),
		);
	}
	paging$ = new BehaviorSubject<number>(MAGIC_STEP);
	next() {
		this.paging$.next(this.paging$.value + MAGIC_STEP);
	}
	onScrollBottom() {
		this.next();
	}
}
