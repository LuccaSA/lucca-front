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
	render: ({ label, required, inlineMessage }) => {
		return {
			template: `<lu-form-field label='${label}' ${required ? 'required' : ''} inlineMessage='${inlineMessage}'>
<div class="textField">
	<div class="textField-input">
		<input
			luInput
			type='text'
			aria-labelledby='field1prefix field1label field1suffix'
			aria-describedby='field1message'
			placeholder='Placeholder'
		/>
	</div>
</div>
</lu-form-field>
<lu-form-field label='${label}' ${required ? 'required' : ''} inlineMessage='${inlineMessage}'>
	<span class='checkboxField'>
		<input type='checkbox' class='checkboxField-input' luInput aria-labelledby='CB1label' aria-describedby='CB1message' />
		<span class='checkboxField-icon' aria-hidden='true'><span class='checkboxField-icon-check'></span></span>
	</span>
</lu-form-field>`,
		};
	},
} as Meta;

export const Template: StoryObj<FormFieldComponent> = {
	args: {
		label: 'Label',
		required: true,
		inlineMessage: 'Helper Text',
	},
};
