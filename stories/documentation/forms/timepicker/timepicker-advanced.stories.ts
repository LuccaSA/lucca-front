import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { RadioGroupInputComponent } from '../../../../packages/ng/forms/radio-group-input/radio-group-input.component';
import { FormFieldComponent } from '../../../../packages/ng/form-field/form-field.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cleanupTemplate, generateInputs } from '../../../helpers/stories';
import { TimePickerComponent } from '../../../../packages/ng/time-picker/time-picker.component';

export default {
	title: 'Documentation/Forms/Timepicker/Angular Form',
	decorators: [
		moduleMetadata({
			imports: [TimePickerComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
		}),
	],
	argTypes: {
		size: {
			options: ['M', 'S'],
			control: {
				type: 'radio',
			},
		},
		inlineMessageState: {
			options: ['default', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Basic: StoryObj<RadioGroupInputComponent & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, ...inputArgs } = args;
		return {
			template: cleanupTemplate(`<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					size,
				},
				argTypes,
			)}>
	<lu-time-picker ${generateInputs(inputArgs, argTypes)}
	[(ngModel)]="example">
	</lu-time-picker>
</lu-form-field>

{{example}}`),
		};
	},
	args: {
		size: 'M',
		label: 'Label',
		tooltip: 'Tooltip message',
		hiddenLabel: false,
		required: true,
		inlineMessage: 'Helper message',
		inlineMessageState: 'default',
	},
};
