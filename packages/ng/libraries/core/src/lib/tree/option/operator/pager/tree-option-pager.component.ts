import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ILuOnScrollBottomSubscriber, ALuOnScrollBottomSubscriber } from '../../../../option/index';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { ALuTreeOptionOperator, ILuTreeOptionOperator } from '../tree-option-operator.model';
import { ILuTree } from '../../../tree.model';
const MAGIC_STEP = 10;
@Component({
	selector: 'lu-tree-option-pager',
	template: '',
	styleUrls: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuTreeOptionOperator,
			useExisting: forwardRef(() => LuTreeOptionPagerComponent),
			multi: true,
		},
		{
			provide: ALuOnScrollBottomSubscriber,
			useExisting: forwardRef(() => LuTreeOptionPagerComponent),
			multi: true,
		},
	],
})
export class LuTreeOptionPagerComponent<T = any> extends ALuTreeOptionOperator<T> implements ILuTreeOptionOperator<T>, ILuOnScrollBottomSubscriber {
	set inOptions$(in$: Observable<ILuTree<T>[]>) {
		this.outOptions$ = combineLatest(
			in$,
			this.paging$,
			(options, paging) => {
				return this.trim(options, paging);
			}
		);
	}
	paging$ = new BehaviorSubject<number>(MAGIC_STEP);
	next() {
		this.paging$.next(this.paging$.value + MAGIC_STEP);
	}
	onScrollBottom() {
		this.next();
	}
	trim(trees: ILuTree<T>[] = [], paging: number = MAGIC_STEP): ILuTree<T>[] {
		return trees;
	}
}
