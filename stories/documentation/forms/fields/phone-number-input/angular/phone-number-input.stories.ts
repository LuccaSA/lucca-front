import { cleanupTemplate, generateInputs, setStoryOptions, useStoryModel } from '@/helpers/stories';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { CountryCode, PHONE_NUMBER_INPUT_AUTOCOMPLETE, PhoneNumberInputComponent } from '@lucca-front/ng/forms/phone-number-input';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

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

export const Basic: StoryObj<PhoneNumberInputComponent & FormFieldComponent & { required: boolean; presentation: boolean; country: CountryCode | '' }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, errorInlineMessage, size, presentation, allowedCountries, countryChange, ...inputArgs } = args;
		const model = useStoryModel('+12125550199');

		return {
			props: {
				model,
				allowedCountries,
				onCountryChange: (country: CountryCode) => countryChange?.(country),
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
					presentation,
				},
				argTypes,
			)}>
	<lu-phone-number-input label="${label}"${allowedCountries?.length ? ' [allowedCountries]="allowedCountries"' : ''} [(ngModel)]="model.example" (countryChange)="onCountryChange($event)" #result="ngModel" ${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
@if(result.invalid && result.errors.validPhoneNumber){
  <div>{{result.errors.validPhoneNumber}}</div>
}
<pr-story-model-display>{{ model.example }}</pr-story-model-display>
`),
		};
	},
	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive le champ.',
			table: { category: 'inputs (ngModel)' },
		},
		label: {
			control: {
				type: 'text',
			},
			description: 'Modifie le label du champ. Également transmis à l’input <code>label</code> de <code>lu-phone-number-input</code>, qui en a besoin pour l’accessibilité de ses contrôles internes.',
			table: { category: 'inputs (form-field)' },
		},
		required: {
			control: {
				type: 'boolean',
			},
			description: 'Marque le champ comme obligatoire.',
			table: { category: 'inputs (ngModel)' },
		},
		size: {
			options: setStoryOptions(FORM_FIELD_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du champ.',
			table: { category: 'inputs (form-field)' },
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
			table: { category: 'inputs (form-field)' },
		},
		inlineMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
			table: { category: 'inputs (form-field)' },
		},
		inlineMessageState: {
			options: setStoryOptions(INLINE_MESSAGE_STATE),
			control: {
				type: 'select',
			},
			description: 'Modifie l’état de l’inline message.',
			table: { category: 'inputs (form-field)', defaultValue: { summary: 'null' } },
		},
		errorInlineMessage: {
			description: 'Ajoute un texte d’erreur sous le champ lorsque celui-ci est en erreur.',
			table: { category: 'inputs (form-field)' },
		},
		autocomplete: {
			options: setStoryOptions(PHONE_NUMBER_INPUT_AUTOCOMPLETE),
			control: {
				type: 'select',
			},
			description: 'Modifie le comportement autocomplete du champ.',
			table: { category: 'inputs' },
		},
		country: {
			control: { type: 'text' },
			description: 'Pays sélectionné par défaut (code ISO, ex. <code>FR</code>). Alias de <code>defaultCountryCode</code>. Par défaut, déduit de la locale.',
			table: { category: 'inputs', type: { summary: 'CountryCode' } },
		},
		allowedCountries: {
			control: { type: 'object' },
			description: 'Restreint la liste des pays proposés (codes ISO). Un tableau vide propose tous les pays.',
			table: { category: 'inputs', type: { summary: 'ReadonlyArray<CountryCode | string>' }, defaultValue: { summary: '[]' } },
		},
		countryChange: {
			description: 'Événement déclenché lorsque le pays sélectionné change.',
			action: 'countryChange',
			control: false,
			table: { category: 'outputs', type: { summary: 'CountryCode' } },
		},
		noAutoPlaceholder: {
			description: 'Désactive le placeholder.',
			table: { category: 'inputs' },
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
			table: { category: 'inputs (form-field)' },
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs (form-field)' },
		},
	},
	args: {
		label: 'Phone',
		tooltip: 'Tooltip message',
		hiddenLabel: false,
		required: true,
		inlineMessage: 'Helper message',
		errorInlineMessage: 'Invalid Phone Number',
		inlineMessageState: null,
		disabled: false,
		noAutoPlaceholder: false,
		presentation: false,
		country: '',
		allowedCountries: [],
	},
};
