
import { ChangeDetectorRef, Directive, forwardRef, OnDestroy, TemplateRef, ViewContainerRef, EmbeddedViewRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ALuTreeOptionOperator, ILuTreeOptionOperator } from '../tree-option-operator.model';
import { ILuTree } from '../../../tree.model';

export class LuForTreeOptionsContext<T> {
	constructor(
		public $implicit: ILuTree<T>,
		public index: number,
		public count: number,
		public _views: EmbeddedViewRef<LuForTreeOptionsContext<T>>[],
	) {}

	get first(): boolean { return this.index === 0; }

	get last(): boolean { return this.index === this.count - 1; }

	get even(): boolean { return this.index % 2 === 0; }

	get odd(): boolean { return !this.even; }

	get node(): T { return this.$implicit.value; }

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
		protected _vcr: ViewContainerRef,
		protected _template: TemplateRef<LuForTreeOptionsContext<T>>,
		protected _cdr: ChangeDetectorRef
	) {
	}

	public ngOnDestroy() {
		this._subs.unsubscribe();
	}

	public render(options: ILuTree<T>[], vcr = this._vcr) {
		vcr.clear();
		const count = options.length;
		options.forEach((option, index) => {
			vcr.createEmbeddedView(this._template, new LuForTreeOptionsContext<T>(option, index, count, []));
		});
		this._cdr.markForCheck();
	}
	public createView(option: ILuTree<T>, index: number, count: number) {
		const childrenViews = option.children ? option.children.map((c, i) => this.createView(c, i, option.children.length)) : [];
		const evr = this._template.createEmbeddedView(new LuForTreeOptionsContext<T>(option, index, count, childrenViews));
		return evr;
	}
}
