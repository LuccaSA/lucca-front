import { LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { NumberFormatInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs, setStoryOptions } from 'stories/helpers/stories';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/NumberFormatField/Angular',
	decorators: [
		moduleMetadata({
			imports: [NumberFormatInputComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, StoryModelDisplayComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	argTypes: {
		tooltip: {
			type: 'string',
			description: 'Affiche une icône (?) associée à une info-bulle. ',
			if: { arg: 'hiddenLabel', truthy: false },
		},
		size: {
			options: setStoryOptions(FORM_FIELD_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du champ.',
		},
		inlineMessage: {
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
		},
		inlineMessageState: {
			options: setStoryOptions(INLINE_MESSAGE_STATE),
			control: {
				type: 'select',
			},
			description: "Modifie l'état de l'inline message.",
		},
		label: {
			description: 'Modifie le label de l’input.',
		},
		hiddenLabel: {
			description: "Masque le label en le conservant dans le DOM pour les lecteurs d'écrans",
		},
		required: {
			description: 'Marque le champ comme obligatoire.',
		},
		hasClearer: {
			description: 'Affiche un bouton pour vider le champ lorsque celui-ci est rempli.',
		},
		disabled: {
			description: 'Désactive le champ.',
		},
		placeholder: {
			description: 'Modifie le placeholder au champ.',
		},
		valueAlignRight: {
			description: 'Aligne la valeur du champ à droite.',
		},
		useAutoPrefixSuffix: {
			type: 'boolean',
			description: 'Affiche le préfixe ou suffixe (en fonction de la locale)',
		},
		min: {
			type: 'number',
			description: 'Définit une valeur minimale.',
		},
		max: {
			type: 'number',
			description: 'Définit une valeur maximale.',
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

export const Basic: StoryObj<
	NumberFormatInputComponent & {
		disabled: boolean;
		required: boolean;
	} & FormFieldComponent
> = {
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
	<lu-number-format-input [(ngModel)]="example"${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>`),
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
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		formatStyle: 'decimal',
		currency: 'EUR',
		useAutoPrefixSuffix: true,
		valueAlignRight: false,
	},
};

export const WithCurrency: StoryObj<
	NumberFormatInputComponent & {
		disabled: boolean;
		required: boolean;
	} & FormFieldComponent
> = {
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
	<lu-number-format-input [(ngModel)]="example"${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>`),
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
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		formatStyle: 'currency',
		useAutoPrefixSuffix: true,
		currency: 'EUR',
		currencyDisplay: 'name',
		valueAlignRight: false,
	},
};

export const WithUnitKm: StoryObj<
	NumberFormatInputComponent & {
		disabled: boolean;
		required: boolean;
	} & FormFieldComponent
> = {
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
	<lu-number-format-input [(ngModel)]="example"${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>`),
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
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		formatStyle: 'unit',
		useAutoPrefixSuffix: true,
		unit: 'kilometer',
		unitDisplay: 'long',
		valueAlignRight: false,
	},
};

export const WithPercent: StoryObj<
	NumberFormatInputComponent & {
		disabled: boolean;
		required: boolean;
	} & FormFieldComponent
> = {
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
	<lu-number-format-input [(ngModel)]="example"${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>`),
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
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		formatStyle: 'percent',
		useAutoPrefixSuffix: true,
		valueAlignRight: false,
	},
};
