import { LOCALE_ID } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { MultilanguageInputComponent, MultilanguageTranslation } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs, setStoryOptions } from '@/helpers/stories';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/MultilanguageField/Angular',
	decorators: [
		moduleMetadata({
			imports: [MultilanguageInputComponent, FormFieldComponent, ReactiveFormsModule, BrowserAnimationsModule, StoryModelDisplayComponent, FormsModule],
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
			options: ['S', 'M'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille de la checkbox.',
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
		},
		inlineMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
		},
		inlineMessageState: {
			options: setStoryOptions(INLINE_MESSAGE_STATE),
			control: {
				type: 'select',
			},
			description: 'Modifie l’état de l’inline message.',
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
			options: setStoryOptions(FORM_FIELD_WIDTH),
			control: {
				type: 'select',
			},
			description: '[v19.2] Applique une largeur fixe au champ. À n’utiliser que lorsque la grille de formulaire n’est pas adaptée.',
		},
		autocomplete: {
			control: {
				type: 'text',
			},
			description: 'Modifie l’attribut autocomplete des champs input.',
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
		},
		hasNoInvariant: {
			description: "[v21.3] Supprime la notion d'invariant du champ, nécessite d'être associé à un Validateur required et l'utilisation de `displayLocale`.",
		},
		hasAIButtons: {
			description: "[v21.3] Ajoute les boutons 'translate with ai', qui émettent la locale à traduire via l'output `translateWithAI`",
		},
		displayLocale: {
			description: '[v21.3] Locale à utiliser comme valeur affichée dans le champ en version collapsed lorsque `hasNoInvariant` est active.',
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
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, width, presentation, disabled, ...inputArgs } = args;
		const formControl = new FormControl<MultilanguageTranslation[]>([
			{
				cultureCode: 'invariant',
				value: 'Invariant value',
			},
			{
				cultureCode: 'fr-FR',
				value: 'Valeur en français',
			},
			{
				cultureCode: 'en-US',
				value: 'English value',
			},
			{
				cultureCode: 'de-DE',
				value: "I don't speak German",
			},
		]);
		if (disabled) {
			formControl.disable();
		}
		return {
			props: {
				formControl,
			},
			template: cleanupTemplate(`<lu-form-field${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					size,
					width,
					presentation,
				},
				argTypes,
			)}>
	<lu-multilanguage-input [formControl]="formControl"${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ formControl.value | json }}</pr-story-model-display>`),
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
		presentation: false,
		autocomplete: 'off',
		hasNoInvariant: false,
		hasAIButtons: false,
		displayLocale: 'en-US',
	},
};
