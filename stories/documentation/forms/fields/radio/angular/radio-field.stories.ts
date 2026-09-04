import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RADIO_GROUP_INPUT_SIZE, RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { useStoryModel, createTestStory, generateInputs, setStoryOptions } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/RadioField/Angular',
	decorators: [
		moduleMetadata({
			imports: [RadioGroupInputComponent, RadioComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, StoryModelDisplayComponent],
		}),
	],
	argTypes: {
		size: {
			options: setStoryOptions(RADIO_GROUP_INPUT_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du radio.',
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
			name: '↳ tooltip',
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
		inlineMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
			table: { category: 'inputs' },
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs' },
		},
		inline: {
			description: 'Affiche les différentes options sur un axe horizontal.',
			table: { category: 'inputs' },
		},
	},
} as Meta;

export const Basic: StoryObj<RadioGroupInputComponent & FormFieldComponent & { required: boolean; presentation: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, inline, presentation, ...inputArgs } = args;
		const model = useStoryModel(1);
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
					inline,
					presentation,
				},
				argTypes,
			)}>
	<lu-radio-group-input${generateInputs(inputArgs, argTypes)} [(ngModel)]="model.example">
		<lu-radio [value]="1" inlineMessage="Option text">Option A</lu-radio>
		<lu-radio [value]="2" inlineMessage="Option text">Option B</lu-radio>
		<ng-template #template><strong>Option</strong> text</ng-template>
		<lu-radio [value]="3" [inlineMessage]="template" disabled>Option C</lu-radio>
	</lu-radio-group-input>
</lu-form-field>

<pr-story-model-display>{{ model.example }}</pr-story-model-display>`,
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Label',
		tooltip: 'Tooltip message',
		required: true,
		inlineMessage: 'Helper message',
		inlineMessageState: 'default',
		inline: false,
		presentation: false,
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const radios = canvas.getAllByRole('radio');
		await expect(radios.length).toBeGreaterThanOrEqual(2);
		await expect(radios[0]).toBeChecked();
	});

	await step('Interaction souris - sélectionner option B', async () => {
		const radios = canvas.getAllByRole('radio');
		await userEvent.click(radios[1]);
		await waitForAngular();
		await expect(radios[1]).toBeChecked();
		await expect(radios[0]).not.toBeChecked();
	});

	await step('Interaction clavier - naviguer avec les flèches', async () => {
		const radios = canvas.getAllByRole('radio');
		radios[1].focus();
		await userEvent.keyboard('{ArrowUp}');
		await waitForAngular();
		await expect(radios[0]).toBeChecked();
	});
});
