import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutPopoverComponent } from '@lucca-front/ng/callout';
import { LuOptionGroupDirective } from '@lucca-front/ng/core-select';
import { DateRange, DateRangeInputComponent } from '@lucca-front/ng/date2';
import {
	DialogComponent,
	DialogContentComponent,
	DialogDismissDirective,
	DialogFooterComponent,
	DialogHeaderComponent,
	injectDialogData,
	injectDialogRef,
	LuDialogService,
} from '@lucca-front/ng/dialog';
import { FormComponent } from '@lucca-front/ng/form';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { NumberInputComponent, TextareaInputComponent } from '@lucca-front/ng/forms';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { map, Observable } from 'rxjs';
import { GardenersDirective } from './gardeners.directive';
import { HarvestDiscardChangesComponent } from './harvest-discard-changes.component';
import { Gardener, Harvest, HarvestDraft, Plot, plots, Variety, varieties, varietyKind, varietyKindLabel } from './harvest-planning.data';

/** Data of the harvest form: the harvest to edit, `null` to plan a new one. */
export interface HarvestFormData {
	harvest: Harvest | null;
}

const normalize = (value: string): string =>
	value
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase();

const filterByName = <T extends { name: string }>(items: readonly T[], clue: string): T[] => {
	const normalizedClue = normalize(clue);
	return items.filter((item) => normalize(item.name).includes(normalizedClue));
};

/**
 * Create and edit form of a harvest, opened in a dialog. Dismissing it with unsaved changes asks
 * for a confirmation first, in a dialog stacked on top of it.
 */
@Component({
	selector: 'app-harvest-form',
	templateUrl: './harvest-form.component.html',
	imports: [
		ReactiveFormsModule,
		ButtonComponent,
		CalloutPopoverComponent,
		DialogComponent,
		DialogHeaderComponent,
		DialogContentComponent,
		DialogFooterComponent,
		DialogDismissDirective,
		FormComponent,
		FormFieldComponent,
		GridComponent,
		GridColumnComponent,
		LuSimpleSelectInputComponent,
		LuMultiSelectInputComponent,
		LuOptionGroupDirective,
		GardenersDirective,
		DateRangeInputComponent,
		NumberInputComponent,
		TextareaInputComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HarvestFormComponent {
	readonly dialogRef = injectDialogRef<HarvestDraft>();
	readonly #dialog = inject(LuDialogService);

	// Wrapped in an object: `injectDialogData<Harvest | null>()` loses its `null` (`null & ɵDialogDataFlag`
	// is `never`), so under strictNullChecks the create dialog could not be opened with `data: null`.
	// Public: `LuDialogData` reads the data type from the public members of the component only.
	readonly data = injectDialogData<HarvestFormData>();
	readonly harvest = this.data.harvest;

	// The submit button takes up the title, as Prisme recommends for a creation; an edit keeps a plain "Enregistrer"
	readonly title = this.harvest ? 'Modifier la récolte' : 'Planifier une récolte';
	readonly submitLabel = this.harvest ? 'Enregistrer' : 'Planifier la récolte';

	/** Half of the form grid from the XXS breakpoint up, so that two fields share a line */
	readonly halfWidth = { colspanAtMediaMinXXS: 2 };

	readonly form = new FormGroup({
		gardener: new FormControl<Gardener | null>(this.harvest?.gardener ?? null, Validators.required),
		plot: new FormControl<Plot | null>(this.harvest?.plot ?? null, Validators.required),
		varieties: new FormControl<Variety[]>(this.harvest?.varieties ?? [], { nonNullable: true, validators: Validators.required }),
		period: new FormControl<DateRange | null>(this.harvest?.period ?? null, Validators.required),
		quantity: new FormControl<number | null>(this.harvest?.quantity ?? null, [Validators.required, Validators.min(1)]),
		comment: new FormControl(this.harvest?.comment ?? '', { nonNullable: true }),
	});

	readonly plotClue = signal('');
	readonly plotOptions = computed(() => filterByName(plots, this.plotClue()));

	readonly varietyClue = signal('');
	readonly varietyOptions = computed(() => filterByName(varieties, this.varietyClue()));
	readonly varietyKind = varietyKind;
	readonly varietyKindLabel = varietyKindLabel;

	// Form controls are no signals: every event of the form (a new object each time, unlike its status)
	// makes the computed values below read the controls again
	readonly #formEvent = toSignal(this.form.events);

	readonly submitted = signal(false);
	readonly errorCount = computed(() => {
		this.#formEvent();
		return Object.values(this.form.controls).filter((control) => control.invalid).length;
	});
	readonly errorSummary = computed(() => {
		const count = this.errorCount();
		return count > 1 ? `Il vous reste ${count} erreurs à corriger.` : 'Il vous reste 1 erreur à corriger.';
	});
	readonly quantityError = computed(() => {
		this.#formEvent();
		return this.form.controls.quantity.hasError('min') ? 'La quantité doit être d’au moins 1 kg.' : 'Indiquez la quantité estimée.';
	});

	save(): void {
		if (this.form.invalid) {
			this.submitted.set(true);
			this.form.markAllAsTouched();
			return;
		}
		this.dialogRef.close(this.form.getRawValue() as HarvestDraft);
	}

	/** `canClose` of the dialog: a pristine form closes right away, unsaved changes need a confirmation. */
	confirmDismiss(): boolean | Observable<boolean> {
		if (this.form.pristine) {
			return true;
		}
		return this.#dialog.open({ content: HarvestDiscardChangesComponent, alert: true, size: 'S' }).closed$.pipe(map((discard) => discard === true));
	}
}
