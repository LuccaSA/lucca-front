import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ILuOptionContext, LU_OPTION_CONTEXT } from './option.token';

@Component({
	selector: 'lu-simple-select-default-option',
	standalone: true,
	imports: [AsyncPipe, NgIf],
	template: `<ng-container *ngIf="context.option$ | async as option">{{ option?.name ?? option }}</ng-container>`,
	host: { class: 'u-ellipsis' },
})
export class LuSimpleSelectDefaultOptionComponent {
	public context = inject<ILuOptionContext<{ name?: string }>>(LU_OPTION_CONTEXT);
}
