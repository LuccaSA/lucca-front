import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FORM_FIELD_SIZE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextareaInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, createTestStory, generateInputs, setStoryOptions } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';

export default {
	title: 'Documentation/Forms/Fields/TextAreaField/Angular',
	decorators: [
		moduleMetadata({
			imports: [TextareaInputComponent, FormFieldComponent, FormsModule, ReactiveFormsModule],
		}),
	],
	argTypes: {
		label: {
			control: {
				type: 'text',
			},
			description: 'Modifie le label de l’input.',
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
			options: setStoryOptions(FORM_FIELD_SIZE),
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
			options: setStoryOptions(INLINE_MESSAGE_STATE),
			control: {
				type: 'select',
			},
			description: 'Modifie l’état de l’inline message.',
		},
		rows: {
			control: { type: 'number' },
			description: 'Nombre de lignes visibles par défaut.',
		},
		autoResize: {
			type: 'boolean',
			description: 'Active l’autoresize du champ.',
		},
		autoResizeScrollIntoView: {
			type: 'boolean',
			if: { arg: 'autoResize', truthy: true },
			description: 'Assure que le curseur de saisie soit toujours visible à l’écran en appliquant un scroll.',
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
		},
		counter: {
			description: 'Indique le nombre de caractères maximum du champ. Cette information n’est présente qu’à titre indicatif. La longueur du champ doit également être limitée via formControl.',
		},
		disableSpellcheck: {
			description: 'Désactive le correcteur d’orthographe.',
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
		},
		value: {
			table: { disable: true },
		},
	},
} as Meta;

export const Basic: StoryObj<TextareaInputComponent & { disabled: boolean; required: boolean; value: string } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, counter, autoResize, autoResizeScrollIntoView, value, presentation, ...inputArgs } = args;
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
					presentation,
				},
				argTypes,
			)}>
	<lu-textarea-input autoResizeScrollIntoView="${autoResizeScrollIntoView}" autoResize="${autoResize}"
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="example" />
</lu-form-field>
`),
			moduleMetadata: {
				imports: [TextareaInputComponent, FormFieldComponent, FormsModule],
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

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const textarea = canvas.getByRole('textbox');
		await expect(textarea).toBeVisible();
	});

	await step('Interaction souris - saisir du texte', async () => {
		const textarea = canvas.getByRole('textbox');
		await userEvent.click(textarea);
		await userEvent.type(textarea, 'Texte de test');
		await waitForAngular();
		await expect(textarea).toHaveValue('Texte de test');
	});

	await step('Interaction clavier - focus et saisie supplémentaire', async () => {
		const textarea = canvas.getByRole('textbox');
		textarea.focus();
		await userEvent.keyboard('{Control>}a{/Control}');
		await userEvent.keyboard('Saisie clavier');
		await waitForAngular();
		await expect(textarea).toHaveValue('Saisie clavier');
	});
});
