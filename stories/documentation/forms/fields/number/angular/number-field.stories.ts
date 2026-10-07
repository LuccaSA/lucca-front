import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { luNumberFieldTranslations, NumberInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, useStoryModel, generateInputs, setStoryOptions, intlArgType } from '@/helpers/stories';

import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/NumberField/Angular',
	decorators: [
		moduleMetadata({
			imports: [NumberInputComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, StoryModelDisplayComponent],
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
			description: 'Affiche un bouton pour vider le champ lorsque celui-ci est rempli. Il est alors conseillé de masquer les boutons d’incrémentation (noSpinButtons).',
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
		step: {
			control: { type: 'number' },
			description: 'Modifie le pas d’incrémentation.',
			table: { category: 'inputs' },
		},
		min: {
			control: { type: 'number' },
			description: 'Définit une valeur minimale.',
			table: { category: 'inputs' },
		},
		max: {
			control: { type: 'number' },
			description: 'Définit une valeur maximale.',
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
		valueAlignRight: {
			description: 'Aligne la valeur du champ à droite.',
			table: { category: 'inputs' },
		},
		noSpinButtons: {
			description: 'Masque les boutons d’incrémentation.',
			table: { category: 'inputs' },
		},
		intl: intlArgType(luNumberFieldTranslations, 'LuNumberFieldLabel'),
	},
} as Meta;

export const Basic: StoryObj<NumberInputComponent & { disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, prefix, suffix, ...inputArgs } = args;
		const model = useStoryModel(100);
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
	<lu-number-input [(ngModel)]="model.example"${prefix ? ' [prefix]="prefix"' : ''}${suffix ? ' [suffix]="suffix"' : ''}${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [NumberInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Label',
		required: true,
		hasClearer: true,
		disabled: false,
		inlineMessage: 'Helper text',
		inlineMessageState: null,
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		step: 1,
		min: 0,
		max: 999,
		noSpinButtons: false,
		valueAlignRight: false,
	},
};

export const WithPrefixAndSuffix: StoryObj<
	NumberInputComponent & {
		disabled: boolean;
		required: boolean;
	} & FormFieldComponent
> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, prefix, suffix, ...inputArgs } = args;
		const model = useStoryModel(100);
		return {
			props: {
				prefix,
				suffix,
				model,
			},
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
	<lu-number-input [(ngModel)]="model.example" [prefix]="prefix" [suffix]="suffix"${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [NumberInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Label',
		tooltip: 'Tooltip message',
		required: true,
		placeholder: 'Placeholder',
		disabled: false,
		hasClearer: false,
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
		step: 1,
		min: 0,
		max: 999,
		noSpinButtons: false,
		valueAlignRight: false,
	},
};
