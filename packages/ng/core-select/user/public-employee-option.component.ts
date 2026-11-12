import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ILuOptionContext, LU_OPTION_CONTEXT } from '@lucca-front/ng/core-select';
import { LuEmployeeDisplayPipe } from '@lucca-front/ng/user';
import { LuCoreSelectPublicEmployee, LuCoreSelectPublicEmployeesDirective } from './public-employees.directive';

@Component({
	selector: 'lu-public-employee-option',
	imports: [AsyncPipe, LuEmployeeDisplayPipe],
	template: `
		@if (context.option$ | async; as employee) {
			<span translate="no">{{ employee | luEmployeeDisplay: employeesDirective.displayFormat() }}</span>
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuPublicEmployeeOptionComponent {
	protected context = inject<ILuOptionContext<LuCoreSelectPublicEmployee>>(LU_OPTION_CONTEXT);
	protected employeesDirective = inject(LuCoreSelectPublicEmployeesDirective);
}
