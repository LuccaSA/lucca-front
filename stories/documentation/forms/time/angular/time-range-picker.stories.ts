import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { endTimeBeforeStartTime, TimePickerComponent, TimeRangePickerComponent, TimeRangePickerRange, validTimeRange } from '@lucca-front/ng/time';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { createTestStory } from '@/helpers/stories';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';
import { clearInputs, expectNgModelDisplay, mapInputs, repeatKeyboardUserEvent, waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import { generateInputs } from '../../../../helpers/stories';

export default {
	title: 'Documentation/Forms/Time/Angular/TimeRangePicker',
	decorators: [
		moduleMetadata({
			imports: [TimePickerComponent, FormFieldComponent, BrowserAnimationsModule, StoryModelDisplayComponent, TimeRangePickerComponent, JsonPipe],
		}),
	],
	argTypes: {
		size: {
			options: ['M', 'S'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du champ.',
		},
		inlineMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.',
		},
		inlineMessageState: {
			options: ['default', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
			description: "Modifie l'état de l'inline message.",
		},
		tooltip: {
			if: { arg: 'hiddenLabel', truthy: false },
			description: 'Affiche une icône (?) associée à une info-bulle.',
		},
		hiddenLabel: {
			description: "Masque le label en le conservant dans le DOM pour les lecteurs d'écrans.",
		},
		label: {
			control: {
				type: 'text',
			},
			description: "Modifie le label de l'input.",
		},
		required: {
			control: {
				type: 'boolean',
			},
			description: 'Marque le champ comme obligatoire.',
		},
		displayArrows: {
			control: {
				type: 'boolean',
			},
			description: "Affiche les boutons d'incrémention.",
		},
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive le composant.',
		},
		step: {
			control: {
				type: 'text',
			},
			description: "Modifie le pas d'incrémentation.",
		},
		max: {
			control: {
				type: 'text',
			},
			description: 'Définit une valeur maximale.',
		},
		forceMeridiemDisplay: {
			options: [null, false, true],
			control: {
				type: 'select',
			},
			description: "Force l'affichage de l'indicateur AM/PM",
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
		},
	},
} as Meta;

export const Basic: StoryObj<TimePickerComponent & FormFieldComponent & { required: boolean; presentation: boolean }> = {
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, forceMeridiemDisplay, presentation, ...inputArgs } = args;
		return {
			template: `<lu-form-field label="${label}"${generateInputs({ hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, presentation }, argTypes)}>
	<lu-time-range-picker${generateInputs(inputArgs, argTypes)} ${forceMeridiemDisplay !== null ? `[forceMeridiemDisplay]="${forceMeridiemDisplay}"` : ''} [(value)]="example" />
</lu-form-field>

<pr-story-model-display>{{ example | json }}</pr-story-model-display>
`,
		};
	},
	args: {
		hiddenLabel: false,
		label: 'Period',
		tooltip: '',
		required: false,
		inlineMessage: 'Helper message',
		inlineMessageState: 'default',
		displayArrows: false,
		disabled: false,
		step: 'PT1M',
		max: '23:59:59',
		forceMeridiemDisplay: false,
		presentation: false,
	},
};

@Component({
	selector: 'time-range-picker-signal-forms-story',
	imports: [TimeRangePickerComponent, FormFieldComponent, FormField, StoryModelDisplayComponent, JsonPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-form-field label="Période" inlineMessage="L’heure de fin doit être postérieure à l’heure de début">
			<lu-time-range-picker [formField]="form.period" />
		</lu-form-field>
		<pr-story-model-display>{{ form().value() | json }}</pr-story-model-display>
	`,
})
class TimeRangePickerSignalFormsStory {
	readonly model = signal<{ period: TimeRangePickerRange | null }>({ period: null });
	readonly form = form(this.model, (p) => {
		validTimeRange(p.period);
		endTimeBeforeStartTime(p.period);
	});
}

export const SignalForms: StoryObj = {
	parameters: {
		docs: {
			description: {
				story:
					'Pilotage par signal forms : `lu-time-range-picker` implémente `FormValueControl<TimeRangePickerRange | null>` et se branche sur un champ via la directive `[formField]`. La validation (`validTimeRange`, `endTimeBeforeStartTime`) est déclarée dans le schema du `form()`.',
			},
		},
	},
	render: () => ({
		moduleMetadata: { imports: [TimeRangePickerSignalFormsStory] },
		template: `<time-range-picker-signal-forms-story />`,
	}),
};

const basePlay = async ({ canvasElement, step, context }) => {
	const canvas = within(canvasElement);
	const inputs = canvas.getAllByRole('textbox');

	// Map inputs to named references
	const { startHours, startMinutes, endHours, endMinutes } = mapInputs(inputs, {
		startHours: 0,
		startMinutes: 1,
		endHours: 2,
		endMinutes: 3,
	});

	await step('Mouse interactions', async () => {
		// Insert start value
		await userEvent.click(startHours);
		await waitForAngular();
		await expect(startHours).toHaveFocus();
		await userEvent.type(startHours, '9');
		await waitForAngular();
		await expectNgModelDisplay(context.canvasElement, '{ "start": "09:00:00" }');

		// Insert end value
		await userEvent.click(endHours);
		await waitForAngular();
		await expect(endHours).toHaveFocus();
		await userEvent.type(endHours, '10');
		await waitForAngular();
		await expectNgModelDisplay(context.canvasElement, '{ "start": "09:00:00", "end": "10:00:00" }');
	});

	await step('Keyboard interactions', async () => {
		await clearInputs(inputs);
		await waitForAngular();

		// Insert start value with keyboard
		startHours.focus();
		await userEvent.keyboard('{ArrowUp}');
		await expect(startHours).toHaveFocus();
		await waitForAngular();
		await expectNgModelDisplay(context.canvasElement, '{ "start": "01:00:00", "end": "00:00:00" }');

		await userEvent.keyboard('{ArrowRight}');
		await repeatKeyboardUserEvent('{ArrowUp}', 2);
		await waitForAngular();
		await expectNgModelDisplay(context.canvasElement, '{ "start": "01:02:00", "end": "00:00:00" }');
		await expect(startMinutes).toHaveFocus();

		// Insert end value with keyboard
		await userEvent.keyboard('{ArrowRight}');
		await repeatKeyboardUserEvent('{ArrowUp}', 5);
		await waitForAngular();
		await expectNgModelDisplay(context.canvasElement, '{ "start": "01:02:00", "end": "05:00:00" }');
		await expect(endHours).toHaveFocus();

		await userEvent.keyboard('{ArrowRight}');
		await repeatKeyboardUserEvent('{ArrowUp}', 15);
		await waitForAngular();
		await expectNgModelDisplay(context.canvasElement, '{ "start": "01:02:00", "end": "05:15:00" }');
		await expect(endMinutes).toHaveFocus();

		// Go back to start hours
		await repeatKeyboardUserEvent('{ArrowLeft}', 4);
		await waitForAngular();
		await expect(startHours).toHaveFocus();
	});
};

export const BasicTEST = createTestStory(Basic, basePlay);
