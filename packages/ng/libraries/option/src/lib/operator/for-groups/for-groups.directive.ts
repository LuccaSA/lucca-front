import { ChangeDetectorRef, Directive, forwardRef, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { ALuOptionOperator, ILuOptionOperator } from '../option-operator.model';
import { Observable, Subscription } from 'rxjs';
import { ILuGroup } from '@lucca-front/ng/core';


export class LuForGroupContext<T> {
	public constructor(
		public $implicit: T,
		public index: number,
		public count: number,
	) {}

	public get first(): boolean { return this.index === 0; }

	public get last(): boolean { return this.index === this.count - 1; }

	public get even(): boolean { return this.index % 2 === 0; }

	public get odd(): boolean { return !this.even; }
}

@Directive({
	selector: '[luForGroups]',
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuForGroupsDirective),
			multi: true,
		},
	],
})
export class LuForGroupsDirective<TItem = any, TKey = any> implements ILuOptionOperator<TItem>, OnDestroy {

	private _groupByFn: (item: TItem) => TKey;
	@Input('luForGroupGroupBy')
	public set attrGroupBy(fn: (item: TItem) => TKey) {
		this._groupByFn = fn;
	}

	protected _subs = new Subscription();
	public set inOptions$(options$: Observable<TItem[]>) {
		this._subs.add(
			options$.subscribe(options => this.render(options))
		);
	}

	public constructor(
		protected _vcr: ViewContainerRef,
		protected _cdr: ChangeDetectorRef,
		protected _templateRef: TemplateRef<LuForGroupContext<ILuGroup<TItem, TKey>>>,
	) {}

	public ngOnDestroy(): void {
		this._subs.unsubscribe();
	}

	public render(options: TItem[]): void {
		this._vcr.clear();
		const count = options.length;
		const groups = this.groupBy(options);
		const views = [];
		groups.forEach((group, index) => {
			const view = this._vcr.createEmbeddedView(this._templateRef, new LuForGroupContext<ILuGroup<TItem, TKey>>(group, index, count));
			views.push(view);
		});
		this._cdr.markForCheck();
	}

	private groupBy(items: TItem[]): ILuGroup<TItem, TKey>[] {
		const groups: ILuGroup<TItem, TKey>[] = [];
		items.forEach((item) => {
			const key = this._groupByFn(item);
			const group = groups.find(g => g.key === key) || { key: key, items: [] }
			group.items.push(item);
		});
		return groups;
	}
}