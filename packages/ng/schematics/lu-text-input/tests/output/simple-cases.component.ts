import { Component } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<!--Missing label value-->
		<div class="form-group-line">
			<label class="textfield mod-short u-marginRightS">
				<input [(ngModel)]="example" class="textfield-input" type="text">
			</label>
		</div>
		<!-- Has everything for migration -->
		<lu-form-field [label]="labelTpl">
			<ng-template #labelTpl>{{ 'ROLE_HEADER_CREATION_NAME_LABEL' | translate }}</ng-template>
			<lu-text-input [placeholder]="'ROLE_HEADER_CREATION_NAME_LABEL' | translate" formControlName="name" />
		</lu-form-field>

		<!-- Has everything for migration but with ngModel -->
		<lu-form-field [label]="labelTpl">
			<ng-template #labelTpl>{{ 'ROLE_HEADER_CREATION_NAME_LABEL' | translate }}</ng-template>
			<lu-text-input [placeholder]="'ROLE_HEADER_CREATION_NAME_LABEL' | translate" [(ngModel)]="name" />
		</lu-form-field>

		<!-- Textarea, not handling for now -->
		<label class="textfield mod-multiline mod-block">
                        <textarea
	                        class="textfield-input textareaForm"
	                        [formControl]="assessmentLevelControl.controls.description"
                        ></textarea>
			<span class="textfield-label">
                          {{ i18nSettings.ASSESSMENT_LEVELS_DESCRIPTION_LABEL() }}
                        </span>
		</label>

		<lu-form-field [label]="labelTpl">
			<ng-template #labelTpl>Nom du fichier%%
                      <lu-icon icon="signHelp" size="XS" class="u-help pr-u-marginInlineStart100 pr-u-order1"
                      /></ng-template>
			<lu-text-input placeholder="Nom du fichier%%" />
		</lu-form-field>

		<lu-form-field [label]="labelTpl">
			<ng-template #labelTpl>Type de fichier%%</ng-template>
			<lu-text-input placeholder="Type de fichier%%" />
		</lu-form-field>
	`,
	imports: [
		FormsModule,
		ReactiveFormsModule, FormFieldComponent, TextInputComponent
	]
})
export class SimpleCasesComponent {
	example = '';
}
