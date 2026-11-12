import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { intlInputOptions } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT } from '@lucca-front/ng/core-select';
import { LuEmployeeDisplayPipe } from '@lucca-front/ng/user';
import { LuCoreSelectPublicEmployee, LuCoreSelectPublicEmployeesDirective } from './public-employees.directive';
import { LuCoreSelectWithAdditionnalInformation } from './user-option.model';
import { LU_CORE_SELECT_USER_TRANSLATIONS } from './user.translate';

@Component({
	selector: 'lu-public-employee-option',
	imports: [AsyncPipe, LuEmployeeDisplayPipe],
	template: `
		@if (context.option$ | async; as employee) {
			@if (employeesDirective.isMeOption(employee, clue())) {
				<div>
					<strong>{{ intl().me }}</strong
					>&ngsp;
					<strong translate="no">{{ employee | luEmployeeDisplay: employeesDirective.displayFormat() }}</strong>
				</div>
			} @else {
				<div translate="no">{{ employee | luEmployeeDisplay: employeesDirective.displayFormat() }}</div>
			}
			@if (employee.additionalInformation) {
				<div class="option-additional">{{ employee.additionalInformation }}</div>
			}
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuPublicEmployeeOptionComponent {
	protected context = inject<ILuOptionContext<LuCoreSelectWithAdditionnalInformation<LuCoreSelectPublicEmployee>>>(LU_OPTION_CONTEXT);
	protected employeesDirective = inject(LuCoreSelectPublicEmployeesDirective);
	readonly intl = input(...intlInputOptions(LU_CORE_SELECT_USER_TRANSLATIONS));
	protected readonly clue = toSignal(this.employeesDirective.select.clue$, { initialValue: '' });
}

@Component({
	selector: 'lu-public-employee-displayer',
	imports: [AsyncPipe, LuEmployeeDisplayPipe],
	template: `
		@if (context.option$ | async; as employee) {
			<span translate="no">{{ employee | luEmployeeDisplay: employeesDirective.displayFormat() }}</span>
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuPublicEmployeeDisplayerComponent {
	protected context = inject<ILuOptionContext<LuCoreSelectPublicEmployee>>(LU_OPTION_CONTEXT);
	protected employeesDirective = inject(LuCoreSelectPublicEmployeesDirective);
}
