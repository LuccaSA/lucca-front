import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';

export default {
	title: 'Documentation/Forms/Form Field',
	component: FormFieldComponent,
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, InputDirective],
		}),
	],
	render: ({ label, required, inlineMessage, hiddenLabel, size, invalid }) => {
		return {
			template: `<lu-form-field label="${label}" ${required ? 'required' : ''} ${invalid ? 'invalid' : ''}  ${hiddenLabel ? 'hiddenLabel' : ''} inlineMessage="${inlineMessage}" size="${size}">
		<input luInput type="text" placeholder="Placeholder"/>
</lu-form-field>

<lu-form-field label="${label}" ${required ? 'required' : ''}  ${hiddenLabel ? 'hiddenLabel' : ''} inlineMessage="${inlineMessage}" mode="checkbox">
		<input type="checkbox" class="checkboxField-input" luInput/>
</lu-form-field>`,
		};
	},
} as Meta;

export const Template: StoryObj<FormFieldComponent> = {
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		invalid: false,
		inlineMessage: 'Helper Text',
		size: 'M',
	},
};
