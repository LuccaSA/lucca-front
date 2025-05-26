import { Component, inject, InjectionToken, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { LU_CORE_SELECT_USER_TRANSLATIONS } from './user.translate';

export interface FormerEmployeesContext {
	includeFormerEmployees: WritableSignal<boolean>;
}

export const FORMER_EMPLOYEES_CONTEXT = new InjectionToken<FormerEmployeesContext>('FormerEmployeesContext');

@Component({
	selector: 'lu-core-select-former-employees',
	styleUrl: './former-employees.component.scss',
	standalone: true,
	imports: [FormsModule],
	template: `
		<div class="formerEmployeeDisplayer optionItem">
			<div class="optionItem-value" [class.is-selected]="context.includeFormerEmployees()" (click)="context.includeFormerEmployees.set(!context.includeFormerEmployees())">
				{{ intl.includeFormerEmployees }}
			</div>
		</div>
	`,
})
export class LuCoreSelectFormerEmployeesComponent {
	readonly intl = getIntl(LU_CORE_SELECT_USER_TRANSLATIONS);
	readonly context = inject(FORMER_EMPLOYEES_CONTEXT);
}
