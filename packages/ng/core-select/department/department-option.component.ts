import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT, ɵLuOptionComponent } from '@lucca-front/ng/core-select';
import { ILuDepartment } from '@lucca-front/ng/department';
import { LU_CORE_SELECT_DEPARTMENT_TRANSLATIONS } from './department.translate';
import { LuCoreSelectDepartmentsDirective } from './departments.directive';

@Component({
	selector: 'lu-department-option',
	imports: [AsyncPipe],
	template: `
		@if (context.option$ | async; as department) {
			@if (isInPanel && departmentsDirective?.isMyDepartmentOption(department)) {
				<strong>{{ intl().myDepartment }}</strong
				>&ngsp;<strong>{{ department.name }}</strong>
			} @else {
				<!-- Wrapped so the template indentation doesn't add spaces around the name, eg. before the comma of a multiple value -->
				<span>{{ department.name }}</span>
			}
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuDepartmentOptionComponent {
	protected context = inject<ILuOptionContext<ILuDepartment>>(LU_OPTION_CONTEXT);
	// Optional: a directive extending `LuCoreSelectDepartmentsDirective` is not provided under the base class
	protected departmentsDirective = inject(LuCoreSelectDepartmentsDirective, { optional: true });
	// The same template displays the selected value in the field, where "My department" must not be prefixed
	protected isInPanel = !!inject(ɵLuOptionComponent, { optional: true });

	readonly intl = input(...intlInputOptions(LU_CORE_SELECT_DEPARTMENT_TRANSLATIONS));
}
