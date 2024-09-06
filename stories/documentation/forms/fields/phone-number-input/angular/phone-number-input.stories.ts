import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { PhoneNumberInputComponent } from '@lucca-front/ng/forms/phone-number-input';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { LOCALE_ID } from '@angular/core';

export default {
	title: 'Documentation/Forms/Fields/PhoneNumberField/Angular',
	decorators: [
		moduleMetadata({
			imports: [PhoneNumberInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'en-US' }],
		}),
	],
} as Meta;

export const Basic: StoryObj<PhoneNumberInputComponent & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, errorInlineMessage, size, ...inputArgs } = args;
		return {
			props: {
				example: '+3466525',
			},
			template: cleanupTemplate(`<lu-form-field [rolePresentationLabel]="true" ${generateInputs(
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
	<lu-phone-number-input label="${label}" [(ngModel)]="example" ${generateInputs(inputArgs, argTypes)}></lu-phone-number-input>
</lu-form-field>

{{example}}`),
		};
	},
	argTypes: {
		size: {
			options: ['M', 'S'],
			control: {
				type: 'select',
			},
		},
		inlineMessageState: {
			options: ['default', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
		},
	},
	args: {
		label: 'Phone',
		tooltip: 'Tooltip message',
		hiddenLabel: false,
		required: true,
		inlineMessage: 'Helper message',
		errorInlineMessage: 'Invalid Phone Number',
		inlineMessageState: 'default',
		disabled: false,
	},
};
