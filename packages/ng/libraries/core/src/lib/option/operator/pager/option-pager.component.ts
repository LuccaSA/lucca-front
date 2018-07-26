import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ILuOptionOperator, ALuOptionOperator } from '../option-operator.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
const MAGIC_STEP = 5;
@Component({
	selector: 'lu-option-pager',
	template: '0 - {{paging$.value}} <button (click)="next()">next</button>',
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
export class LuOptionPagerComponent<T = any> extends ALuOptionOperator<T> implements ILuOptionOperator<T> {
	set inOptions$(in$: Observable<T[]>) {
		this.outOptions$ = combineLatest(
			in$,
			this.paging$,
			(options, paging) => {
				return (options || []).slice(0, paging);
			}
		);
	}
	paging$ = new BehaviorSubject<number>(MAGIC_STEP);
	next() {
		this.paging$.next(this.paging$.value + MAGIC_STEP);
	}
}
