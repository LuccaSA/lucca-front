import { ChangeDetectionStrategy, Component, inject, InjectionToken, input, WritableSignal } from '@angular/core';
import { outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { intlInputOptions } from '@lucca-front/ng/core';
import { ɵCoreSelectPanelElement } from '@lucca-front/ng/core-select';
import { OptionComponent as ListboxOptionComponent } from '@lucca-front/ng/listbox';
import { LU_CORE_SELECT_USER_TRANSLATIONS } from './user.translate';

export interface FormerEmployeesContext {
	includeFormerEmployees: WritableSignal<boolean>;
}

export const FORMER_EMPLOYEES_CONTEXT = new InjectionToken<FormerEmployeesContext>('FormerEmployeesContext');

@Component({
	selector: 'lu-core-select-former-employees',
	styleUrl: './former-employees.component.scss',
	imports: [FormsModule, ListboxOptionComponent],
	hostDirectives: [ɵCoreSelectPanelElement],
	template: `
		<lu-listbox-option checkbox [checked]="context.includeFormerEmployees()" [hovered]="selectableItem.isHighlighted()" [elementId]="selectableItem.idAttribute()" (mousedown)="onMouseDown($event)">
			<span class="listboxOption-content-value">{{ intl().includeFormerEmployees }}</span>
		</lu-listbox-option>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuCoreSelectFormerEmployeesComponent {
	readonly intl = input(...intlInputOptions(LU_CORE_SELECT_USER_TRANSLATIONS));
	readonly context = inject(FORMER_EMPLOYEES_CONTEXT);
	protected readonly selectableItem = inject(ɵCoreSelectPanelElement);

	constructor() {
		this.selectableItem.id.set('select-former-employees');
		outputToObservable(this.selectableItem.selected)
			.pipe(takeUntilDestroyed())
			.subscribe(() => {
				this.context.includeFormerEmployees.set(!this.context.includeFormerEmployees());
			});
	}

	onMouseDown($event: MouseEvent): void {
		this.context.includeFormerEmployees.set(!this.context.includeFormerEmployees());
		$event.preventDefault();
		$event.stopPropagation();
	}
}
