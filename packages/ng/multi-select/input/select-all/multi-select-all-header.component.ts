import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { LU_MULTI_SELECT_TRANSLATIONS } from '../../select.translate';
import { MULTI_SELECT_WITH_SELECT_ALL_CONTEXT } from './select-all.models';

@Component({
	selector: 'lu-multi-select-all-header',
	standalone: true,
	imports: [FormsModule, CheckboxInputComponent, FormFieldComponent],
	styleUrls: ['./multi-select-all-header.component.scss'],
	template: `
		<div class="multiSelectAllDisplayer">
			<lu-form-field [label]="intl.selectAll">
				<lu-checkbox-input [(ngModel)]="selectAllContext.selectAll" [mixed]="mixed()" />
			</lu-form-field>
		</div>
	`,
})
export class LuMultiSelectAllHeaderComponent {
	readonly intl = getIntl(LU_MULTI_SELECT_TRANSLATIONS);
	readonly selectAllContext = inject(MULTI_SELECT_WITH_SELECT_ALL_CONTEXT);
	readonly mixed = computed(() => this.selectAllContext.mode() === 'exclude');
}
