import { AsyncPipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { HiddenArgType } from '@/helpers/common-arg-types';
import { cleanupTemplate, useStoryModel, createTestStory, generateInputs, setStoryOptions } from '@/helpers/stories';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';
import { updateStoryArgs, waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';

export default {
	title: 'Documentation/Forms/Fields/TextField/Angular',
	decorators: [
		moduleMetadata({
			imports: [TextInputComponent, FormFieldComponent, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, AsyncPipe, StoryModelDisplayComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
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
		tag: {
			type: 'string',
			description: 'Ajoute un tag après le label du champ.',
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
		type: {
			options: ['text', 'email', 'password', 'url'],
			description: 'Le type password ajoute automatiquement un bouton pour afficher la valeur du champ.',
			control: {
				type: 'select',
			},
			table: { category: 'inputs' },
		},
		valueAlignRight: {
			description: 'Aligne la valeur du champ à droite.',
			table: { category: 'inputs' },
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
			table: { category: 'inputs' },
		},
		autocomplete: {
			type: 'string',
			description: 'Modifie le comportement autocomplete du champ.',
			table: { category: 'inputs' },
		},
		width: {
			options: setStoryOptions(FORM_FIELD_WIDTH),
			control: {
				type: 'select',
			},
			description: '[v19.2] Applique une largeur fixe au champ.',
			table: { category: 'inputs' },
		},
		AI: {
			description: '[v20.3] Indique que la valeur du champ a été générée par IA.',
			table: { category: 'inputs' },
		},
		iconAIalt: {
			description: 'Information restituée par le lecteur d’écran.',
			table: { category: 'inputs' },
		},
		iconAItooltip: {
			description: 'Ajoute une info-bulle à l’icône AI.',
			table: { category: 'inputs' },
		},
		hasClearer: {
			description: 'Affiche un bouton pour vider le champ lorsque celui-ci est rempli.',
			table: { category: 'inputs' },
		},
		hasSearchIcon: {
			description: 'Affiche une icône de recherche.',
			table: { category: 'inputs' },
		},
		searchIcon: {
			description: 'Modifie l’icône (loupe par défaut)',
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
		counter: {
			description: 'Indique le nombre de caractères maximum du champ. Cette information n’est présente qu’à titre indicatif. La longueur du champ doit également être limitée via formControl.',
			table: { category: 'inputs' },
		},
		presentation: {
			description: 'Affiche une version présentation, en lecture seule, de la valeur',
			table: { category: 'inputs' },
		},
	},
} as Meta;

export const Basic: StoryObj<TextInputComponent & { disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { counter, label, hiddenLabel, tooltip, tag, inlineMessage, inlineMessageState, size, width, AI, iconAItooltip, iconAIalt, presentation, ...inputArgs } = args;
		const model = useStoryModel('Example value');
		return {
			props: { model },
			template: cleanupTemplate(`<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					tag,
					inlineMessage,
					inlineMessageState,
					size,
					counter,
					width,
					AI,
					iconAItooltip,
					iconAIalt,
					presentation,
				},
				argTypes,
			)}>
	<lu-text-input
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="model.example">
	</lu-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [TextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		hasClearer: false,
		hasSearchIcon: false,
		autocomplete: '',
		searchIcon: 'searchMagnifyingGlass',
		disabled: false,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		type: 'text',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		tag: '',
		counter: 0,
		valueAlignRight: false,
		AI: false,
		presentation: false,
		iconAIalt: 'Assistant IA',
		iconAItooltip: 'Donnée remplie automatiquement',
	},
};

export const IBANFormat: StoryObj<TextInputComponent & { disabled: boolean; required: boolean } & FormFieldComponent> = {
	render: (args, { argTypes }) => {
		const { counter, label, hiddenLabel, tooltip, tag, inlineMessage, inlineMessageState, size, width, ...inputArgs } = args;
		const model = useStoryModel('');
		return {
			props: { model },
			template: cleanupTemplate(`<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					tag,
					inlineMessage,
					inlineMessageState,
					size,
					counter,
					width,
				},
				argTypes,
			)}>
	<lu-text-input
	${generateInputs(inputArgs, argTypes)}
		[(ngModel)]="model.example" mask="SS00 AAAA 0000 0000 0000 9999 9999 9999 99">
	</lu-text-input>
</lu-form-field>
{{ model.example }}`),
			moduleMetadata: {
				imports: [TextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		hasClearer: false,
		hasSearchIcon: false,
		autocomplete: '',
		searchIcon: 'searchMagnifyingGlass',
		disabled: false,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		type: 'text',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		tag: '',
		counter: 0,
		valueAlignRight: false,
	},
};

export const PasswordVisiblity: StoryObj<
	TextInputComponent & {
		disabled: boolean;
		required: boolean;
	} & FormFieldComponent
> = {
	render: (args, { argTypes }) => {
		const { counter, label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, ...inputArgs } = args;
		const model = useStoryModel('');
		return {
			props: { model },
			template: `<lu-form-field ${generateInputs(
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
	<lu-text-input ${generateInputs(inputArgs, argTypes)}
		type="password"
		[(ngModel)]="model.example">
	</lu-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`,
			moduleMetadata: {
				imports: [TextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		hasClearer: true,
		hasSearchIcon: false,
		searchIcon: 'searchMagnifyingGlass',
		disabled: false,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		placeholder: 'Placeholder',
		tooltip: 'Je suis un message d’aide',
		counter: 0,
	},
};

export const WithPrefixAndSuffix: StoryObj<
	TextInputComponent & {
		disabled: boolean;
		required: boolean;
	} & FormFieldComponent
> = {
	render: (args, { argTypes }) => {
		const { counter, label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, prefix, suffix, presentation, ...inputArgs } = args;
		const model = useStoryModel('42');
		return {
			props: {
				prefix: args.prefix,
				suffix: args.suffix,
				model,
			},
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
	<lu-text-input
		${generateInputs(inputArgs, argTypes)}
		[prefix]="prefix"
		[suffix]="suffix"
		[(ngModel)]="model.example">
	</lu-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
			moduleMetadata: {
				imports: [TextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		tooltip: 'Tooltip message',
		hiddenLabel: false,
		required: true,
		type: 'text',
		placeholder: 'Placeholder',
		disabled: false,
		hasClearer: false,
		hasSearchIcon: false,
		searchIcon: 'searchMagnifyingGlass',
		prefix: {
			content: '$',
			ariaLabel: 'dollars',
		},
		suffix: {
			content: '€/j',
			ariaLabel: 'euros par jour',
		},
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		counter: 0,
		presentation: false,
	},
};

export const AI: StoryObj<FormFieldComponent & TextInputComponent> = {
	argTypes: {
		width: HiddenArgType,
		hiddenLabel: HiddenArgType,
		size: HiddenArgType,
		inlineMessageState: HiddenArgType,
		counter: HiddenArgType,
		tag: HiddenArgType,
		tooltip: HiddenArgType,
		autocomplete: HiddenArgType,
		valueAlignRight: HiddenArgType,
		type: HiddenArgType,
	},
	render: (args, { argTypes }) => {
		const { label, iconAItooltip, iconAIalt, ...inputArgs } = args;
		const model = useStoryModel('');
		return {
			props: { model },
			template: cleanupTemplate(`<lu-form-field AI${generateInputs(
				{
					label,
					iconAItooltip,
					iconAIalt,
					inputArgs,
				},
				argTypes,
			)}>
	<lu-text-input [(ngModel)]="model.example" />
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>
`),
			moduleMetadata: {
				imports: [TextInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		iconAIalt: 'Assistant IA',
		iconAItooltip: 'Donnée remplie automatiquement',
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step, id }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const input = canvas.getByRole('textbox');
		await expect(input).toBeVisible();
		await expect(input).toHaveValue('Example value');
	});

	await step('Interaction souris - saisir du texte', async () => {
		const input = canvas.getByRole('textbox');
		await userEvent.clear(input);
		await userEvent.type(input, 'Nouveau texte');
		await waitForAngular();
		await expect(input).toHaveValue('Nouveau texte');
	});

	await step('Interaction clavier - focus et saisie', async () => {
		const input = canvas.getByRole('textbox');
		await userEvent.clear(input);
		input.focus();
		await userEvent.keyboard('Texte clavier');
		await waitForAngular();
		await expect(input).toHaveValue('Texte clavier');
	});

	await step('La valeur saisie survit à un changement de config', async () => {
		const input = canvas.getByRole('textbox');
		await userEvent.clear(input);
		await userEvent.type(input, 'Valeur à conserver');
		await waitForAngular();

		await updateStoryArgs(id, { size: 'S' });
		await waitForAngular();

		await expect(canvas.getByRole('textbox')).toHaveValue('Valeur à conserver');
	});
});

export const BasicCaretPositionTEST = createTestStory(Basic, async ({ canvasElement }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const input = canvas.getByRole('textbox') as HTMLInputElement;

	// Typing at the start of the value must keep the caret right after the typed characters, so the user can keep writing there.
	await userEvent.type(input, 'AB', { initialSelectionStart: 0, initialSelectionEnd: 0 });
	await waitForAngular();

	await expect(input).toHaveValue('ABExample value');
	await expect(input.selectionStart).toBe(2);
});

export const BasicPasswordVisibilityTEST = createTestStory(PasswordVisiblity, async (context) => {
	const canvas = within(context.canvasElement);
	await waitForAngular();

	const input = context.canvasElement.querySelector('input.textField-input-value');
	const toggleButton = await canvas.findByRole('button', { name: /Afficher le mot de passe/i });

	await expect(input).toHaveAttribute('type', 'password');
	await expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

	await userEvent.click(input);
	await userEvent.type(input, 'MonSuperMotDePasse123!');
	await waitForAngular();

	await userEvent.click(toggleButton);
	await waitForAngular();
	await expect(input).toHaveAttribute('type', 'text');
	await expect(toggleButton).toHaveAttribute('aria-pressed', 'true');

	await userEvent.click(toggleButton);
	await waitForAngular();
	await expect(input).toHaveAttribute('type', 'password');
	await expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

	await expect(canvas.getByTestId('pr-ng-model')).toHaveTextContent('MonSuperMotDePasse123!');
});
