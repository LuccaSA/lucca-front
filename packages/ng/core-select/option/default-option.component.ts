import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ILuOptionContext, LU_OPTION_CONTEXT } from './option.token';

@Component({
	selector: 'lu-simple-select-default-option',
	imports: [AsyncPipe, NgIf],
	template: `<ng-container *ngIf="context.option$ | async as option">{{ option?.name ?? option }}</ng-container>`,
	host: { class: 'pr-u-ellipsis' },
})
export class LuSimpleSelectDefaultOptionComponent {
	public context = inject<ILuOptionContext<{ name?: string }>>(LU_OPTION_CONTEXT);
}
