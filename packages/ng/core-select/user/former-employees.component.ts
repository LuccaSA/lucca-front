import { Component, InjectionToken, WritableSignal, inject, signal, OnDestroy, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { LU_CORE_SELECT_USER_TRANSLATIONS } from './user.translate';
import { KeyManagerElement } from '../key-manager-element';
import { LuMultiSelectInputComponent } from '../../multi-select/input';
import { MULTI_SELECT_INPUT } from '../../multi-select/select.model';
import { LuSimpleSelectInputComponent } from '../../simple-select/input';
import { SIMPLE_SELECT_INPUT } from '../../simple-select/select.model';
import { ALuSelectInputComponent } from '../input';

export interface FormerEmployeesContext {
	includeFormerEmployees: WritableSignal<boolean>;
}

export const FORMER_EMPLOYEES_CONTEXT = new InjectionToken<FormerEmployeesContext>('FormerEmployeesContext');

@Component({
	selector: 'lu-core-select-former-employees',
	styleUrl: './former-employees.component.scss',
	standalone: true,
	imports: [FormsModule, CheckboxInputComponent, FormFieldComponent],
	template: `
		<div class="formerEmployeeDisplayer" [id]="id" [class.highlighted]="highlighted()">
			<lu-form-field [label]="intl.includeFormerEmployees">
				<lu-checkbox-input class="formerEmployeeDisplayer-checkbox" [(ngModel)]="context.includeFormerEmployees" [ngModelOptions]="{ standalone: true }" />
			</lu-form-field>
		</div>
	`,
})
export class LuCoreSelectFormerEmployeesComponent implements KeyManagerElement<unknown>, OnDestroy {
	readonly intl = getIntl(LU_CORE_SELECT_USER_TRANSLATIONS);
	readonly context = inject(FORMER_EMPLOYEES_CONTEXT);
	readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	#multiSelectInput = inject<LuMultiSelectInputComponent<unknown>>(MULTI_SELECT_INPUT, { optional: true });
	#simpleSelectInput = inject<LuSimpleSelectInputComponent<unknown>>(SIMPLE_SELECT_INPUT, { optional: true });

	#selectInput: ALuSelectInputComponent<unknown, unknown> = this.#multiSelectInput || this.#simpleSelectInput;

	highlighted = signal(false);

	id = 'select-former-employees';

	option = 'ɵFormerEmployees';

	constructor() {
		this.#selectInput.additionalElementsBefore.set([...this.#selectInput.additionalElementsBefore(), this]);
	}

	ngOnDestroy(): void {
		this.#selectInput.additionalElementsBefore.set(this.#selectInput.additionalElementsBefore().filter((el) => el !== this));
	}

	toggleActive(): void {
		this.context.includeFormerEmployees.set(!this.context.includeFormerEmployees());
	}

	setActiveStyles(): void {
		this.highlighted.set(true);

		setTimeout(() => {
			this.#elementRef.nativeElement.scrollIntoView();
		}, 50);
	}

	setInactiveStyles(): void {
		this.highlighted.set(false);
	}

	getLabel?(): string {
		return this.intl.includeFormerEmployees;
	}
}
