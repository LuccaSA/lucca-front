import { NgForOf, NgForOfContext } from '@angular/common';
import { ChangeDetectorRef, Directive, forwardRef, input, IterableDiffers, OnDestroy, TemplateRef, TrackByFunction, ViewContainerRef } from '@angular/core';
import { syncInputSignal } from '@lucca-front/ng/core';
import { Observable, Subscription } from 'rxjs';
import { ALuOptionOperator, ILuOptionOperator } from '../option-operator.model';

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
export class LuForOptionsDirective<T> extends NgForOf<T> implements ILuOptionOperator<T>, OnDestroy {
	outOptions$;
	protected _subs = new Subscription();
	set inOptions$(options$: Observable<T[]>) {
		this._subs.add(
			options$.subscribe((options) => {
				this.ngForOf = options;
				this._changeDetectionRef.markForCheck();
			}),
		);
		this.outOptions$ = options$;
	}

	readonly luForOptionsTrackBy = input<TrackByFunction<T>>();

	constructor(
		_viewContainer: ViewContainerRef,
		_template: TemplateRef<NgForOfContext<T>>,
		_differs: IterableDiffers,
		protected _changeDetectionRef: ChangeDetectorRef,
	) {
		super(_viewContainer, _template, _differs);

		syncInputSignal(this.luForOptionsTrackBy, (fn) => (this.ngForTrackBy = fn));
	}

	ngOnDestroy() {
		this._subs.unsubscribe();
	}
}
