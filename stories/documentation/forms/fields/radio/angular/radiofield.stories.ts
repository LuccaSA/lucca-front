import { RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
	title: 'Documentation/Forms/Fields/RadioField/Angular',
	decorators: [
		moduleMetadata({
			imports: [RadioGroupInputComponent, RadioComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
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
			props: {
				example: false,
			},
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
	<lu-radio-group-input ${generateInputs(inputArgs, argTypes)}
	[(ngModel)]="example">
		<lu-radio [value]="1" inlineMessage="I am option 1">Option 1</lu-radio>
		<lu-radio [value]="2" inlineMessage="I am option 2">Option 2</lu-radio>
		<lu-radio [value]="3" inlineMessage="I am option 3 and I'm disabled" disabled>Option 3</lu-radio>
	</lu-radio-group-input>
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
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
	},
};
