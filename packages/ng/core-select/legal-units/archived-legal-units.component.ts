import { ChangeDetectionStrategy, Component, inject, InjectionToken, WritableSignal } from '@angular/core';
import { outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ɵCoreSelectPanelElement } from '@lucca-front/ng/core-select';

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
		<div class="archivedLegalUnitsDisplayer optionItem">
			<div class="optionItem-value" [class.is-selected]="context.includeArchivedLegalUnits()" (mousedown)="onMouseDown($event)">Inclure les unités légales archivées</div>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuCoreSelectArchivedLegalUnitsComponent {
	readonly context = inject(ARCHIVED_LEGAL_UNITS_CONTEXT);
	readonly #selectableItem = inject(ɵCoreSelectPanelElement);

	constructor() {
		this.#selectableItem.id.set('select-archived-legal-units');
		outputToObservable(this.#selectableItem.selected)
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
