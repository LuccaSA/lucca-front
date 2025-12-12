import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { MultilanguageInputComponent, MultilanguageTranslation } from '@lucca-front/ng/forms';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';
import { LOCALE_ID } from '@angular/core';

export default {
	title: 'Documentation/Forms/Fields/MultilanguageField/Angular',
	decorators: [
		moduleMetadata({
			imports: [MultilanguageInputComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, StoryModelDisplayComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
			descripotion: 'Désactive le champ.',
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
			description: 'Modifie la taille de la checkbox.',
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
		placeholder: {
			description: 'Modifie le placeholder au champ.',
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
		},
		openOnFocus: {
			description: 'Ouvre le panel automatiquement au focus du champ.',
		},
		width: {
			options: [null, 20, 30, 40, 50, 60],
			control: {
				type: 'select',
			},
			description: "[v19.2] Applique une largeur fixe au champ. A n'utiliser que lorsque la grille de formulaire n'est pas adaptée.",
		},
	},
} as Meta;

export const Basic: StoryObj<
	MultilanguageInputComponent &
		FormFieldComponent & {
			disabled: boolean;
			required: boolean;
		}
> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, width, ...inputArgs } = args;
		return {
			props: {
				example: [
					{
						cultureCode: 'invariant',
						value: '',
					},
					{
						cultureCode: 'fr-FR',
						value: '',
					},
					{
						cultureCode: 'en-EN',
						value: '',
					},
					{
						cultureCode: 'de-DE',
						value: '',
					},
				] as MultilanguageTranslation[],
			},
			template: cleanupTemplate(`<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					size,
					width,
				},
				argTypes,
			)}>
	<lu-multilanguage-input [(ngModel)]="example"${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ example | json }}</pr-story-model-display>`),
		};
	},
	args: {
		disabled: false,
		label: 'Label',
		required: true,
		hiddenLabel: false,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		openOnFocus: false,
	},
};
