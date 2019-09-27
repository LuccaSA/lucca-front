import { ChangeDetectionStrategy, Component, forwardRef, HostBinding } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ALuOptionSelector, ILuOptionSelector } from '../option-selector.model';
import { tap } from 'rxjs/operators';
import { ALuOptionOperator } from '../../operator/option-operator.model';
@Component({
	selector: 'lu-option-select-all',
	templateUrl: './select-all.component.html',
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
export class LuOptionSelectAllComponent<T = any> extends ALuOptionOperator<T> implements ILuOptionSelector<T> {
	multiple = true;
	onSelectValue = new Subject<T | T[]>();

	@HostBinding('class.position-fixed') fixed = true;
	options;
	set inOptions$(in$: Observable<T[]>) {
		this.outOptions$ = in$.pipe(
			tap(options => this.options = options)
		);
	}
	selectAll() {
		this.onSelectValue.next([...this.options]);
	}
	setValue(values: T | T[]): void {
		
	}
}
