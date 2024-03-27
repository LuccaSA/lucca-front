import { NumberInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { FormFieldComponent } from '@lucca-front/ng/form-field';

export default {
	title: 'Documentation/Forms/Fields/NumberField/Angular',
	decorators: [
		moduleMetadata({
			imports: [NumberInputComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
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
	},
} as Meta;

export const Basic: StoryObj<NumberInputComponent & { disabled: boolean } & FormFieldComponent> = {
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

	<lu-number-input
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="example">
	</lu-number-input>

</lu-form-field>

{{example}}`),
			moduleMetadata: {
				imports: [NumberInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
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
		tooltip: "Je suis un message d'aide",
		step: 1,
		min: 0,
		max: 999,
		noSpinButtons: false,
	},
};

export const WithPrefixAndSuffix: StoryObj<NumberInputComponent & { disabled: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, prefix, suffix, ...inputArgs } = args;
		return {
			props: {
				prefix: args.prefix,
				suffix: args.suffix,
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

	<lu-number-input
		${generateInputs(inputArgs, argTypes)}
		[prefix]="prefix"
		[suffix]="suffix"
		[(ngModel)]="example">
	</lu-number-input>

</lu-form-field>

{{example}}`),
			moduleMetadata: {
				imports: [NumberInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		size: 'M',
		label: 'Label',
		tooltip: 'Tooltip message',
		hiddenLabel: false,
		required: true,
		placeholder: 'Placeholder',
		disabled: false,
		hasClearer: false,
		prefix: {
			icon: 'dollar',
			ariaLabel: 'Dollar',
		},
		suffix: {
			content: '€/j',
			ariaLabel: 'euros par jour',
		},
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		step: 1,
		min: 0,
		max: 999,
		noSpinButtons: false,
	},
};
