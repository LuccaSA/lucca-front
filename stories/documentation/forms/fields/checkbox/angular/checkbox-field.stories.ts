import { cleanupTemplate, useStoryModel, generateInputs, setStoryOptions } from '@/helpers/stories';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Forms/Fields/CheckboxField/Angular',
	decorators: [
		moduleMetadata({
			imports: [CheckboxInputComponent, FormFieldComponent, FormsModule, StoryModelDisplayComponent],
		}),
	],
	argTypes: {
		size: {
			options: setStoryOptions(FORM_FIELD_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du champ.',
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
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
			table: { category: 'inputs (form-field)' },
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
			table: { category: 'inputs (form-field)' },
		},
		checklist: {
			control: {
				type: 'boolean',
			},
			description: '[v20.2] Présente la checkbox sous la forme d’un élément d’une liste de tâches.',
			table: { category: 'inputs' },
		},
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
		mixed: {
			control: {
				type: 'boolean',
			},
			description: 'Applique un état de sélection mixte (-) à la checkbox.',
			table: { category: 'inputs' },
		},
		inlineMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
			table: { category: 'inputs (form-field)' },
		},
		presentation: {
			description: 'Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs (form-field)' },
		},
	},
} as Meta;

export const Basic: StoryObj<CheckboxInputComponent & FormFieldComponent & { required: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, presentation, ...inputArgs } = args;
		const model = useStoryModel(false);
		return {
			props: { model },
			template: cleanupTemplate(`<lu-form-field${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					size,
					presentation,
				},
				argTypes,
			)}>
	<lu-checkbox-input [(ngModel)]="model.example"${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [CheckboxInputComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Label',
		tooltip: 'Tooltip message',
		required: true,
		mixed: false,
		inlineMessage: 'Helper text',
		inlineMessageState: null,
		checklist: false,
		presentation: false,
	},
};
