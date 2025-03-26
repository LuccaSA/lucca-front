import { Component, InjectionToken, Signal, WritableSignal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { LuCoreSelectUserTranslations } from './user.translate';

export interface FormerEmployeesContext {
	includeFormerEmployees: WritableSignal<boolean>;
	intl: Signal<LuCoreSelectUserTranslations>;
}

export const FORMER_EMPLOYEES_CONTEXT = new InjectionToken<FormerEmployeesContext>('FormerEmployeesContext');

@Component({
	selector: 'lu-core-select-former-employees',
	styleUrl: './former-employees.component.scss',
	standalone: true,
	imports: [FormsModule, CheckboxInputComponent, FormFieldComponent],
	template: `
		<div class="formerEmployeeDisplayer">
			<lu-form-field [label]="context.intl().includeFormerEmployees">
				<lu-checkbox-input class="formerEmployeeDisplayer-checkbox" [(ngModel)]="context.includeFormerEmployees" [ngModelOptions]="{ standalone: true }" />
			</lu-form-field>
		</div>
	`,
})
export class LuCoreSelectFormerEmployeesComponent {
	readonly context = inject(FORMER_EMPLOYEES_CONTEXT);
}
