import { Component } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LuSelectInputComponent } from '../../../../select/input';
import { LuOptionPickerAdvancedComponent } from '../../../../option/picker';
import { LuOptionItemComponent } from '../../../../option/item';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<!--Should be migrated-->
		<div class="form-group-line">
			<label class="textfield mod-short u-marginRightS">
				<input [(ngModel)]="example" class="textfield-input" type="text">
			</label>
		</div>

		<label class="textfield pr-u-marginBottom300">
			<input
				formControlName="name"
				class="textfield-input"
				type="text"
				[placeholder]="'ROLE_HEADER_CREATION_NAME_LABEL' | translate"
				#nameInput
			/>
			<span class="textfield-label">{{ 'ROLE_HEADER_CREATION_NAME_LABEL' | translate }}</span>
		</label>

		<label class="textfield mod-multiline mod-block">
                        <textarea
	                        class="textfield-input textareaForm"
	                        [formControl]="assessmentLevelControl.controls.description"
                        ></textarea>
			<span class="textfield-label">
                          {{ i18nSettings.ASSESSMENT_LEVELS_DESCRIPTION_LABEL() }}
                        </span>
		</label>

		<label class="textfield palette-neutral mod-outlined mod-block">
			<input class="textfield-input" type="text" placeholder="Nom du fichier%%" aria-required="true" />
			<span class="textfield-label pr-u-displayFlex"
			>Nom du fichier%%
                      <lu-icon icon="signHelp" size="XS" class="u-help pr-u-marginInlineStart100 pr-u-order1"
                      /></span>
		</label>

		<label class="textfield palette-neutral mod-outlined mod-block">
			<input class="textfield-input" type="text" placeholder="Type de fichier%%" aria-required="true" />
			<span class="textfield-label">Type de fichier%%</span>
		</label>
	`,
	imports: [
		FormsModule,
		ReactiveFormsModule
	]
})
export class SimpleCasesComponent {
	example = '';
}
