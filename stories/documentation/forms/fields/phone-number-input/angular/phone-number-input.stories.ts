import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { PhoneNumberInputComponent } from '@lucca-front/ng/forms/phone-number-input';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

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

export const Basic: StoryObj<PhoneNumberInputComponent & FormFieldComponent & { required: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, errorInlineMessage, size, ...inputArgs } = args;

		return {
			props: {
				example: '+12125550199',
				country: '',
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
	<lu-phone-number-input label="${label}" [country]="country" [(ngModel)]="example" #result="ngModel" ${generateInputs(inputArgs, argTypes)}></lu-phone-number-input>
</lu-form-field>
@if(result.invalid && result.errors.validPhoneNumber){
  <div>{{result.errors.validPhoneNumber}}</div>
}
<div>{{example}}</div>
`),
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
		autocomplete: {
			options: ['', 'off', 'tel'],
			control: {
				type: 'select',
			},
		},
		noAutoPlaceholder: {
			description: '[v19.2]',
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
		noAutoPlaceholder: false,
	},
};
