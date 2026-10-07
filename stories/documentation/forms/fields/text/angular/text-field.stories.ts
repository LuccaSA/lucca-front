import { HiddenArgType } from '@/helpers/common-arg-types';
import { cleanupTemplate, generateInputs, intlArgType, setStoryOptions, useStoryModel } from '@/helpers/stories';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

import { AsyncPipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { luTextfieldTranslations, TextInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Forms/Fields/TextField/Angular',
	decorators: [
		moduleMetadata({
			imports: [TextInputComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, AsyncPipe, StoryModelDisplayComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	argTypes: {
		label: {
			control: {
				type: 'text',
			},
			description: 'Modifie le label de l’input.',
			table: { category: 'inputs (form-field)' },
		},
		required: {
			control: {
				type: 'boolean',
			},
			description: 'Marque le champ comme obligatoire.',
			table: { category: 'inputs (ngModel)' },
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
			table: { category: 'inputs (form-field)' },
		},
		tag: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un tag après le label du champ.',
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
		type: {
			options: ['text', 'email', 'password', 'url'],
			description: 'Le type password ajoute automatiquement un bouton pour afficher la valeur du champ.',
			control: {
				type: 'select',
			},
			table: { category: 'inputs', defaultValue: { summary: 'text' } },
		},
		valueAlignRight: {
			description: 'Aligne la valeur du champ à droite.',
			table: { category: 'inputs' },
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
			table: { category: 'inputs (form-field)' },
		},
		autocomplete: {
			control: {
				type: 'text',
			},
			description: 'Modifie le comportement autocomplete du champ.',
			table: { category: 'inputs', defaultValue: { summary: 'off' } },
		},
		width: {
			options: setStoryOptions(FORM_FIELD_WIDTH),
			control: {
				type: 'select',
			},
			description: 'Applique une largeur fixe au champ.',
			table: { category: 'inputs (form-field)' },
		},
		AI: {
			description: '[v20.3] Indique que la valeur du champ a été générée par IA.',
			table: { category: 'inputs (form-field)' },
		},
		iconAIalt: {
			description: 'Information restituée par le lecteur d’écran.',
			table: { category: 'inputs (form-field)' },
		},
		iconAItooltip: {
			description: 'Ajoute une info-bulle à l’icône AI.',
			table: { category: 'inputs (form-field)' },
		},
		hasClearer: {
			description: 'Affiche un bouton pour vider le champ lorsque celui-ci est rempli.',
			table: { category: 'inputs' },
		},
		hasSearchIcon: {
			description: 'Affiche une icône de recherche.',
			table: { category: 'inputs' },
		},
		searchIcon: {
			description: 'Modifie l’icône (loupe par défaut)',
			table: { category: 'inputs', defaultValue: { summary: 'searchMagnifyingGlass' } },
		},
		disabled: {
			description: 'Désactive le champ.',
			table: { category: 'inputs (ngModel)' },
		},
		placeholder: {
			description: 'Applique un placeholder au champ.',
			table: { category: 'inputs' },
		},
		counter: {
			description: 'Indique le nombre de caractères maximum du champ. Cette information n’est présente qu’à titre indicatif. La longueur du champ doit également être limitée via formControl.',
			table: { category: 'inputs (form-field)', defaultValue: { summary: '0' } },
		},
		presentation: {
			description: 'Affiche une version présentation, en lecture seule, de la valeur',
			table: { category: 'inputs (form-field)' },
		},
		minlength: {
			control: { type: 'number' },
			description: 'Longueur minimale requise pour la valeur du champ. 0 désactive la contrainte.',
			table: { category: 'inputs', defaultValue: { summary: '0' } },
		},
		maxlength: {
			control: { type: 'number' },
			description: 'Longueur maximale autorisée pour la valeur du champ. 0 désactive la contrainte.',
			table: { category: 'inputs', defaultValue: { summary: '0' } },
		},
		mask: {
			control: { type: 'text' },
			description: 'Applique un masque de saisie au champ (ex. <code>SS00 AAAA 0000</code>).',
			table: { category: 'inputs' },
		},
		prefix: {
			control: { type: 'object' },
			description: 'Ajoute un préfixe (texte ou icône) avant la valeur du champ. [TextInputAddon]',
			table: { category: 'inputs', type: { summary: 'TextInputAddon' } },
		},
		suffix: {
			control: { type: 'object' },
			description: 'Ajoute un suffixe (texte ou icône) après la valeur du champ. [TextInputAddon]',
			table: { category: 'inputs', type: { summary: 'TextInputAddon' } },
		},
		blur: {
			description: 'Événement déclenché lorsque le champ perd le focus.',
			action: 'blur',
			control: false,
			table: { category: 'outputs', type: { summary: 'FocusEvent' } },
		},
		intl: intlArgType(luTextfieldTranslations, 'LuTextfieldLabel'),
	},
} as Meta;

export const Basic: StoryObj<TextInputComponent & { disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { counter, label, hiddenLabel, tooltip, tag, inlineMessage, inlineMessageState, size, width, AI, iconAItooltip, iconAIalt, presentation, prefix, suffix, blur, ...inputArgs } = args;
		const model = useStoryModel('Example value');
		return {
			props: { model, prefix, suffix, onBlur: (event: FocusEvent) => blur?.(event) },
			template: cleanupTemplate(`<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					tag,
					inlineMessage,
					inlineMessageState,
					size,
					counter,
					width,
					AI,
					iconAItooltip,
					iconAIalt,
					presentation,
				},
				argTypes,
			)}>
	<lu-text-input
	${generateInputs(inputArgs, argTypes)}${prefix ? ' [prefix]="prefix"' : ''}${suffix ? ' [suffix]="suffix"' : ''}
		[(ngModel)]="model.example"
		(blur)="onBlur($event)">
	</lu-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [TextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		hasClearer: false,
		hasSearchIcon: false,
		autocomplete: '',
		mask: '',
		searchIcon: 'searchMagnifyingGlass',
		disabled: false,
		inlineMessage: 'Helper text',
		inlineMessageState: null,
		type: 'text',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		tag: '',
		counter: null,
		valueAlignRight: false,
		AI: false,
		presentation: false,
		iconAIalt: 'Assistant IA',
		iconAItooltip: 'Donnée remplie automatiquement',
		minlength: null,
		maxlength: null,
	},
};

export const IBANFormat: StoryObj<TextInputComponent & { disabled: boolean; required: boolean } & FormFieldComponent> = {
	argTypes: {
		prefix: HiddenArgType,
		suffix: HiddenArgType,
	},
	render: (args, { argTypes }) => {
		const { counter, label, hiddenLabel, tooltip, tag, inlineMessage, inlineMessageState, size, width, blur, ...inputArgs } = args;
		const model = useStoryModel('');
		return {
			props: { model, onBlur: (event: FocusEvent) => blur?.(event) },
			template: cleanupTemplate(`<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					tag,
					inlineMessage,
					inlineMessageState,
					size,
					counter,
					width,
				},
				argTypes,
			)}>
	<lu-text-input
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="model.example"
		(blur)="onBlur($event)">
	</lu-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [TextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		hasClearer: false,
		hasSearchIcon: false,
		autocomplete: '',
		mask: 'SS00 AAAA 0000 0000 0000 9999 9999 9999 99',
		searchIcon: 'searchMagnifyingGlass',
		disabled: false,
		inlineMessage: 'Helper text',
		inlineMessageState: null,
		type: 'text',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		tag: '',
		counter: null,
		valueAlignRight: false,
	},
};

export const PasswordVisiblity: StoryObj<
	TextInputComponent & {
		disabled: boolean;
		required: boolean;
	} & FormFieldComponent
> = {
	argTypes: {
		type: HiddenArgType,
		prefix: HiddenArgType,
		suffix: HiddenArgType,
	},
	render: (args, { argTypes }) => {
		const { counter, label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, blur, ...inputArgs } = args;
		const model = useStoryModel('');
		return {
			props: { model, onBlur: (event: FocusEvent) => blur?.(event) },
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
	<lu-text-input ${generateInputs(inputArgs, argTypes)}
		type="password"
		[(ngModel)]="model.example"
		(blur)="onBlur($event)">
	</lu-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
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
		searchIcon: 'searchMagnifyingGlass',
		disabled: false,
		inlineMessage: 'Helper text',
		inlineMessageState: null,
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		counter: null,
	},
};

export const WithPrefixAndSuffix: StoryObj<
	TextInputComponent & {
		disabled: boolean;
		required: boolean;
	} & FormFieldComponent
> = {
	render: (args, { argTypes }) => {
		const { counter, label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, prefix, suffix, presentation, blur, ...inputArgs } = args;
		const model = useStoryModel('42');
		return {
			props: {
				prefix,
				suffix,
				model,
				onBlur: (event: FocusEvent) => blur?.(event),
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
					presentation,
				},
				argTypes,
			)}>
	<lu-text-input
		${generateInputs(inputArgs, argTypes)}
		[prefix]="prefix"
		[suffix]="suffix"
		[(ngModel)]="model.example"
		(blur)="onBlur($event)">
	</lu-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [TextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		tooltip: 'Tooltip message',
		hiddenLabel: false,
		required: true,
		type: 'text',
		placeholder: 'Placeholder',
		disabled: false,
		hasClearer: false,
		hasSearchIcon: false,
		searchIcon: 'searchMagnifyingGlass',
		prefix: {
			content: '$',
			ariaLabel: 'dollars',
		},
		suffix: {
			content: '€/j',
			ariaLabel: 'euros par jour',
		},
		inlineMessage: 'Helper text',
		inlineMessageState: null,
		counter: null,
		presentation: false,
	},
};

export const AI: StoryObj<FormFieldComponent & TextInputComponent> = {
	argTypes: {
		width: HiddenArgType,
		hiddenLabel: HiddenArgType,
		size: HiddenArgType,
		inlineMessageState: HiddenArgType,
		counter: HiddenArgType,
		tag: HiddenArgType,
		tooltip: HiddenArgType,
		autocomplete: HiddenArgType,
		valueAlignRight: HiddenArgType,
		type: HiddenArgType,
	},
	render: (args, { argTypes }) => {
		const { label, AI, iconAItooltip, iconAIalt, inlineMessage, presentation, prefix, suffix, blur, ...inputArgs } = args;
		const model = useStoryModel('');
		return {
			props: { model, prefix, suffix, onBlur: (event: FocusEvent) => blur?.(event) },
			template: cleanupTemplate(`<lu-form-field${generateInputs(
				{
					label,
					AI,
					iconAItooltip,
					iconAIalt,
					inlineMessage,
					presentation,
				},
				argTypes,
			)}>
	<lu-text-input${generateInputs(inputArgs, argTypes)}${prefix ? ' [prefix]="prefix"' : ''}${suffix ? ' [suffix]="suffix"' : ''} [(ngModel)]="model.example" (blur)="onBlur($event)" />
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>
`),
			moduleMetadata: {
				imports: [TextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		AI: true,
		iconAIalt: 'Assistant IA',
		iconAItooltip: 'Donnée remplie automatiquement',
	},
};
