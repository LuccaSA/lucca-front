import { Component, inject, InjectionToken, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { LU_CORE_SELECT_USER_TRANSLATIONS } from './user.translate';
import { outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ɵCoreSelectPanelElement } from '@lucca-front/ng/core-select';

export interface FormerEmployeesContext {
	includeFormerEmployees: WritableSignal<boolean>;
}

export const FORMER_EMPLOYEES_CONTEXT = new InjectionToken<FormerEmployeesContext>('FormerEmployeesContext');

@Component({
	selector: 'lu-core-select-former-employees',
	styleUrl: './former-employees.component.scss',
	standalone: true,
	imports: [FormsModule, CheckboxInputComponent, FormFieldComponent],
	hostDirectives: [ɵCoreSelectPanelElement],
	template: `
		<div class="formerEmployeeDisplayer">
			<lu-form-field [label]="intl.includeFormerEmployees">
				<lu-checkbox-input class="formerEmployeeDisplayer-checkbox" [(ngModel)]="context.includeFormerEmployees" [ngModelOptions]="{ standalone: true }" />
			</lu-form-field>
		</div>
	`,
})
export class LuCoreSelectFormerEmployeesComponent {
	readonly intl = getIntl(LU_CORE_SELECT_USER_TRANSLATIONS);
	readonly context = inject(FORMER_EMPLOYEES_CONTEXT);
	readonly #selectableItem = inject(ɵCoreSelectPanelElement);

	constructor() {
		this.#selectableItem.id.set('select-former-employees');
		outputToObservable(this.#selectableItem.selected)
			.pipe(takeUntilDestroyed())
			.subscribe(() => {
				this.context.includeFormerEmployees.set(!this.context.includeFormerEmployees());
			});
	}
}
