import { allLegumes, FilterLegumesPipe, ILegume } from '@/stories/forms/select/select.utils';
import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';
import { HiddenArgType } from '../../../../../helpers/common-arg-types';
import { createTestStory, generateInputs, setStoryOptions } from '../../../../../helpers/stories';
import { waitForAngular } from '../../../../../helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';

export default {
	title: 'Documentation/Forms/Fields/Simple Select/Angular',
	decorators: [
		moduleMetadata({
			imports: [LuSimpleSelectInputComponent, FormFieldComponent, BrowserAnimationsModule, LuOptionDirective, FilterLegumesPipe, StoryModelDisplayComponent],
		}),
	],
	argTypes: {
		tooltip: {
			type: 'string',
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle. ',
			table: { category: 'inputs' },
		},
		label: {
			description: 'Modifie le label du champ.',
			table: { category: 'inputs' },
		},
		placeholder: {
			description: 'Modifie le placeholder au champ.',
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
		width: {
			options: setStoryOptions(FORM_FIELD_WIDTH),
			control: {
				type: 'select',
			},
			description: 'Applique une largeur fixe au champ.',
			table: { category: 'inputs' },
		},
		inlineMessage: {
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
		clearable: {
			description: 'Affiche un bouton pour vider le champ lorsque celui-ci est rempli.',
			table: { category: 'inputs' },
		},
		loading: {
			description: 'Applique l’état de chargement.',
			table: { category: 'inputs' },
		},
		disabled: {
			description: 'Désactive le champ.',
			table: { category: 'inputs' },
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs' },
		},
		optionComparer: HiddenArgType,
		options: HiddenArgType,
		optionTpl: HiddenArgType,
		overlayConfig: HiddenArgType,
		valueTpl: HiddenArgType,
		clueChange: HiddenArgType,
		nextPage: HiddenArgType,
		previousPage: HiddenArgType,
	},
} as Meta;

export const Basic: StoryObj<
	LuSimpleSelectInputComponent<unknown> &
		FormFieldComponent & {
			disabled: boolean;
		}
> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, width, presentation, ...inputArgs } = args;
		const model = useStoryModel<ILegume>(allLegumes[0]);
		return {
			props: { ...args, legumes: allLegumes, model },
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
	<lu-simple-select ${generateInputs(inputArgs, argTypes)} (panelOpened)="panelOpened()" (panelClosed)="panelClosed()"
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event"
		[(value)]="example">
	</lu-simple-select>
</lu-form-field>
<pr-story-model-display>{{ model.example | json }}</pr-story-model-display>`,
			moduleMetadata: {
				imports: [LuSimpleSelectInputComponent, FormFieldComponent, BrowserAnimationsModule],
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

@Component({
	selector: 'simple-select-signal-forms-story',
	imports: [LuSimpleSelectInputComponent, FormFieldComponent, FormField, StoryModelDisplayComponent, JsonPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-form-field label="Légume" inlineMessage="Requis">
			<lu-simple-select [formField]="form.legume" [options]="legumes" />
		</lu-form-field>
		<pr-story-model-display>{{ form().value() | json }}</pr-story-model-display>
	`,
})
class SimpleSelectSignalFormsStory {
	readonly legumes = allLegumes;
	readonly model = signal<{ legume: ILegume | null }>({ legume: null });
	readonly form = form(this.model, (p) => {
		required(p.legume);
	});
}

export const SignalForms: StoryObj = {
	parameters: {
		docs: {
			description: {
				story:
					'Pilotage par signal forms : `lu-simple-select` implémente `FormValueControl` (valeur typée, ici `ILegume | null`) et se branche sur un champ via la directive `[formField]`. La validation (`required`…) est déclarée dans le schema du `form()`.',
			},
		},
	},
	render: () => ({
		moduleMetadata: { imports: [SimpleSelectSignalFormsStory] },
		template: `<simple-select-signal-forms-story />`,
	}),
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
