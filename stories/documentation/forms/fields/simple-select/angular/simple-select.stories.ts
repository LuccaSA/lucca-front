import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';
import { expect, screen, userEvent, within } from 'storybook/test';
import { HiddenArgType } from '../../../../../helpers/common-arg-types';
import { createTestStory, generateInputs, InputAlias, SelectCommonAliasInput, setStoryOptions } from '../../../../../helpers/stories';
import { waitForAngular } from '../../../../../helpers/test';

export default {
	title: 'Documentation/Forms/Fields/Simple Select/Angular',
	decorators: [
		moduleMetadata({
			imports: [LuSimpleSelectInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, LuOptionDirective, FilterLegumesPipe, StoryModelDisplayComponent],
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
		placeholder: {
			description: 'Modifie le placeholder au champ.',
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
		loading: {
			description: 'Applique l’état de chargement.',
		},
		disabled: {
			description: 'Désactive le champ.',
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
		},
		optionComparer: HiddenArgType,
		options: HiddenArgType,
		optionTpl: HiddenArgType,
		overlayConfig: HiddenArgType,
		valueTpl: HiddenArgType,
		clueChange: HiddenArgType,
		nextPage: HiddenArgType,
	},
} as Meta;

export const Basic: StoryObj<
	InputAlias<
		LuSimpleSelectInputComponent<unknown> &
			FormFieldComponent & {
				disabled: boolean;
			},
		SelectCommonAliasInput
	>
> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, width, presentation, ...inputArgs } = args;
		return {
			props: { legumes: allLegumes, example: allLegumes[0] },
			template: `<lu-form-field ${generateInputs(
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
	<lu-simple-select ${generateInputs(inputArgs, argTypes)}
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event"
		[(ngModel)]="example">
	</lu-simple-select>
</lu-form-field>
<pr-story-model-display>{{ example | json }}</pr-story-model-display>`,
			moduleMetadata: {
				imports: [LuSimpleSelectInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Label',
		tooltip: 'Tooltip message',
		placeholder: 'Placeholder',
		clearable: true,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		loading: false,
		disabled: false,
		presentation: false,
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		await expect(canvas.getByRole('combobox')).toBeVisible();
	});

	await step('Interaction souris - ouverture du listbox', async () => {
		const combobox = canvas.getByRole('combobox');
		await userEvent.click(combobox);
		await waitForAngular();
		await expect(screen.getByRole('listbox')).toBeVisible();
		const options = within(screen.getByRole('listbox')).getAllByRole('option');
		await expect(options.length).toBeGreaterThan(0);
		await userEvent.click(options[0]);
		await waitForAngular();
		await expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});

	await step('Interaction clavier', async () => {
		const combobox = canvas.getByRole('combobox');
		combobox.focus();
		await expect(combobox).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getByRole('listbox')).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(combobox).toHaveFocus();
	});
});
