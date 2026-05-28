import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { NumberInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs, setStoryOptions } from 'stories/helpers/stories';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

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
			description: 'Modifie l’état de l’inline message.',
		},
		label: {
			description: 'Modifie le label de l’input.',
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
		},
		required: {
			description: 'Marque le champ comme obligatoire.',
		},
		hasClearer: {
			description: 'Affiche un bouton pour vider le champ lorsque celui-ci est rempli. Il est alors conseillé de masquer les boutons d’incrémentation (noSpinButtons).',
		},
		disabled: {
			description: 'Désactive le champ.',
		},
		placeholder: {
			description: 'Modifie le placeholder au champ.',
		},
		step: {
			description: 'Modifie le pas d’incrémentation.',
		},
		min: {
			description: 'Définit une valeur minimale.',
		},
		max: {
			description: 'Définit une valeur maximale.',
		},
		valueAlignRight: {
			description: 'Aligne la valeur du champ à droite.',
		},
		noSpinButtons: {
			description: 'Masque les boutons d’incrémentation.',
		},
	},
} as Meta;

export const Basic: StoryObj<NumberInputComponent & { disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, ...inputArgs } = args;
		return {
			props: {
				example: 1000,
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
	<lu-number-input [(ngModel)]="example"${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>`),
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
		inlineMessageState: 'default',
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
				},
				argTypes,
			)}>
	<lu-number-input [(ngModel)]="example" [prefix]="prefix" [suffix]="suffix"${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>`),
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
		inlineMessageState: 'default',
		step: 1,
		min: 0,
		max: 999,
		noSpinButtons: false,
		valueAlignRight: false,
	},
};
