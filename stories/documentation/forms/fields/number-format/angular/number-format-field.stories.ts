import { LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { luNumberFormatFieldTranslations, NumberFormatInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, generateInputs, intlArgType, setStoryOptions, useStoryModel } from '@/helpers/stories';
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
			table: { category: 'inputs (form-field)' },
		},
		size: {
			options: setStoryOptions(FORM_FIELD_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du champ.',
			table: { category: 'inputs (form-field)' },
		},
		inlineMessage: {
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
		label: {
			description: 'Modifie le label de l’input.',
			table: { category: 'inputs (form-field)' },
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
			table: { category: 'inputs (form-field)' },
		},
		required: {
			description: 'Marque le champ comme obligatoire.',
			table: { category: 'inputs (ngModel)' },
		},
		hasClearer: {
			description: 'Affiche un bouton pour vider le champ lorsque celui-ci est rempli.',
			table: { category: 'inputs' },
		},
		disabled: {
			description: 'Désactive le champ.',
			table: { category: 'inputs (ngModel)' },
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
		prefix: {
			control: { type: 'object' },
			description: 'Ajoute un préfixe (texte ou icône) avant la valeur du champ. Ignoré lorsque <code>useAutoPrefixSuffix</code> est actif. [TextInputAddon]',
			table: { category: 'inputs', type: { summary: 'TextInputAddon' } },
		},
		suffix: {
			control: { type: 'object' },
			description: 'Ajoute un suffixe (texte ou icône) après la valeur du champ. Ignoré lorsque <code>useAutoPrefixSuffix</code> est actif. [TextInputAddon]',
			table: { category: 'inputs', type: { summary: 'TextInputAddon' } },
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
			table: { category: 'inputs', defaultValue: { summary: 'decimal' } },
		},
		currency: {
			options: ['EUR', 'USD', 'CNY', 'JPY'],
			control: {
				type: 'select',
			},
			if: { arg: 'formatStyle', eq: 'currency' },
			description: 'Devise utilisée pour le formatage (code ISO 4217). Utilisé lorsque <code>formatStyle</code> vaut <code>currency</code>.',
			table: { category: 'inputs' },
		},
		currencyDisplay: {
			options: ['code', 'symbol', 'narrowSymbol', 'name'],
			control: {
				type: 'select',
			},
			if: { arg: 'formatStyle', eq: 'currency' },
			description: 'Format d’affichage de la devise (code, symbole, nom…). Utilisé lorsque <code>formatStyle</code> vaut <code>currency</code>.',
			table: { category: 'inputs' },
		},
		unit: {
			options: ['second', 'kilometer', 'kilogram'],
			control: {
				type: 'select',
			},
			if: { arg: 'formatStyle', eq: 'unit' },
			description: 'Unité utilisée pour le formatage. Utilisé lorsque <code>formatStyle</code> vaut <code>unit</code>.',
			table: { category: 'inputs' },
		},
		unitDisplay: {
			options: ['short', 'narrow', 'long'],
			control: {
				type: 'select',
			},
			if: { arg: 'formatStyle', eq: 'unit' },
			description: 'Format d’affichage de l’unité (court, étroit ou long). Utilisé lorsque <code>formatStyle</code> vaut <code>unit</code>.',
			table: { category: 'inputs' },
		},
		intl: intlArgType(luNumberFormatFieldTranslations, 'LuNumberFormatFieldLabel'),
	},
} as Meta;

export const Basic: StoryObj<
	NumberFormatInputComponent & {
		disabled: boolean;
		required: boolean;
	} & FormFieldComponent
> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, prefix, suffix, ...inputArgs } = args;
		const model = useStoryModel<number | null>(null);
		return {
			props: { model, prefix, suffix },
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
	<lu-number-format-input [(ngModel)]="model.example"${prefix ? ' [prefix]="prefix"' : ''}${suffix ? ' [suffix]="suffix"' : ''}${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
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
		inlineMessageState: null,
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		formatStyle: 'decimal',
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
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, prefix, suffix, ...inputArgs } = args;
		const model = useStoryModel<number | null>(null);
		return {
			props: { model, prefix, suffix },
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
	<lu-number-format-input [(ngModel)]="model.example"${prefix ? ' [prefix]="prefix"' : ''}${suffix ? ' [suffix]="suffix"' : ''}${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
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
		inlineMessageState: null,
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
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, prefix, suffix, ...inputArgs } = args;
		const model = useStoryModel<number | null>(null);
		return {
			props: { model, prefix, suffix },
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
	<lu-number-format-input [(ngModel)]="model.example"${prefix ? ' [prefix]="prefix"' : ''}${suffix ? ' [suffix]="suffix"' : ''}${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
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
		inlineMessageState: null,
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
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, prefix, suffix, ...inputArgs } = args;
		const model = useStoryModel<number | null>(null);
		return {
			props: { model, prefix, suffix },
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
	<lu-number-format-input [(ngModel)]="model.example"${prefix ? ' [prefix]="prefix"' : ''}${suffix ? ' [suffix]="suffix"' : ''}${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
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
		inlineMessageState: null,
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		formatStyle: 'percent',
		useAutoPrefixSuffix: true,
		valueAlignRight: false,
	},
};
