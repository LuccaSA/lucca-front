import { AsyncPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';
import { LOCALE_ID } from '@angular/core';

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
			description: "Modifie le label de l'input.",
		},
		required: {
			control: {
				type: 'boolean',
			},
			description: 'Marque le champ comme obligatoire.',
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
		},
		tag: {
			type: 'string',
			description: 'Ajoute un tag après le label du champ.',
		},
		size: {
			options: ['M', 'S', 'XS'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du champ.',
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
		type: {
			options: ['text', 'email', 'password', 'url'],
			description: 'Le type password ajoute automatiquement un bouton pour afficher la valeur du champ.',
			control: {
				type: 'select',
			},
		},
		valueAlignRight: {
			description: '[v18.1] Aligne la valeur du champ à droite.',
		},
		hiddenLabel: {
			description: "Masque le label en le conservant dans le DOM pour les lecteurs d'écrans",
		},
		autocomplete: {
			type: 'string',
			description: 'Modifie le comportement autocomplete du champ.',
		},
		width: {
			options: [null, 20, 30, 40, 50, 60],
			control: {
				type: 'select',
			},
			description: '[v19.2] Applique une largeur fixe au champ.',
		},
		AI: {
			description: '[v20.3] Indique que la valeur du champ a été générée par IA.',
		},
		iconAIalt: {
			description: "Information restituée par le lecteur d'écran.",
		},
		iconAItooltip: {
			description: "Ajoute une info-bulle à l'icône AI.",
		},
		hasClearer: {
			description: 'Affiche un bouton pour vider le champ lorsque celui-ci est rempli.',
		},
		hasSearchIcon: {
			description: 'Affiche une icône de recherche.',
		},
		searchIcon: {
			description: "Modifie l'icône (loupe par défaut)",
		},
		disabled: {
			description: 'Désactive le champ.',
		},
		placeholder: {
			description: 'Applique un placeholder au champ.',
		},
		counter: {
			description: 'Indique le nombre de caractères maximum du champ. Cette information n’est présente qu’à titre indicatif. La longueur du champ doit également être limité via formControl.',
		},
		presentation: {
			description: 'Affiche une version présentation, en lecture seule, de la valeur',
		},
	},
} as Meta;

export const Basic: StoryObj<TextInputComponent & { disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { counter, label, hiddenLabel, tooltip, tag, inlineMessage, inlineMessageState, size, width, AI, iconAItooltip, iconAIalt, presentation, ...inputArgs } = args;
		return {
			props: {
				example: 'Example value',
			},
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
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="example">
	</lu-text-input>
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>`),
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
		searchIcon: 'searchMagnifyingGlass',
		disabled: false,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		type: 'text',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		tag: '',
		counter: 0,
		valueAlignRight: false,
		AI: false,
		presentation: false,
		iconAIalt: 'Assistant IA',
		iconAItooltip: 'Donnée remplie automatiquement',
	},
};

export const IBANFormat: StoryObj<TextInputComponent & { disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { counter, label, hiddenLabel, tooltip, tag, inlineMessage, inlineMessageState, size, width, ...inputArgs } = args;
		return {
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
		[(ngModel)]="example" mask="SS00 AAAA 0000 0000 0000 9999 9999 9999 99">
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
		hasClearer: false,
		hasSearchIcon: false,
		autocomplete: '',
		searchIcon: 'searchMagnifyingGlass',
		disabled: false,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		type: 'text',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		tag: '',
		counter: 0,
		valueAlignRight: false,
	},
};

export const PasswordVisiblity: StoryObj<
	TextInputComponent & {
		disabled: boolean;
		required: boolean;
	} & FormFieldComponent
> = {
	render: (args, { argTypes }) => {
		const { counter, label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, ...inputArgs } = args;
		return {
			template: `<lu-form-field ${generateInputs(
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
<pr-story-model-display>{{ example }}</pr-story-model-display>`,
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
		inlineMessageState: 'default',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		counter: 0,
	},
};

export const WithPrefixAndSuffix: StoryObj<
	TextInputComponent & {
		disabled: boolean;
		required: boolean;
	} & FormFieldComponent
> = {
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
<pr-story-model-display>{{ example }}</pr-story-model-display>`),
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
		inlineMessageState: 'default',
		counter: 0,
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
		const { label, iconAItooltip, iconAIalt, ...inputArgs } = args;
		return {
			template: cleanupTemplate(`<lu-form-field AI${generateInputs(
				{
					label,
					iconAItooltip,
					iconAIalt,
					inputArgs,
				},
				argTypes,
			)}>
	<lu-text-input [(ngModel)]="example" />
</lu-form-field>
<pr-story-model-display>{{example}}</pr-story-model-display>
`),
			moduleMetadata: {
				imports: [TextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		iconAIalt: 'Assistant IA',
		iconAItooltip: 'Donnée remplie automatiquement',
	},
};
