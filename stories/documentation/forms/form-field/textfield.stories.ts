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
	render: ({ label, required, hiddenLabel, inlineMessage, size, placeholder, prefix, suffix, inlineMessageState, hasClearer }) => {
		return {
			props: {
				prefix,
				suffix,
			},
			template: `
<lu-textfield label="${label}"
required="${required}"
${hiddenLabel ? 'hiddenLabel' : ''}
${hasClearer ? 'hasClearer' : ''}
[prefix]="prefix"
[suffix]="suffix"
inlineMessage="${inlineMessage}"
inlineMessageState="${inlineMessageState}"
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
		hasClearer: true,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		size: 'M',
		placeholder: 'Placeholder',
		prefix: {
			icon: 'dollar',
			ariaLabel: 'Dollar',
		},
		suffix: {
			content: '€/j',
			ariaLabel: 'euros par jour',
		},
	},
};
export const withReactiveForm: StoryObj<TextfieldComponent> = {
	name: 'With ReactiveForm',
	render: ({ label, required, hiddenLabel, inlineMessage, size, placeholder, prefix, suffix, inlineMessageState, hasClearer }) => {
		return {
			props: {
				form: new FormGroup({
					example: new FormControl('', required ? [Validators.required] : []),
				}),
				prefix,
				suffix,
			},
			template: `
<form [formGroup]="form">
	<lu-textfield label="${label}" 
	${hiddenLabel ? 'hiddenLabel' : ''} 
	${hasClearer ? 'hasClearer' : ''} 
	prefix="prefix"
	suffix="suffix"
	inlineMessage="${inlineMessage}"
	inlineMessageState="${inlineMessageState}"
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
		hasClearer: true,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		size: 'M',
		placeholder: 'Placeholder',
		prefix: {
			content: '$',
			ariaLabel: 'Dollar',
		},
		suffix: {
			content: '€/j',
			ariaLabel: 'euros par jour',
		},
	},
};
