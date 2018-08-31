import {
	Directive,
	TemplateRef,
	ViewContainerRef,
	OnDestroy,
	forwardRef,
	ChangeDetectorRef,
} from '@angular/core';
import { ILuOptionOperator, ALuOptionOperator } from '../option-operator.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

export class LuForOptionsContext<T> {
	constructor(
		public $implicit: T,
		public index: number,
		public count: number,
	) {}

	get first(): boolean { return this.index === 0; }

	get last(): boolean { return this.index === this.count - 1; }

	get even(): boolean { return this.index % 2 === 0; }

	get odd(): boolean { return !this.even; }
}

@Directive({
	selector: '[luForOptions]',
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuForOptionsDirective),
			multi: true,
		},
	],
})
export class LuForOptionsDirective<T> implements ILuOptionOperator<T>, OnDestroy {
	protected _subs = new Subscription();
	set inOptions$(options$: Observable<T[]>) {
		this._subs.add(
			options$.subscribe(options => this.render(options))
		);
	}


	constructor(
			protected _viewContainer: ViewContainerRef,
			protected _template: TemplateRef<LuForOptionsContext<T>>,
			protected _changeDetectorRef: ChangeDetectorRef
	) {}


	ngOnDestroy() {
		this._subs.unsubscribe();
	}
	render(options: T[]) {
		this._viewContainer.clear();
		const count = options.length;
		const views = options.map((option, index) => this._template.createEmbeddedView(new LuForOptionsContext(option, index, count)));
		views.forEach(view => this._viewContainer.insert(view));
		this._changeDetectorRef.markForCheck();
	}
}
