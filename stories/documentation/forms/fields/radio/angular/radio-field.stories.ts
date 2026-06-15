import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RADIO_GROUP_INPUT_SIZE, RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory, generateInputs, setStoryOptions } from 'stories/helpers/stories';
import { waitForAngular } from 'stories/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

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
		},
		inlineMessageState: {
			options: setStoryOptions(INLINE_MESSAGE_STATE),
			control: {
				type: 'select',
			},
			description: 'Modifie l’état de l’inline message.',
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
		},
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
		inlineMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
		},
		inline: {
			description: 'Affiche les différentes options sur un axe horizontal.',
		},
	},
} as Meta;

export const Basic: StoryObj<RadioGroupInputComponent & FormFieldComponent & { required: boolean; presentation: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, inline, presentation, ...inputArgs } = args;
		return {
			props: {
				example: 1,
			},
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
	<lu-radio-group-input${generateInputs(inputArgs, argTypes)} [(ngModel)]="example">
		<lu-radio [value]="1" inlineMessage="Option text">Option A</lu-radio>
		<lu-radio [value]="2" inlineMessage="Option text">Option B</lu-radio>
		<ng-template #template><strong>Option</strong> text</ng-template>
		<lu-radio [value]="3" [inlineMessage]="template" disabled>Option C</lu-radio>
	</lu-radio-group-input>
</lu-form-field>

<pr-story-model-display>{{ example }}</pr-story-model-display>`,
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
