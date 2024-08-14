import { PhoneNumberInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
	title: 'Documentation/Forms/Fields/PhoneNumberField/Angular',
	decorators: [
		moduleMetadata({
			imports: [PhoneNumberInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
		}),
	],
} as Meta;

export const Basic: StoryObj<PhoneNumberInputComponent & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, errorInlineMessage, size } = args;
		return {
			props: {
				example: '+3466525',
			},
			template: cleanupTemplate(`<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					errorInlineMessage,
					size,
				},
				argTypes,
			)}>
	<lu-phone-number-input [(ngModel)]="example"></lu-phone-number-input>
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
		errorInlineMessage: 'Invalid Phone Number',
		inlineMessageState: 'default',
	},
};
