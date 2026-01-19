import { ChangeDetectionStrategy, Component, forwardRef, HostBinding } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ALuOptionOperator } from '../../operator/option-operator.model';
import { ALuOptionSelector, ILuOptionSelector } from '../option-selector.model';
import { LU_OPTION_SELECT_ALL_TRANSLATIONS } from './select-all.translate';

/**
 * @deprecated
 */
@Component({
	selector: 'lu-option-select-all',
	templateUrl: './select-all.component.html',
	styleUrl: 'select-all.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuOptionSelectAllComponent),
			multi: true,
		},
		{
			provide: ALuOptionSelector,
			useExisting: forwardRef(() => LuOptionSelectAllComponent),
			multi: true,
		},
	],
})
export class LuOptionSelectAllComponent<T> extends ALuOptionOperator<T> implements ILuOptionSelector<T> {
	multiple = true;
	onSelectValue = new Subject<T | T[]>();
	private _values: T[];

	@HostBinding('class.position-fixed') fixed = true;
	options: T[];
	outOptions$: Observable<T[]>;
	set inOptions$(in$: Observable<T[]>) {
		this.outOptions$ = in$.pipe(tap((options) => (this.options = options)));
	}

	public intl = getIntl(LU_OPTION_SELECT_ALL_TRANSLATIONS);

	selectAll() {
		if (!this.options) {
			return;
		}
		this.onSelectValue.next([...this.options]);
	}
	deselectAll() {
		this.onSelectValue.next([]);
	}
	setValue(values: T | T[]): void {
		this._values = values as T[];
	}
}
