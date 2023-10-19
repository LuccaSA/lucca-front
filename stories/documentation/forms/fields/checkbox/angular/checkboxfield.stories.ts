import { CheckboxfieldComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

export default {
	title: 'Documentation/Forms/Fields/CheckboxField/Angular',
	component: CheckboxfieldComponent,
	decorators: [
		moduleMetadata({
			imports: [CheckboxfieldComponent, FormsModule, ReactiveFormsModule],
		}),
	],
} as Meta;

export const withNgModel: StoryObj<CheckboxfieldComponent> = {
	name: 'With NgModel',
	render: ({ label, required, hiddenLabel, inlineMessage, size, inlineMessageState }) => {
		return {
			props: {
				example: false,
			},
			template: `
<lu-checkboxfield label="${label}"
required="${required}"
${hiddenLabel ? 'hiddenLabel' : ''}
inlineMessage="${inlineMessage}"
inlineMessageState="${inlineMessageState}"
size="${size}"
[(ngModel)]="example">
</lu-checkboxfield>

{{example}}`,
			moduleMetadata: {
				imports: [CheckboxfieldComponent, FormsModule],
			},
		};
	},
	args: {
		label: 'Label',
		hiddenLabel: false,
		required: true,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		size: 'M',
	},
};
export const withReactiveForm: StoryObj<CheckboxfieldComponent> = {
	name: 'With ReactiveForm (and Validators.requiredTrue)',
	render: ({ label, required, hiddenLabel, inlineMessage, size, inlineMessageState }) => {
		return {
			props: {
				form: new FormGroup({
					example: new FormControl(false, [Validators.requiredTrue]),
				}),
			},
			template: `
<form [formGroup]="form">
	<lu-checkboxfield label="${label}"
	${hiddenLabel ? 'hiddenLabel' : ''}
	inlineMessage="${inlineMessage}"
	inlineMessageState="${inlineMessageState}"
	size="${size}"
	formControlName="example">
	</lu-checkboxfield>
</form>

{{form.value.example}}`,
			moduleMetadata: {
				imports: [CheckboxfieldComponent, ReactiveFormsModule],
			},
		};
	},
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		size: 'M',
	},
};
