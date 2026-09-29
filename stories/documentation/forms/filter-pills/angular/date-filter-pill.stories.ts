import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateInputComponent, DateRange, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { expect, screen, userEvent, within } from 'storybook/test';
import { createTestStory } from '../../../../helpers/stories';
import { waitForAngular } from '../../../../helpers/test';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/FiltersPills/Date/Angular',
	decorators: [
		moduleMetadata({
			imports: [FilterPillComponent, DateInputComponent, FormsModule, StoryModelDisplayComponent, DateRangeInputComponent, CheckboxInputComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	render: (args, context) => {
		return {
			props: {
				example: null,
				examplePeriod: null,
				checkboxValue: false,
			},
			template: `<lu-filter-pill label="Date de début" name="startDate">
<lu-date-input [(ngModel)]="example" clearable /></lu-filter-pill>

<pr-story-model-display>{{ example }}</pr-story-model-display>

<hr class="divider pr-u-marginBlock400" />

<lu-filter-pill label="Période" name="periode"><lu-date-range-input [(ngModel)]="examplePeriod" clearable/></lu-filter-pill>

<pr-story-model-display>{{ examplePeriod | json }}</pr-story-model-display>
`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterPillComponent> = {
	args: {},
};

// Single date selection tests use a fixed month (June 2025), so they don't depend on the current date
function periodWithSelection(examplePeriod: DateRange): StoryObj<FilterPillComponent> {
	return {
		render: () => ({
			props: { examplePeriod },
			template: `<lu-filter-pill label="Période" name="periode"><lu-date-range-input [(ngModel)]="examplePeriod" clearable /></lu-filter-pill>`,
		}),
	};
}

function getDayButton(day: number): HTMLElement {
	// The first grid displays June 2025, the second one (if any) displays July 2025
	return within(screen.getAllByRole('grid')[0]).getByRole('button', { name: day.toString() });
}

function getPillValue(canvasElement: HTMLElement): string {
	return canvasElement.querySelector('.filterPill-value')?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

export const PeriodStartDateOnlyTEST = createTestStory(periodWithSelection({ start: new Date(2025, 5, 10), end: null, scope: 'day' }), async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const pill = canvas.getByRole('button', { name: /Période/ });

	await step('Opening the pill focuses the empty end field', async () => {
		await userEvent.click(pill);
		await waitForAngular();
		await expect(screen.getByLabelText('End')).toHaveFocus();
	});

	await step('The start date and every following date are highlighted', async () => {
		await expect(getDayButton(10).closest('td')).toHaveAttribute('aria-selected', 'true');
		await expect(getDayButton(20).closest('td')).toHaveClass('is-selectionInProgress');
		await expect(getDayButton(5).closest('td')).not.toHaveClass('is-selectionInProgress');
	});

	await step('Picking a date completes the range with it as end date', async () => {
		await userEvent.click(getDayButton(20));
		await waitForAngular();
		await expect(screen.queryAllByRole('grid')).toHaveLength(0);
		await expect(getPillValue(canvasElement)).toContain('10/06/2025');
		await expect(getPillValue(canvasElement)).toContain('20/06/2025');
	});
});

export const PeriodEndDateOnlyTEST = createTestStory(periodWithSelection({ start: null, end: new Date(2025, 5, 20), scope: 'day' }), async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const pill = canvas.getByRole('button', { name: /Période/ });

	await step('Keyboard: ArrowDown opens the pill and focuses the empty start field', async () => {
		pill.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getAllByRole('grid')[0]).toBeVisible();
		await expect(screen.getByLabelText('Start')).toHaveFocus();
		await expect(getDayButton(20).closest('td')).toHaveAttribute('aria-selected', 'true');
	});

	await step('Picking a date after the end date inverts the bounds', async () => {
		await userEvent.click(getDayButton(25));
		await waitForAngular();
		await expect(screen.queryAllByRole('grid')).toHaveLength(0);
		await expect(getPillValue(canvasElement)).toMatch(/20\/06\/2025.*25\/06\/2025/);
	});
});
