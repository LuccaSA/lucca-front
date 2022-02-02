import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ALuOnScrollBottomSubscriber, ILuOnScrollBottomSubscriber, ILuTree } from '@lucca-front/ng/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ALuTreeOptionOperator, ILuTreeOptionOperator } from '../tree-option-operator.model';
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
export class LuTreeOptionPagerComponent<T>
	extends ALuTreeOptionOperator<T>
	implements ILuTreeOptionOperator<T>, ILuOnScrollBottomSubscriber
{
	outOptions$: Observable<ILuTree<T>[]>;
	set inOptions$(in$: Observable<ILuTree<T>[]>) {
		this.outOptions$ = combineLatest([in$, this.paging$]).pipe(
			map(([options, paging]) => {
				return this.trim(options, paging);
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
	trim(trees: ILuTree<T>[] = [], paging: number = MAGIC_STEP): ILuTree<T>[] {
		const flat = this.flatten(trees);
		const flatTrimmed = flat.slice(0, paging);

		return this.filter(trees, flatTrimmed);
	}
	flatten(trees: ILuTree<T>[] = []): T[] {
		return trees.map((t) => [t.value, ...this.flatten(t.children)]).reduce((a, v) => [...a, ...v], []);
	}
	filter(trees: ILuTree<T>[] = [], values: T[]): ILuTree<T>[] {
		return trees
			.map((t) => {
				if (!values.some((v) => v === t.value)) {
					return undefined;
				}
				return { ...t, children: this.filter(t.children, values) };
			})
			.filter((t) => !!t);
	}
}
