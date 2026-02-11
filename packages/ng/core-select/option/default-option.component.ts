import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ILuOptionContext, LU_OPTION_CONTEXT } from './option.token';

@Component({
	selector: 'lu-simple-select-default-option',
	imports: [AsyncPipe],
	templateUrl: './default-option.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuSimpleSelectDefaultOptionComponent {
	public context = inject<ILuOptionContext<{ name?: string }>>(LU_OPTION_CONTEXT);
}
