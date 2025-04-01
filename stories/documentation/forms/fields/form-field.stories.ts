import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from '../../../helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/Form Field',
	component: FormFieldComponent,
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, InputDirective, BrowserAnimationsModule, FormsModule],
		}),
	],
	argTypes: {
		width: {
			options: [null, 20, 30, 40, 50, 60],
			control: {
				type: 'select',
			},
		},
	},
	render: (args, { argTypes }) => {
		const { required, ...fieldArgs } = args;
		return {
			template: `<lu-form-field ${generateInputs(fieldArgs, argTypes)}>
	<div class="textField">
		<div class="textField-input">
			<textarea
				type="text"
				luInput
				class="textField-input-value"
				${required ? 'required' : ''}
				[(ngModel)]="example"
				placeholder="Placeholder">
			</textarea>
		</div>
	</div>
</lu-form-field>`,
		};
	},
} as Meta;

export const Template: StoryObj<FormFieldComponent & { required: boolean }> = {
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		inlineMessage: 'Helper text',
		errorInlineMessage: 'Error helper text',
		inlineMessageState: 'default',
		tooltip: 'You expected me to be helpful but this is a story!',
		invalid: false,
		counter: null,
		rolePresentationLabel: false,
		width: null,
	},
};
