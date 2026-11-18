import { ChangeDetectionStrategy, Component, inject, InjectionToken, input, WritableSignal } from '@angular/core';
import { outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { intlInputOptions } from '@lucca-front/ng/core';
import { ɵCoreSelectPanelElement } from '@lucca-front/ng/core-select';
import { LU_CORE_SELECT_LEGAL_UNITS_TRANSLATIONS } from './legal-units.translate';

export interface ArchivedLegalUnitsContext {
	includeArchivedLegalUnits: WritableSignal<boolean>;
}

export const ARCHIVED_LEGAL_UNITS_CONTEXT = new InjectionToken<ArchivedLegalUnitsContext>('ArchivedLegalUnitsContext');

@Component({
	selector: 'lu-core-select-archived-legal-units',
	styleUrl: './archived-legal-units.component.scss',
	imports: [FormsModule],
	hostDirectives: [ɵCoreSelectPanelElement],
	template: `
		<!-- Rendered as a listbox option but not exposed as one: the checkbox is purely visual -->
		<div class="listboxOption mod-checkbox" [class.is-selected]="context.includeArchivedLegalUnits()">
			<div class="listboxOption-content" [class.is-hovered]="selectableItem.isHighlighted()" (mousedown)="onMouseDown($event)">
				<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
					<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				<span class="listboxOption-content-value">{{ intl().includeArchivedLegalUnits }}</span>
			</div>
		</div>
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
