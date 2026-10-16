import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextareaInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, useControlledStoryModel, generateInputs, setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/TextAreaField/Angular',
	decorators: [
		moduleMetadata({
			imports: [TextareaInputComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
		}),
	],
	argTypes: {
		label: {
			control: {
				type: 'text',
			},
			description: 'Modifie le label de l’input.',
			table: { category: 'inputs' },
		},
		required: {
			control: {
				type: 'boolean',
			},
			description: 'Marque le champ comme obligatoire.',
			table: { category: 'inputs' },
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
			table: { category: 'inputs' },
		},
		disabled: {
			description: 'Désactive le champ.',
			table: { category: 'inputs' },
		},
		placeholder: {
			description: 'Applique un placeholder au champ.',
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
			control: {
				type: 'text',
			},
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
		rows: {
			control: { type: 'number' },
			description: 'Nombre de lignes visibles par défaut.',
			table: { category: 'inputs' },
		},
		autoResize: {
			type: 'boolean',
			description: 'Active l’autoresize du champ.',
			table: { category: 'inputs' },
		},
		autoResizeScrollIntoView: {
			name: '↳ autoResizeScrollIntoView',
			type: 'boolean',
			if: { arg: 'autoResize', truthy: true },
			description: 'Assure que le curseur de saisie soit toujours visible à l’écran en appliquant un scroll.',
			table: { category: 'inputs' },
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
			table: { category: 'inputs' },
		},
		counter: {
			description: 'Indique le nombre de caractères maximum du champ. Cette information n’est présente qu’à titre indicatif. La longueur du champ doit également être limitée via formControl.',
			table: { category: 'inputs' },
		},
		disableSpellcheck: {
			description: 'Désactive le correcteur d’orthographe.',
			table: { category: 'inputs' },
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs' },
		},
		value: {
			table: { disable: true },
		},
	},
} as Meta;

export const Basic: StoryObj<TextareaInputComponent & { disabled: boolean; required: boolean; value: string } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, counter, value, presentation, ...inputArgs } = args;
		return {
			props: { model: useControlledStoryModel(value) },
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
	<lu-textarea-input
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="model.example" />
</lu-form-field>
`),
			moduleMetadata: {
				imports: [TextareaInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Label',
		required: true,
		disabled: false,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		counter: 0,
		autoResize: false,
		autoResizeScrollIntoView: false,
		rows: 3,
		value: '',
		disableSpellcheck: false,
		presentation: false,
	},
};
