import { NgForOf, NgForOfContext } from '@angular/common';
import { ChangeDetectorRef, Directive, forwardRef, Input, IterableDiffers, OnDestroy, TemplateRef, TrackByFunction, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ALuOptionOperator, ILuOptionOperator } from '../option-operator.model';

@Directive({
	selector: '[luForOptions]',
	standalone: true,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuForOptionsDirective),
			multi: true,
		},
	],
})
export class LuForOptionsDirective<T> extends NgForOf<T> implements ILuOptionOperator<T>, OnDestroy {
	outOptions$: Observable<T[]>;
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
	@Input()
	set luForOptionsTrackBy(fn: TrackByFunction<T>) {
		this.ngForTrackBy = fn;
	}

	constructor(_viewContainer: ViewContainerRef, _template: TemplateRef<NgForOfContext<T>>, _differs: IterableDiffers, protected _changeDetectionRef: ChangeDetectorRef) {
		super(_viewContainer, _template, _differs);
	}

	ngOnDestroy() {
		this._subs.unsubscribe();
	}
}
