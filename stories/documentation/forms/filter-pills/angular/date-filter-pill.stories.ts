import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
import { createTestStory } from '@/helpers/stories';
import { pickDay, waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

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

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const getModelDisplay = (index: number) => canvas.getAllByTestId('pr-ng-model')[index];
	const getClearer = (pill: HTMLElement) => within(pill.closest('.filterPillWrapper') as HTMLElement).getByRole('button', { name: /Vider ce champ/ });
	const queryClearer = (pill: HTMLElement) => within(pill.closest('.filterPillWrapper') as HTMLElement).queryByRole('button', { name: /Vider ce champ/ });

	await step('Picking a date fills the pill and the model', async () => {
		const pill = canvas.getByRole('button', { name: /Date de début/ });
		await expect(pill).toHaveTextContent('Aucune valeur sélectionnée');
		await expect(queryClearer(pill)).not.toBeInTheDocument();

		await userEvent.click(pill);
		await waitForAngular();
		await pickDay(screen.getByTestId('lu-date-input'), 15);
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(pill).toHaveAttribute('aria-expanded', 'false'));

		await expect(pill).not.toHaveTextContent('Aucune valeur sélectionnée');
		await expect(pill).toHaveTextContent(/15/);
		// The model holds a Date whose serialization depends on the time zone: only check it is set
		await expect(getModelDisplay(0).textContent?.trim()).not.toBe('');
	});

	await step('Clearing the date empties the pill and the model', async () => {
		const pill = canvas.getByRole('button', { name: /Date de début/ });
		await userEvent.click(getClearer(pill));
		await waitForAngular();
		await expect(pill).toHaveTextContent('Aucune valeur sélectionnée');
		await expect(getModelDisplay(0).textContent?.trim()).toBe('');
		await expect(queryClearer(pill)).not.toBeInTheDocument();
		await expect(pill).toHaveFocus();
	});

	await step('Picking a period fills the pill and the model', async () => {
		const pill = canvas.getByRole('button', { name: /Période/ });
		await userEvent.click(pill);
		await waitForAngular();
		await pickDay(screen.getByLabelText('Start'), 10, true);
		await pickDay(screen.getByLabelText('End'), 20, true);
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(pill).toHaveAttribute('aria-expanded', 'false'));

		await expect(pill).toHaveTextContent(/10/);
		await expect(pill).toHaveTextContent(/20/);
		// Dates are serialized in UTC, so the days depend on the time zone: only check both bounds are set
		await expect(getModelDisplay(1)).toHaveTextContent(/"start": "[^"]+"/);
		await expect(getModelDisplay(1)).toHaveTextContent(/"end": "[^"]+"/);
	});

	await step('Clearing the period empties the pill and the model', async () => {
		const pill = canvas.getByRole('button', { name: /Période/ });
		await userEvent.click(getClearer(pill));
		await waitForAngular();
		await expect(pill).toHaveTextContent('Aucune valeur sélectionnée');
		await expect(getModelDisplay(1)).toHaveTextContent('null');
	});
});
