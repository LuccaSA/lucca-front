import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ILuTreeOptionOperator, ALuTreeOptionOperator } from '../tree-option-operator.model';
import { Observable, Subscription } from 'rxjs';
import { ILuTree } from '@lucca-front/ng/core';
@Component({
	selector: 'lu-tree-option-placeholder',
	templateUrl: './option-placeholder.component.html',
	styleUrls: ['./option-placeholder.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuTreeOptionOperator,
			useExisting: forwardRef(() => LuTreeOptionPlaceholderComponent),
			multi: true,
		},
	],
})
export class LuTreeOptionPlaceholderComponent<T = any> extends ALuTreeOptionOperator<T> implements ILuTreeOptionOperator<T>, OnDestroy {
	private _subs = new Subscription();
	set inOptions$(in$: Observable<ILuTree<T>[]>) {
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
