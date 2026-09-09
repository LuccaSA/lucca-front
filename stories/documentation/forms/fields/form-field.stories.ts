import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_WIDTH, FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { useStoryModel, createTestStory, generateInputs, setStoryOptions } from '../../../helpers/stories';
import { waitForAngular } from '../../../helpers/test';
import { expect, userEvent, within } from 'storybook/test';

export default {
	title: 'Documentation/Forms/Fields/Form Field',
	component: FormFieldComponent,
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, InputDirective, BrowserAnimationsModule, FormsModule],
		}),
	],
	argTypes: {
		label: {
			control: {
				type: 'text',
			},
			description: 'Modifie le label de l’input. [PortalContent]',
			table: { category: 'inputs' },
		},
		required: {
			control: {
				type: 'boolean',
			},
			description: 'Marque le champ comme obligatoire.',
			table: { category: 'inputs' },
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
			table: { category: 'inputs' },
		},
		inlineMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte indicatif sous le champ de formulaire. [PortalContent]',
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
		errorInlineMessage: {
			description: 'Ajoute un texte d’erreur sous le champ de formulaire lorsque celui-ci est en erreur. [PortalContent]',
			table: { category: 'inputs' },
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
			table: { category: 'inputs' },
		},
		invalid: {
			control: {
				type: 'boolean',
			},
			description: 'Applique l’état invalide au champ.',
			table: { category: 'inputs' },
		},
		counter: {
			control: {
				type: 'number',
			},
			description:
				'Nombre de caractères maximum autorisés pour un champ de type texte. A seulement un impact sur l’interface et doit être complété à un réglage au niveau de <code>FormControl</code>.',
			table: { category: 'inputs' },
		},
		width: {
			options: setStoryOptions(FORM_FIELD_WIDTH),
			control: {
				type: 'select',
			},
			description: 'Applique une largeur fixe au champ. À n’utiliser que lorsque la grille de formulaire n’est pas adaptée.',
			table: { category: 'inputs' },
		},
		rolePresentationLabel: {
			description: "Applique role='presentation' au label du champ dans le cas où celui-ci ne doit pas être lu par le lecteur d’écran.",
			table: { category: 'models' },
		},
	},
	render: (args, { argTypes }) => {
		const { required, ...fieldArgs } = args;
		const model = useStoryModel('');
		return {
			props: { model },
			template: `<lu-form-field extraDescribedBy="extra-message" ${generateInputs(fieldArgs, argTypes)}>
	<div class="textField">
		<div class="textField-input">
			<textarea
				type="text"
				luInput
				class="textField-input-value"
				${required ? 'required' : ''}
				[(ngModel)]="model.example"
				placeholder="Placeholder">
			</textarea>
		</div>
	</div>
</lu-form-field>`,
		};
	},
} as Meta;

export const Template: StoryObj<FormFieldComponent & { required: boolean }> = {
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		inlineMessage: 'Helper text',
		errorInlineMessage: 'Error helper text',
		inlineMessageState: 'default',
		tooltip: 'You expected me to be helpful but this is a story!',
		invalid: false,
		counter: null,
		rolePresentationLabel: false,
	},
};

export const TemplateTEST = createTestStory(Template, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		await expect(canvas.getByText('Label')).toBeVisible();
		await expect(canvas.getByRole('textbox')).toBeVisible();
	});

	await step('Interaction clavier', async () => {
		const textarea = canvas.getByRole('textbox');
		textarea.focus();
		await expect(textarea).toHaveFocus();
		await userEvent.type(textarea, 'test input');
		await waitForAngular();
		await expect(textarea).toHaveValue('test input');
	});
});
