import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, SwitchInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { useStoryModel, createTestStory, generateInputs, setStoryOptions } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/SwitchField/Angular',
	decorators: [
		moduleMetadata({
			imports: [SwitchInputComponent, FormFieldComponent, FormsModule, StoryModelDisplayComponent],
		}),
	],
	argTypes: {
		size: {
			options: setStoryOptions(FORM_FIELD_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du switch.',
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
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
			table: { category: 'inputs' },
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
			table: { category: 'inputs' },
		},
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
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs' },
		},
	},
} as Meta;

export const Basic: StoryObj<SwitchInputComponent & FormFieldComponent & { required: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, presentation, ...inputArgs } = args;
		const model = useStoryModel(false);
		return {
			props: { model },
			template: `<lu-form-field${generateInputs(
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
	<lu-switch-input [(ngModel)]="model.example"${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`,
			moduleMetadata: {
				imports: [CheckboxInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Label',
		tooltip: 'Tooltip message',
		required: true,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		presentation: false,
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const switchInput = canvas.getByRole('checkbox');
		await expect(switchInput).toBeVisible();
		await expect(switchInput).not.toBeChecked();
	});

	await step('Interaction souris - activer', async () => {
		const switchInput = canvas.getByRole('checkbox');
		await userEvent.click(switchInput);
		await waitForAngular();
		await expect(switchInput).toBeChecked();
	});

	await step('Interaction souris - désactiver', async () => {
		const switchInput = canvas.getByRole('checkbox');
		await userEvent.click(switchInput);
		await waitForAngular();
		await expect(switchInput).not.toBeChecked();
	});
});
