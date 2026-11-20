import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
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
import { NumberInputComponent, TextareaInputComponent } from '@lucca-front/ng/forms';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { map, Observable } from 'rxjs';
import { GardenersDirective } from './gardeners.directive';
import { Gardener, Harvest, Plot, plots, Variety, varieties, varietyKind, varietyKindLabel } from './harvest-planning.data';

export type HarvestDraft = Omit<Harvest, 'id'>;

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
	selector: 'sb-harvest-form',
	template: `
		<lu-dialog>
			<form luForm focusInvalidOnSubmit [formGroup]="form" (ngSubmit)="save()">
				<lu-dialog-header>
					<h1>{{ harvest ? 'Modifier la récolte' : 'Planifier une récolte' }}</h1>
				</lu-dialog-header>

				<lu-dialog-content>
					<lu-form-field label="Jardinier ou jardinière" errorInlineMessage="Choisissez la personne responsable de la récolte.">
						<lu-simple-select gardeners formControlName="gardener" />
					</lu-form-field>

					<lu-form-field label="Parcelle" errorInlineMessage="Choisissez une parcelle.">
						<lu-simple-select formControlName="plot" [options]="plotOptions()" (clueChange)="plotClue.set($event)" />
					</lu-form-field>

					<lu-form-field label="Variétés" errorInlineMessage="Choisissez au moins une variété.">
						<lu-multi-select #varietySelect formControlName="varieties" [options]="varietyOptions()" (clueChange)="varietyClue.set($event)">
							<ng-container *luOptionGroup="let group; by: varietyKind; select: varietySelect">{{ varietyKindLabel(group.key) }}</ng-container>
						</lu-multi-select>
					</lu-form-field>

					<lu-form-field label="Période de récolte" errorInlineMessage="Indiquez la période de récolte.">
						<lu-date-range-input formControlName="period" />
					</lu-form-field>

					<lu-form-field label="Quantité estimée (kg)" errorInlineMessage="Indiquez une quantité d’au moins 1 kg.">
						<lu-number-input formControlName="quantity" />
					</lu-form-field>

					<lu-form-field label="Commentaire">
						<lu-textarea-input formControlName="comment" />
					</lu-form-field>
				</lu-dialog-content>

				<lu-dialog-footer>
					<div class="footer-actions">
						<button type="submit" luButton>Enregistrer</button>
						<button type="button" luButton="ghost" luDialogDismiss>Annuler</button>
					</div>
				</lu-dialog-footer>
			</form>
		</lu-dialog>
	`,
	imports: [
		ReactiveFormsModule,
		ButtonComponent,
		DialogComponent,
		DialogHeaderComponent,
		DialogContentComponent,
		DialogFooterComponent,
		DialogDismissDirective,
		FormComponent,
		FormFieldComponent,
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

	readonly harvest = injectDialogData<Harvest | null>();

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

	save(): void {
		if (this.form.invalid) {
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
		return this.#dialog.open({ content: DiscardChangesComponent, alert: true, size: 'S' }).closed$.pipe(map((discard) => discard === true));
	}
}

@Component({
	selector: 'sb-harvest-discard-changes',
	template: `
		<lu-dialog stacked>
			<lu-dialog-header>
				<h1>Abandonner les modifications ?</h1>
			</lu-dialog-header>
			<lu-dialog-content>Les informations saisies pour cette récolte seront perdues.</lu-dialog-content>
			<lu-dialog-footer>
				<div class="footer-actions">
					<button type="button" luButton critical (click)="dialogRef.close(true)">Abandonner</button>
					<!-- An alert can't be dismissed (luDialogDismiss does nothing in it): going back is a choice too -->
					<button type="button" luButton="ghost" (click)="dialogRef.close(false)">Continuer la saisie</button>
				</div>
			</lu-dialog-footer>
		</lu-dialog>
	`,
	imports: [ButtonComponent, DialogComponent, DialogHeaderComponent, DialogContentComponent, DialogFooterComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DiscardChangesComponent {
	readonly dialogRef = injectDialogRef<boolean>();
}
