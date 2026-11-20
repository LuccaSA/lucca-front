import { ChangeDetectionStrategy, Component, inject, InjectionToken, input, WritableSignal } from '@angular/core';
import { outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { intlInputOptions } from '@lucca-front/ng/core';
import { ɵCoreSelectPanelElement } from '@lucca-front/ng/core-select';
import { OptionComponent as ListboxOptionComponent } from '@lucca-front/ng/listbox';
import { LU_CORE_SELECT_LEGAL_UNITS_TRANSLATIONS } from './legal-units.translate';

export interface ArchivedLegalUnitsContext {
	includeArchivedLegalUnits: WritableSignal<boolean>;
}

export const ARCHIVED_LEGAL_UNITS_CONTEXT = new InjectionToken<ArchivedLegalUnitsContext>('ArchivedLegalUnitsContext');

@Component({
	selector: 'lu-core-select-archived-legal-units',
	styleUrl: './archived-legal-units.component.scss',
	imports: [FormsModule, ListboxOptionComponent],
	hostDirectives: [ɵCoreSelectPanelElement],
	template: `
		<lu-listbox-option checkbox [checked]="context.includeArchivedLegalUnits()" [hovered]="selectableItem.isHighlighted()" [elementId]="selectableItem.idAttribute()" (mousedown)="onMouseDown($event)">
			<span class="listboxOption-content-value">{{ intl().includeArchivedLegalUnits }}</span>
		</lu-listbox-option>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuCoreSelectArchivedLegalUnitsComponent {
	readonly intl = input(...intlInputOptions(LU_CORE_SELECT_LEGAL_UNITS_TRANSLATIONS));
	readonly context = inject(ARCHIVED_LEGAL_UNITS_CONTEXT);
	protected readonly selectableItem = inject(ɵCoreSelectPanelElement);

	constructor() {
		this.selectableItem.id.set('select-archived-legal-units');
		outputToObservable(this.selectableItem.selected)
			.pipe(takeUntilDestroyed())
			.subscribe(() => {
				this.context.includeArchivedLegalUnits.set(!this.context.includeArchivedLegalUnits());
			});
	}

	onMouseDown($event: MouseEvent): void {
		this.context.includeArchivedLegalUnits.set(!this.context.includeArchivedLegalUnits());
		$event.preventDefault();
		$event.stopPropagation();
	}
}
