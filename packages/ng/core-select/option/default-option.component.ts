import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ILuOptionContext, LU_OPTION_CONTEXT } from './option.token';

@Component({
	selector: 'lu-simple-select-default-option',
	standalone: true,
	imports: [AsyncPipe],
	template: `@if (context.option$ | async; as option) {
		{{ option?.name ?? option }}
	}`,
	host: { class: 'pr-u-ellipsis' },
})
export class LuSimpleSelectDefaultOptionComponent {
	public context = inject<ILuOptionContext<{ name?: string }>>(LU_OPTION_CONTEXT);
}
