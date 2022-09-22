import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ALuOptionOperator } from '../../operator/option-operator.model';
import { ALuOptionSelector, ILuOptionSelector } from '../option-selector.model';
import { LuOptionSelectAllIntl } from './select-all.intl';
import { LU_OPTION_SELECT_ALL_TRANSLATIONS } from './select-all.token';
import { ILuOptionSelectAllLabel, luOptionSelectAllTranslations } from './select-all.translate';

@Component({
	selector: 'lu-option-select-all',
	templateUrl: './select-all.component.html',
	styleUrls: ['select-all.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
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
		{
			provide: LU_OPTION_SELECT_ALL_TRANSLATIONS,
			useValue: luOptionSelectAllTranslations,
		},
		LuOptionSelectAllIntl,
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

	constructor(@Inject(LuOptionSelectAllIntl) public intl: ILuOptionSelectAllLabel) {
		super();
	}

	selectAll() {
		this.onSelectValue.next([...this.options]);
	}
	deselectAll() {
		this.onSelectValue.next([]);
	}
	setValue(values: T | T[]): void {
		this._values = values as T[];
	}
}
