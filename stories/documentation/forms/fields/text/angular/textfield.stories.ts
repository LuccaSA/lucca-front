import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/TextField/Angular',
	decorators: [
		moduleMetadata({
			imports: [TextInputComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
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
		type: {
			options: ['text', 'number', 'password'],
			description: '[v17.2] Le type password ajoute automatiquement un bouton pour afficher la valeur du champ.',
			control: {
				type: 'select',
			},
		},
		counter: {
			description: '[v17.4]',
		},
	},
} as Meta;

export const Basic: StoryObj<TextInputComponent & { disabled: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { counter, label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, ...inputArgs } = args;
		return {
			template: cleanupTemplate(`<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					size,
					counter,
				},
				argTypes,
			)}>

	<lu-text-input
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="example">
	</lu-text-input>

</lu-form-field>

{{example}}`),
			moduleMetadata: {
				imports: [TextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		hasClearer: true,
		hasSearchIcon: false,
		searchIcon: 'search',
		disabled: false,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		size: 'M',
		type: 'text',
		placeholder: 'Placeholder',
		tooltip: "Je suis un message d'aide",
		counter: 0,
		valueAlignRight: false,
	},
};

export const PasswordVisiblity: StoryObj<TextInputComponent & { disabled: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { counter, label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, ...inputArgs } = args;
		return {
			template: `
<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					size,
					counter,
				},
				argTypes,
			)}>

	<lu-text-input ${generateInputs(inputArgs, argTypes)}
		type="password"
		[(ngModel)]="example">
	</lu-text-input>

</lu-form-field>

{{example}}`,
			moduleMetadata: {
				imports: [TextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		hasClearer: true,
		hasSearchIcon: false,
		searchIcon: 'search',
		disabled: false,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		size: 'M',
		placeholder: 'Placeholder',
		tooltip: "Je suis un message d'aide",
		counter: 0,
	},
};

export const WithPrefixAndSuffix: StoryObj<TextInputComponent & { disabled: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { counter, label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, prefix, suffix, ...inputArgs } = args;
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
					counter,
				},
				argTypes,
			)}>

	<lu-text-input
		${generateInputs(inputArgs, argTypes)}
		[prefix]="prefix"
		[suffix]="suffix"
		[(ngModel)]="example">
	</lu-text-input>

</lu-form-field>

{{example}}`),
			moduleMetadata: {
				imports: [TextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		size: 'M',
		label: 'Label',
		tooltip: 'Tooltip message',
		hiddenLabel: false,
		required: true,
		type: 'text',
		placeholder: 'Placeholder',
		disabled: false,
		hasClearer: false,
		hasSearchIcon: false,
		searchIcon: 'search',
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
		counter: 0,
	},
};
