import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { NumberFormatInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/NumberFormatField/Angular',
	decorators: [
		moduleMetadata({
			imports: [NumberFormatInputComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
		}),
	],
	argTypes: {
		tooltip: {
			type: 'string',
		},
		size: {
			options: ['M', 'S', 'XS'],
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
		formatStyle: {
			options: ['decimal', 'percent', 'currency'],
			control: {
				type: 'select',
			},
		},
		currencyCode: {
			options: ['EUR', 'USD', 'CNY', 'JPY'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Basic: StoryObj<NumberFormatInputComponent & { disabled: boolean } & FormFieldComponent> = {
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

	<lu-number-format-input
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="example">
	</lu-number-format-input>

</lu-form-field>

{{example}}`),
			moduleMetadata: {
				imports: [NumberFormatInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		hasClearer: true,
		disabled: false,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		size: 'M',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		formatStyle: 'decimal',
		currencyCode: 'EUR',
	},
};
