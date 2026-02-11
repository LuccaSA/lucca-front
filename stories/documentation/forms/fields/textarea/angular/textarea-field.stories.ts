import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextareaInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

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
		disabled: {
			description: 'Désactive le champ.',
		},
		placeholder: {
			description: 'Applique un placeholder au champ.',
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
		rows: {
			control: { type: 'number' },
			description: '[v18.1] Nombre de lignes visibles par défaut.',
		},
		autoResize: {
			type: 'boolean',
			description: "[v18.3] Active l'autoresize du champ.",
		},
		autoResizeScrollIntoView: {
			type: 'boolean',
			if: { arg: 'autoResize', truthy: true },
			description: "[v18.3] Assure que le curseur de saisie soit toujours visible à l'écran en appliquant un scroll.",
		},
		hiddenLabel: {
			description: "Masque le label en le conservant dans le DOM pour les lecteurs d'écrans",
		},
		counter: {
			description: 'Indique le nombre de caractères maximum du champ. Cette information n’est présente qu’à titre indicatif. La longueur du champ doit également être limité via formControl.',
		},
		disableSpellcheck: {
			description: "Désactive le correcteur d'orthographe.",
		},
	},
} as Meta;

export const Basic: StoryObj<TextareaInputComponent & { disabled: boolean; required: boolean; value: string } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, counter, autoResize, autoResizeScrollIntoView, value, ...inputArgs } = args;
		return {
			props: { example: value },
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
	<lu-textarea-input autoResizeScrollIntoView="${autoResizeScrollIntoView}" autoResize="${autoResize}"
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="example" />
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
	},
};
