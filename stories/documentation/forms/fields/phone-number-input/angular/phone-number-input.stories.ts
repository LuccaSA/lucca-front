import { cleanupTemplate, createTestStory, generateInputs, setStoryOptions, useStoryModel } from '@/helpers/stories';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';
import { waitForAngular } from '@/helpers/test';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { PHONE_NUMBER_INPUT_AUTOCOMPLETE, PhoneNumberInputComponent } from '@lucca-front/ng/forms/phone-number-input';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { expect, userEvent, within } from 'storybook/test';

export default {
	title: 'Documentation/Forms/Fields/PhoneNumberField/Angular',
	decorators: [
		moduleMetadata({
			imports: [PhoneNumberInputComponent, FormFieldComponent, FormsModule, BrowserAnimationsModule, StoryModelDisplayComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'en-US' }],
		}),
	],
} as Meta;

export const Basic: StoryObj<PhoneNumberInputComponent & FormFieldComponent & { required: boolean; presentation: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, errorInlineMessage, size, presentation, ...inputArgs } = args;
		const model = useStoryModel('+12125550199');

		return {
			props: {
				model,
				country: '',
			},
			template: cleanupTemplate(`<lu-form-field [rolePresentationLabel]="true" ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					errorInlineMessage,
					size,
					presentation,
				},
				argTypes,
			)}>
	<lu-phone-number-input label="${label}" [country]="country" [(ngModel)]="model.example" #result="ngModel" ${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
@if(result.invalid && result.errors.validPhoneNumber){
  <div>{{result.errors.validPhoneNumber}}</div>
}
<pr-story-model-display>{{ model.example }}</pr-story-model-display>
`),
		};
	},
	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive le champ.',
			table: { category: 'inputs' },
		},
		label: {
			control: {
				type: 'text',
			},
			description: 'Modifie le label du champ.',
			table: { category: 'inputs' },
		},
		required: {
			control: {
				type: 'boolean',
			},
			description: 'Marque le champ comme obligatoire.',
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
		errorInlineMessage: {
			description: 'Ajoute un texte d’erreur sous le champ lorsque celui-ci est en erreur.',
			table: { category: 'inputs' },
		},
		autocomplete: {
			options: setStoryOptions(PHONE_NUMBER_INPUT_AUTOCOMPLETE),
			control: {
				type: 'select',
			},
			description: 'Modifie le comportement autocomplete du champ.',
			table: { category: 'inputs' },
		},
		noAutoPlaceholder: {
			description: 'Désactive le placeholder.',
			table: { category: 'inputs' },
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs' },
		},
	},
	args: {
		label: 'Phone',
		tooltip: 'Tooltip message',
		hiddenLabel: false,
		required: true,
		inlineMessage: 'Helper message',
		errorInlineMessage: 'Invalid Phone Number',
		inlineMessageState: 'default',
		disabled: false,
		noAutoPlaceholder: false,
		presentation: false,
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const input = canvas.getByRole('textbox');
		await expect(input).toBeVisible();
	});

	await step('Interaction souris - saisir un numéro de téléphone', async () => {
		const input = canvas.getByRole('textbox');
		await userEvent.clear(input);
		await userEvent.type(input, '2125550199');
		await waitForAngular();
	});

	await step('Interaction clavier - focus et saisie', async () => {
		const input = canvas.getByRole('textbox');
		await userEvent.clear(input);
		input.focus();
		await userEvent.keyboard('9876543210');
		await waitForAngular();
	});
});
