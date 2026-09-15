import { LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { NumberFormatInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, createTestStory, generateInputs, setStoryOptions } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

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
			table: { category: 'inputs' },
		},
		size: {
			options: setStoryOptions(FORM_FIELD_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du champ.',
			table: { category: 'inputs' },
		},
		inlineMessage: {
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
			table: { category: 'inputs' },
		},
		inlineMessageState: {
			options: setStoryOptions(INLINE_MESSAGE_STATE),
			control: {
				type: 'select',
			},
			description: 'Modifie l’état de l’inline message.',
			table: { category: 'inputs' },
		},
		label: {
			description: 'Modifie le label de l’input.',
			table: { category: 'inputs' },
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
			table: { category: 'inputs' },
		},
		required: {
			description: 'Marque le champ comme obligatoire.',
			table: { category: 'inputs' },
		},
		hasClearer: {
			description: 'Affiche un bouton pour vider le champ lorsque celui-ci est rempli.',
			table: { category: 'inputs' },
		},
		disabled: {
			description: 'Désactive le champ.',
			table: { category: 'inputs' },
		},
		placeholder: {
			description: 'Modifie le placeholder au champ.',
			table: { category: 'inputs' },
		},
		valueAlignRight: {
			description: 'Aligne la valeur du champ à droite.',
			table: { category: 'inputs' },
		},
		useAutoPrefixSuffix: {
			type: 'boolean',
			description: 'Affiche le préfixe ou suffixe (en fonction de la locale)',
			table: { category: 'inputs' },
		},
		min: {
			type: 'number',
			description: 'Définit une valeur minimale.',
			table: { category: 'inputs' },
		},
		max: {
			type: 'number',
			description: 'Définit une valeur maximale.',
			table: { category: 'inputs' },
		},
		formatStyle: {
			options: ['decimal', 'percent', 'currency', 'unit'],
			control: {
				type: 'select',
			},
			description: 'En <code>percent</code>, la valeur est comprise entre 0 et 1',
			table: { category: 'inputs' },
		},
		currency: {
			options: ['EUR', 'USD', 'CNY', 'JPY'],
			control: {
				type: 'select',
			},
			if: { arg: 'formatStyle', eq: 'currency' },
			table: { category: 'inputs' },
		},
		currencyDisplay: {
			options: ['code', 'symbol', 'narrowSymbol', 'name'],
			control: {
				type: 'select',
			},
			if: { arg: 'formatStyle', eq: 'currency' },
			table: { category: 'inputs' },
		},
		unit: {
			options: ['second', 'kilometer', 'kilogram'],
			control: {
				type: 'select',
			},
			if: { arg: 'formatStyle', eq: 'unit' },
			table: { category: 'inputs' },
		},
		unitDisplay: {
			options: ['short', 'narrow', 'long'],
			control: {
				type: 'select',
			},
			if: { arg: 'formatStyle', eq: 'unit' },
			table: { category: 'inputs' },
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
