import { colorDecoratives500 } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { ColorInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';
import { createTestStory, generateInputs, setStoryOptions } from '../../../../../helpers/stories';
import { waitForAngular } from '../../../../../helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';

export default {
	title: 'Documentation/Forms/Fields/Color Picker/Angular',
	decorators: [
		moduleMetadata({
			imports: [ColorInputComponent, FormsModule, LuOptionDirective, StoryModelDisplayComponent],
		}),
	],
	argTypes: {
		tooltip: {
			type: 'string',
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle. ',
		},
		label: {
			description: 'Modifie le label du champ.',
		},
		required: {
			description: 'Marque le champ comme obligatoire.',
		},
		size: {
			options: setStoryOptions(FORM_FIELD_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du champ.',
		},
		width: {
			options: setStoryOptions(FORM_FIELD_WIDTH),
			control: {
				type: 'select',
			},
			description: '[v19.2] Applique une largeur fixe au champ.',
		},
		inlineMessage: {
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
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
		clearable: {
			description: 'Affiche un bouton pour vider le champ lorsque celui-ci est rempli.',
		},
		compact: {
			description: 'Modifie la taille du color picker pour le rendre plus petit.',
		},
	},
} as Meta;

export const Basic: StoryObj<ColorInputComponent & FormFieldComponent & { required: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, width, ...inputArgs } = args;
		return {
			props: { colors: colorDecoratives500, example: null },
			template: `<lu-form-field ${generateInputs(
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
	<lu-color-input [(ngModel)]="example" [colors]="colors"${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ example | json }}</pr-story-model-display>`,
			moduleMetadata: {
				imports: [ColorInputComponent, FormFieldComponent, FormsModule],
			},
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Label',
		tooltip: 'Tooltip message',
		required: false,
		clearable: true,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		compact: false,
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const trigger = canvas.getByRole('combobox');
		await expect(trigger).toBeVisible();
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});

	await step('Interaction souris - ouvrir la palette', async () => {
		const trigger = canvas.getByRole('combobox');
		await userEvent.click(trigger);
		await waitForAngular();
		await expect(trigger).toHaveAttribute('aria-expanded', 'true');
		await expect(screen.getByRole('listbox')).toBeVisible();
	});

	await step('Interaction clavier - fermer avec Escape', async () => {
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		const trigger = canvas.getByRole('combobox');
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});

	await step('Interaction clavier - ouvrir avec ArrowDown', async () => {
		const trigger = canvas.getByRole('combobox');
		trigger.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(trigger).toHaveAttribute('aria-expanded', 'true');
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
	});
});
