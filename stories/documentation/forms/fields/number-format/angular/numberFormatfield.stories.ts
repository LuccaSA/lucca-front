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
		useAutoPrefixSuffix: {
			type: 'boolean',
			description: 'Affiche le préfixe ou suffixe (en fonction de la locale)',
		},
		min: {
			type: 'number',
		},
		max: {
			type: 'number',
		},
		formatStyle: {
			options: ['decimal', 'percent', 'currency', 'unit'],
			control: {
				type: 'select',
			},
			description: 'En <code>percent</code>, la valeur est comprise entre 0 et 1',
		},
		currency: {
			options: ['EUR', 'USD', 'CNY', 'JPY'],
			control: {
				type: 'select',
			},
			if: { arg: 'formatStyle', eq: 'currency' },
		},
		currencyDisplay: {
			options: ['code', 'symbol', 'narrowSymbol', 'name'],
			control: {
				type: 'select',
			},
			if: { arg: 'formatStyle', eq: 'currency' },
		},
		unit: {
			options: ['second', 'kilometer', 'kilogram'],
			control: {
				type: 'select',
			},
			if: { arg: 'formatStyle', eq: 'unit' },
		},
		unitDisplay: {
			options: ['short', 'narrow', 'long'],
			control: {
				type: 'select',
			},
			if: { arg: 'formatStyle', eq: 'unit' },
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
		hasClearer: false,
		disabled: false,
		inlineMessage: 'Seuls les nombres sont acceptés',
		inlineMessageState: 'default',
		size: 'M',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		formatStyle: 'decimal',
		currency: 'EUR',
		useAutoPrefixSuffix: true,
	},
};

export const WithCurrency: StoryObj<NumberFormatInputComponent & { disabled: boolean } & FormFieldComponent> = {
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
		hasClearer: false,
		disabled: false,
		inlineMessage: 'Seuls les nombres sont acceptés',
		inlineMessageState: 'default',
		size: 'M',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		formatStyle: 'currency',
		useAutoPrefixSuffix: true,
		currency: 'EUR',
		currencyDisplay: 'name',
	},
};

export const WithUnitKm: StoryObj<NumberFormatInputComponent & { disabled: boolean } & FormFieldComponent> = {
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
		hasClearer: false,
		disabled: false,
		inlineMessage: 'Seuls les nombres sont acceptés',
		inlineMessageState: 'default',
		size: 'M',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		formatStyle: 'unit',
		useAutoPrefixSuffix: true,
		unit: 'kilometer',
		unitDisplay: 'long',
	},
};

export const WithPercent: StoryObj<NumberFormatInputComponent & { disabled: boolean } & FormFieldComponent> = {
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
		hasClearer: false,
		disabled: false,
		inlineMessage: 'Seuls les nombres sont acceptés',
		inlineMessageState: 'default',
		size: 'M',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		formatStyle: 'percent',
		useAutoPrefixSuffix: true,
	},
};
