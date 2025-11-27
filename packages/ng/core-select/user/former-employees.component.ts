import { ChangeDetectionStrategy, Component, inject, InjectionToken, WritableSignal } from '@angular/core';
import { outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { ɵCoreSelectPanelElement } from '@lucca-front/ng/core-select';
import { LU_CORE_SELECT_USER_TRANSLATIONS } from './user.translate';

export interface FormerEmployeesContext {
	includeFormerEmployees: WritableSignal<boolean>;
}

export const FORMER_EMPLOYEES_CONTEXT = new InjectionToken<FormerEmployeesContext>('FormerEmployeesContext');

@Component({
	selector: 'lu-core-select-former-employees',
	styleUrl: './former-employees.component.scss',
	imports: [FormsModule],
	hostDirectives: [ɵCoreSelectPanelElement],
	template: `
		<div class="formerEmployeeDisplayer optionItem">
			<div class="optionItem-value" [class.is-selected]="context.includeFormerEmployees()" (click)="context.includeFormerEmployees.set(!context.includeFormerEmployees())">
				{{ intl.includeFormerEmployees }}
			</div>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
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
