import { Component, computed, ElementRef, inject, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { LU_MULTI_SELECT_TRANSLATIONS } from '../../select.translate';
import { MULTI_SELECT_WITH_SELECT_ALL_CONTEXT } from './select-all.models';
import { LuMultiSelectInputComponent } from '../select-input.component';
import { KeyManagerElement } from '@lucca-front/ng/core-select';

@Component({
	selector: 'lu-multi-select-all-header',
	standalone: true,
	imports: [FormsModule, CheckboxInputComponent, FormFieldComponent],
	styleUrls: ['./multi-select-all-header.component.scss'],
	template: `
		<div class="multiSelectAllDisplayer" [class.highlighted]="highlighted()" [id]="id">
			<lu-form-field [label]="intl.selectAll">
				<lu-checkbox-input
					class="multiSelectAllDisplayer-checkbox"
					[ngModel]="isSelected()"
					(ngModelChange)="selectAllContext.setSelectAll($event)"
					[ngModelOptions]="{ standalone: true }"
					[mixed]="mixed()"
				/>
			</lu-form-field>
		</div>
	`,
})
export class LuMultiSelectAllHeaderComponent implements KeyManagerElement<unknown>, OnDestroy {
	readonly intl = getIntl(LU_MULTI_SELECT_TRANSLATIONS);
	readonly selectAllContext = inject(MULTI_SELECT_WITH_SELECT_ALL_CONTEXT);
	readonly mixed = computed(() => this.selectAllContext.mode() === 'exclude' || this.selectAllContext.mode() === 'include');
	readonly isSelected = computed(() => this.selectAllContext.mode() === 'all' || this.mixed());
	readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	readonly #select = inject<LuMultiSelectInputComponent<unknown>>(LuMultiSelectInputComponent);

	highlighted = signal(false);

	constructor() {
		this.#select.additionalElementsBefore.set([...this.#select.additionalElementsBefore(), this]);
	}

	ngOnDestroy(): void {
		this.#select.additionalElementsBefore.set(this.#select.additionalElementsBefore().filter((el) => el !== this));
	}

	id: string = 'multi-select-select-all';

	option = 'ɵSelectAll';

	toggleActive(): void {
		if (this.isSelected()) {
			this.selectAllContext.setSelectAll(false);
		} else {
			this.selectAllContext.setSelectAll(true);
		}
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

	getLabel(): string {
		return this.intl.selectAll;
	}
}
