import { ChangeDetectionStrategy, Component, forwardRef, Input, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { ALuOptionSelector } from '../option-selector.model';
import { tap } from 'rxjs/operators';
import { ALuOptionOperator } from '../../operator/option-operator.model';
@Component({
	selector: 'lu-option-select-all',
	template: `lol`,
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
export class LuOptionSelectAllComponent<T = any> extends ALuOptionOperator<T> {
	@HostBinding('class.position-fixed') fixed = true;
	options;
	set inOptions$(in$: Observable<T[]>) {
		this.outOptions$ = in$.pipe(
			tap(options => this.options = options)
		);
	}
}
