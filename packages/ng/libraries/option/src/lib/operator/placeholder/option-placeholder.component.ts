import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ILuOptionOperator, ALuOptionOperator } from '../option-operator.model';
import { Observable, Subscription } from 'rxjs';
@Component({
	selector: 'lu-option-placeholder',
	templateUrl: './option-placeholder.component.html',
	styleUrls: ['./option-placeholder.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuOptionPlaceholderComponent),
			multi: true,
		},
	],
})
export class LuOptionPlaceholderComponent<T = any> extends ALuOptionOperator<T> implements ILuOptionOperator<T>, OnDestroy {
	private _subs = new Subscription();
	set inOptions$(in$: Observable<T[]>) {
		this._resetSubs();
		this.outOptions$ = in$;
		this._subs.add(in$.subscribe(o => this._toggle(o)));
	}
	displayed = false;

	constructor(
		private _cdr: ChangeDetectorRef,
	) {
		super();
	}
	private _toggle(options: T[]) {
		if (!options || !options.length) {
			this.displayed = true;
		} else {
			this.displayed = false;
		}
		this._cdr.markForCheck();
	}

	private _resetSubs() {
		this._subs.unsubscribe();
		this._subs = new Subscription();
	}

	ngOnDestroy() {
		this._subs.unsubscribe();
	}

}
