import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { PhoneNumberInputComponent } from '@lucca-front/ng/forms/phone-number-input';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/PhoneNumberField/Angular',
	decorators: [
		moduleMetadata({
			imports: [PhoneNumberInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, StoryModelDisplayComponent],
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
	<lu-phone-number-input label="${label}" [country]="country" [(ngModel)]="example" #result="ngModel" ${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
@if(result.invalid && result.errors.validPhoneNumber){
  <div>{{result.errors.validPhoneNumber}}</div>
}
<pr-story-model-display>{{ example }}</pr-story-model-display>
`),
		};
	},
	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive le champ.',
		},
		label: {
			control: {
				type: 'text',
			},
			description: 'Modifie le label du champ.',
		},
		required: {
			control: {
				type: 'boolean',
			},
			description: 'Marque le champ comme obligatoire.',
		},
		size: {
			options: ['M', 'S'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du champ.',
		},
		hiddenLabel: {
			description: "Masque le label en le conservant dans le DOM pour les lecteurs d'écrans",
		},
		inlineMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
		},
		inlineMessageState: {
			options: ['default', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
			description: "Modifie l'état de l'inline message.",
		},
		errorInlineMessage: {
			description: "Ajoute un texte d'erreur sous le champ lorsque celui-ci est en erreur.",
		},
		autocomplete: {
			options: ['', 'off', 'tel'],
			control: {
				type: 'select',
			},
			description: 'Modifie le comportement autocomplete du champ.',
		},
		noAutoPlaceholder: {
			description: '[v19.2] Désactive le placeholder.',
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
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
