import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, createTestStory, generateInputs } from '../../../../helpers/stories';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
import { expect, within, screen, userEvent } from '@storybook/test';
import { expectNgModelDisplay, waitForAngular } from '../../../../helpers/test';

export default {
	title: 'Documentation/Forms/Fields/DateInput/Angular',
	decorators: [
		moduleMetadata({
			imports: [DateInputComponent, FormsModule, FormFieldComponent, StoryModelDisplayComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	argTypes: {
		min: {
			control: 'date',
		},
		max: {
			control: 'date',
		},
		selected: {
			control: 'date',
		},
		hideToday: {
			control: 'boolean',
			description: 'Masque la mise en valeur du jour en cours.',
		},
		hasTodayButton: {
			control: 'boolean',
		},
		enableOverflow: {
			control: 'boolean',
			description: 'Autorise la sélection des jours du mois précédent ou suivant sur la vue du mois en cours.',
		},
		showOverflow: {
			control: 'boolean',
			description: 'Affiche la sélection des jours du mois précédent ou suivant sur la vue du mois en cours.',
		},
		clearable: {
			control: 'boolean',
		},
		mode: {
			control: 'select',
			options: ['day', 'month', 'year'],
		},
	},
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, min, max, selected, ...flags } = args;
		return {
			props: {
				selected: selected || new Date(),
				min: min ? new Date(min) : null,
				max: max ? new Date(max) : null,
			},
			template: cleanupTemplate(`<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					size,
				},
				argTypes,
			)}>
<lu-date-input [(ngModel)]="selected" [min]="min" [max]="max" ${generateInputs(flags, argTypes)}></lu-date-input>
</lu-form-field>
<pr-story-model-display>{{selected}}</pr-story-model-display>`),
		};
	},
} as Meta;

export const Basic: StoryObj<DateInputComponent & FormFieldComponent> = {
	args: {
		// FormField
		label: 'Label',
		tooltip: 'Tooltip message',
		hiddenLabel: false,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		// DateInput
		disableOverflow: false,
		hideOverflow: false,
		hideToday: false,
		hasTodayButton: false,
		hideWeekend: false,
		clearable: false,
		mode: 'day',
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, args, context }) => {
	const canvas = within(canvasElement);
	await waitForAngular();
	// Get input using label text to make sure the label link is properly done, we're adding ? for the tooltip
	const input = canvas.getByLabelText(`${args['label']}${args['tooltip'] ? '?' : ''}`, { selector: 'input' });
	await userEvent.click(input);
	await waitForAngular();
	// We have to get table by role using the screen as matcher, as overlay isn't in the canvas itself
	const table = screen.getByRole('grid');
	// Not ideal but we need to do this until we have a better way to get the calendar component
	const calendarComponent = table.parentElement.parentElement;
	const today = new Date();
	const calendar = within(calendarComponent);
	// We can at least check for this year, checking for the month would be harder due to locale considerations
	await expect(calendar.getByText(today.getFullYear())).toBeInTheDocument();
	await expect(calendar.getAllByText(today.getDate()).find((el) => !el.parentElement.className.includes('is-overflow')).parentElement).toHaveAttribute('aria-selected', 'true');
	// We pick 15 because it should show only once
	// Fallback if we're the 15th, pick 16
	const targetDay = today.getDate() === 15 ? 16 : 15;
	await userEvent.click(calendar.getByText(targetDay.toString()));
	await waitForAngular();
	await expectNgModelDisplay(canvasElement, new Date(today.getFullYear(), today.getMonth(), targetDay).toString());

	await context.step('Invalid date', async () => {
		await userEvent.clear(input);
		await userEvent.type(input, 'not a date');
		await userEvent.keyboard('{Escape}');
		await expectNgModelDisplay(canvasElement, 'Invalid Date');
		await expect(input).toHaveAttribute('aria-invalid', 'true');
	});

	await context.step('Select today after another date', async () => {
		await userEvent.clear(input);
		const yesterday = today.getDate() <= 1 ? 2 : today.getDate() - 1;
		await pickDay(input, yesterday);
		await expectNgModelDisplay(canvasElement, new Date(today.getFullYear(), today.getMonth(), yesterday).toString());

		await pickDay(input, today.getDate());
		await expectNgModelDisplay(canvasElement, new Date(today.getFullYear(), today.getMonth(), today.getDate()).toString());
	});
});

async function pickDay(input: HTMLElement, targetDay: number) {
	await userEvent.click(input);
	await waitForAngular();
	const table = screen.getByRole('grid');
	const calendarComponent = table.parentElement.parentElement;
	const calendar = within(calendarComponent);
	await userEvent.click(calendar.getByText(targetDay.toString()));
}
