
import { ChangeDetectorRef, Directive, forwardRef, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ALuTreeOptionOperator, ILuTreeOptionOperator } from '../tree-option-operator.model';
import { ILuTree } from '../../../tree.model';

export class LuForTreeOptionsContext<T> {
	constructor(
		public $implicit: ILuTree<T>,
		public index: number,
		public count: number,
	) {}

	get first(): boolean { return this.index === 0; }

	get last(): boolean { return this.index === this.count - 1; }

	get even(): boolean { return this.index % 2 === 0; }

	get odd(): boolean { return !this.even; }

	get node(): T { return this.$implicit.node; }

	get children(): ILuTree<T>[] { return this.$implicit.children; }
}

@Directive({
	selector: '[luForTreeOptions]',
	providers: [
		{
			provide: ALuTreeOptionOperator,
			useExisting: forwardRef(() => LuForTreeOptionsDirective),
			multi: true,
		},
	],
})
export class LuForTreeOptionsDirective<T> implements ILuTreeOptionOperator<T>, OnDestroy {

	protected _subs = new Subscription();
	set inOptions$(options$: Observable<ILuTree<T>[]>) {
		this._subs.add(
			options$.subscribe(options => this.render(options))
		);
	}

	constructor(
		protected _viewContainer: ViewContainerRef,
		protected _template: TemplateRef<LuForTreeOptionsContext<T>>,
		protected _changeDetectorRef: ChangeDetectorRef
	) {
	}

	public ngOnDestroy() {
		this._subs.unsubscribe();
	}

	public render(options: ILuTree<T>[]) {
		this._viewContainer.clear();
		const count = options.length;
		const views = [];
		options.forEach((option, index) => views
					.push(
						this._template.createEmbeddedView(
							new LuForTreeOptionsContext<T>(option, index, count))
					)
			);
		views.forEach(view => this._viewContainer.insert(view));
		this._changeDetectorRef.markForCheck();
	}
}
