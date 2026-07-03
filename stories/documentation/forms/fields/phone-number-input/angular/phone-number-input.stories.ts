import { ChangeDetectionStrategy, Component, LOCALE_ID, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { PHONE_NUMBER_INPUT_AUTOCOMPLETE, PhoneNumberInputComponent } from '@lucca-front/ng/forms/phone-number-input';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, createTestStory, generateInputs, setStoryOptions } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/PhoneNumberField/Angular',
	decorators: [
		moduleMetadata({
			imports: [PhoneNumberInputComponent, FormFieldComponent, BrowserAnimationsModule, StoryModelDisplayComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'en-US' }],
		}),
	],
} as Meta;

export const Basic: StoryObj<PhoneNumberInputComponent & FormFieldComponent & { required: boolean; presentation: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, errorInlineMessage, size, presentation, ...inputArgs } = args;

		return {
			props: {
				example: '+12125550199',
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
	<lu-phone-number-input label="${label}" [country]="country" [(value)]="example" ${generateInputs(inputArgs, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>
`),
		};
	},
	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive le champ.',
		},
		label: {
			control: {
				type: 'text',
			},
			description: 'Modifie le label du champ.',
		},
		required: {
			control: {
				type: 'boolean',
			},
			description: 'Marque le champ comme obligatoire.',
		},
		size: {
			options: setStoryOptions(FORM_FIELD_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du champ.',
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écran',
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
		errorInlineMessage: {
			description: 'Ajoute un texte d’erreur sous le champ lorsque celui-ci est en erreur.',
		},
		autocomplete: {
			options: setStoryOptions(PHONE_NUMBER_INPUT_AUTOCOMPLETE),
			control: {
				type: 'select',
			},
			description: 'Modifie le comportement autocomplete du champ.',
		},
		noAutoPlaceholder: {
			description: '[v19.2] Désactive le placeholder.',
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
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

@Component({
	selector: 'phone-number-input-signal-forms-story',
	imports: [PhoneNumberInputComponent, FormFieldComponent, FormField, StoryModelDisplayComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-form-field label="Téléphone" [rolePresentationLabel]="true">
			<lu-phone-number-input label="Téléphone" [formField]="form.phone" />
		</lu-form-field>
		<pr-story-model-display>{{ form().value().phone }}</pr-story-model-display>
	`,
})
class PhoneNumberInputSignalFormsStory {
	readonly model = signal({ phone: '+33612345678' });
	readonly form = form(this.model);
}

export const SignalForms: StoryObj = {
	parameters: {
		docs: {
			description: {
				story:
					'Pilotage par signal forms : `lu-phone-number-input` implémente `FormValueControl<string>` et se branche sur un champ via la directive `[formField]`. Aucun validator n’est nécessaire dans le schema : une saisie non valide remonte automatiquement une parse error de kind `phoneNumber` sur le champ.',
			},
		},
	},
	render: () => ({
		moduleMetadata: { imports: [PhoneNumberInputSignalFormsStory] },
		template: `<phone-number-input-signal-forms-story />`,
	}),
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
