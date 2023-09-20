import { TextfieldComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

export default {
	title: 'Documentation/Forms/Text Field',
	component: TextfieldComponent,
	decorators: [
		moduleMetadata({
			imports: [TextfieldComponent, FormsModule, ReactiveFormsModule],
		}),
	],
} as Meta;

export const withNgModel: StoryObj<TextfieldComponent> = {
	name: 'With NgModel',
	render: ({ label, required, hiddenLabel, inlineMessage, size, placeholder }) => {
		return {
			template: `
<lu-textfield label="${label}"
${required ? 'required' : ''}
${hiddenLabel ? 'hiddenLabel' : ''}
inlineMessage="${inlineMessage}"
size="${size}"
placeholder="${placeholder}"
[(ngModel)]="example">
</lu-textfield>

{{example}}`,
			moduleMetadata: {
				imports: [TextfieldComponent, FormsModule],
			},
		};
	},
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		inlineMessage: 'Helper Text',
		size: 'M',
		placeholder: 'Placeholder',
	},
};
export const withReactiveForm: StoryObj<TextfieldComponent> = {
	name: 'With ReactiveForm',
	render: ({ label, required, hiddenLabel, inlineMessage, size, placeholder }) => {
		return {
			props: {
				form: new FormGroup({
					example: new FormControl('', required ? [Validators.required] : []),
				}),
			},
			template: `
<form [formGroup]="form">
	<lu-textfield label="${label}" 
	${required ? 'required' : ''} 
	${hiddenLabel ? 'hiddenLabel' : ''} 
	inlineMessage="${inlineMessage}"
	size="${size}" 
	placeholder="${placeholder}"
	formControlName="example">
	</lu-textfield>
</form>

{{form.value.example}}`,
			moduleMetadata: {
				imports: [TextfieldComponent, ReactiveFormsModule],
			},
		};
	},
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		inlineMessage: 'Helper Text',
		size: 'M',
		placeholder: 'Placeholder',
	},
};
