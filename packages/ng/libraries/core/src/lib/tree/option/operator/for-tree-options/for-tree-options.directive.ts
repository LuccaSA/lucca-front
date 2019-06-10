import { NgForOf, NgForOfContext } from '@angular/common';
import {
	ChangeDetectorRef,
	Directive,
	forwardRef,
	Input,
	IterableDiffers,
	OnDestroy,
	TemplateRef,
	TrackByFunction,
	ViewContainerRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ALuTreeOptionOperator, ILuTreeOptionOperator } from '../tree-option-operator.model';
import { ILuTree } from '../../../tree.model';

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
export class LuForTreeOptionsDirective<T> extends NgForOf<ILuTree<T>>
	implements ILuTreeOptionOperator<T>, OnDestroy {
	outOptions$;
	protected _subs = new Subscription();
	set inOptions$(options$: Observable<ILuTree<T>[]>) {
		this._subs.add(
			options$.subscribe(options => {
				this.ngForOf = options;
				this._changeDetectionRef.markForCheck();
			}),
		);
		this.outOptions$ = options$;
	}
	@Input()
	set luForOptionsTrackBy(fn: TrackByFunction<ILuTree<T>>) {
		this.ngForTrackBy = fn;
	}

	constructor(
		_viewContainer: ViewContainerRef,
		_template: TemplateRef<NgForOfContext<ILuTree<T>>>,
		_differs: IterableDiffers,
		protected _changeDetectionRef: ChangeDetectorRef,
	) {
		super(_viewContainer, _template, _differs);
	}

	ngOnDestroy() {
		this._subs.unsubscribe();
	}
}
