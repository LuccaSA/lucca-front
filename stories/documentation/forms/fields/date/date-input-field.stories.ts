import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { expect, screen, userEvent, within } from 'storybook/test';
import { cleanupTemplate, createTestStory, generateInputs } from '../../../../helpers/stories';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
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
		clearBehavior: {
			control: 'select',
			options: ['clear', 'reset'],
			description: '[v20.1] Change le comportement au clic sur la croix de suppression',
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
				selected,
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
<lu-date-input [(ngModel)]="selected" [min]="min" [max]="max" autocomplete="off" ${generateInputs(flags, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ selected }}</pr-story-model-display>`),
		};
	},
} as Meta;

export const Basic: StoryObj<DateInputComponent & FormFieldComponent & { selected: Date }> = {
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
		clearBehavior: 'clear',
		mode: 'day',
		// Underlying ngModel
		selected: new Date(),
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, args, context }) => {
	const canvas = within(canvasElement);
	await waitForAngular();
	// Get input using label text to make sure the label link is properly done, we're adding ? for the tooltip
	// eslint-disable-next-line @angular-eslint/no-uncalled-signals
	const input = canvas.getByLabelText(`${args['label']}${args['tooltip'] ? '?' : ''}`, { selector: 'input' });
	await userEvent.click(input);
	await waitForAngular();
	// We have to get table by role using the screen as matcher, as overlay isn't in the canvas itself
	const table = screen.getByRole('grid');
	// Not ideal but we need to do this until we have a better way to get the calendar component
	const calendarComponent = table.parentElement?.parentElement;
	const today = new Date();
	const calendar = within(calendarComponent);
	// We can at least check for this year, checking for the month would be harder due to locale considerations
	await expect(calendar.getByText(today.getFullYear())).toBeInTheDocument();
	await expect(calendar.getAllByText(today.getDate()).find((el) => !el.parentElement?.className.includes('is-overflow'))?.parentElement).toHaveAttribute('aria-selected', 'true');
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
	await waitForAngular();

	await context.step('Select today after another date', async () => {
		await userEvent.clear(input);
		// We pick 15 because it should show only once
		// Fallback if we're the 15th, pick 16
		const targetDay = today.getDate() === 15 ? 16 : 15;
		const yesterday = targetDay - 1;
		await pickDay(input, yesterday);
		await expectNgModelDisplay(canvasElement, new Date(today.getFullYear(), today.getMonth(), yesterday).toString());

		await pickDay(input, targetDay);
		await expectNgModelDisplay(canvasElement, new Date(today.getFullYear(), today.getMonth(), targetDay).toString());
	});
	await waitForAngular();
});

async function pickDay(input: HTMLElement, targetDay: number) {
	await userEvent.click(input);
	await waitForAngular();
	const table = screen.getByRole('grid');
	const calendarComponent = table.parentElement?.parentElement;
	const calendar = within(calendarComponent);
	await userEvent.click(calendar.getByText(targetDay.toString()));
}
