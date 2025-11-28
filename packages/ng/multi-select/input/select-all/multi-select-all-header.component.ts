import { Component, computed, effect, ElementRef, inject } from '@angular/core';
import { outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { getIntl, IntlParamsPipe } from '@lucca-front/ng/core';
import { ɵCoreSelectPanelElement } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { LU_MULTI_SELECT_TRANSLATIONS } from '../../select.translate';
import { MULTI_SELECT_WITH_SELECT_ALL_CONTEXT } from './select-all.models';

@Component({
	selector: 'lu-multi-select-all-header',
	imports: [FormsModule, CheckboxInputComponent, FormFieldComponent, IntlParamsPipe],
	hostDirectives: [ɵCoreSelectPanelElement],
	styleUrl: './multi-select-all-header.component.scss',
	template: `
		@if (optionsCount()) {
			<div class="multiSelectAllDisplayer">
				<lu-form-field [label]="canSelectAll() ? intl.selectAll : (intl.selectCountOptions | intlParams: { optionsCount: optionsCount() })">
					<lu-checkbox-input
						class="multiSelectAllDisplayer-checkbox"
						[ngModel]="isSelected()"
						(ngModelChange)="selectAllContext.setSelectAll($event)"
						[ngModelOptions]="{ standalone: true }"
						[mixed]="mixed()"
					/>
				</lu-form-field>
			</div>
		}
	`,
})
export class LuMultiSelectAllHeaderComponent {
	readonly intl = getIntl(LU_MULTI_SELECT_TRANSLATIONS);
	readonly selectAllContext = inject(MULTI_SELECT_WITH_SELECT_ALL_CONTEXT);
	readonly mixed = computed(() => this.selectAllContext.mode() === 'exclude' || this.selectAllContext.mode() === 'include');
	readonly isSelected = computed(() => this.selectAllContext.mode() === 'all' || this.mixed());
	readonly canSelectAll = computed(() => this.selectAllContext.totalCount() === this.selectAllContext.optionsCount());
	readonly optionsCount = computed(() => this.selectAllContext.optionsCount());
	readonly #selectableItem = inject(ɵCoreSelectPanelElement);
	readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	constructor() {
		this.#selectableItem.id.set(`multi-select-select-all`);
		effect(() => {
			if (this.#selectableItem.isHighlighted()) {
				setTimeout(() => {
					this.#elementRef.nativeElement.scrollIntoView();
				}, 50);
			}
			if (this.isSelected()) {
				this.#selectableItem.isSelected.set(true);
			}
		});
		outputToObservable(this.#selectableItem.selected)
			.pipe(takeUntilDestroyed())
			.subscribe(() => {
				this.selectAllContext.setSelectAll(!this.isSelected());
			});
	}
}
