import { createTestStory } from '@/helpers/stories';
import { pickDay, waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/filter-pills/angular/filter-bar.stories';

export default {
	...meta,
	title: 'E2E/FilterBar',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);

	await step('Without optional pill, there is no additional filters button', async () => {
		await expect(canvas.getByRole('button', { name: /Départements/ })).toBeVisible();
		await expect(canvas.queryByRole('button', { name: 'Filtres supplémentaires' })).not.toBeInTheDocument();
	});

	await step('Results updating automatically is announced to assistive technologies', async () => {
		const filterBar = canvasElement.querySelector('lu-filter-bar')!;
		await expect(filterBar).toHaveAccessibleDescription('La liste des résultats se met à jour automatiquement.');
	});
});

export const ManualApplyTEST = createTestStory(
	{ ...Basic, name: 'Manual apply', args: { ...Basic.args, manualApply: true } },
	async ({ canvasElement, step }) => {
		await waitForAngular();

		const canvas = within(canvasElement);

		await step('With an apply button, results are not announced as updating automatically', async () => {
			await expect(canvas.getByRole('button', { name: 'Appliquer les filtres' })).toBeVisible();
			const filterBar = canvasElement.querySelector('lu-filter-bar')!;
			await expect(filterBar).not.toHaveAttribute('aria-describedby');
			await expect(canvas.queryByText('La liste des résultats se met à jour automatiquement.')).not.toBeInTheDocument();
		});
	},
);

export const OptionalFilterTEST = createTestStory({ ...Basic, name: 'Optional filter', args: { ...Basic.args, optionalFilter: true } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const getAddFiltersButton = () => canvas.getByRole('button', { name: 'Filtres supplémentaires' });
	const getPeriodPill = () => canvas.getByRole('button', { name: /Période/ });
	const queryPeriodPill = () => canvas.queryByRole('button', { name: /Période/ });
	const togglePeriodOption = async () => {
		await userEvent.click(getAddFiltersButton());
		await waitForAngular();
		await userEvent.click(screen.getByRole('checkbox', { name: 'Période' }));
		await waitForAngular();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
	};

	await step('An optional pill is hidden until it is added', async () => {
		await expect(getAddFiltersButton()).toBeVisible();
		await expect(queryPeriodPill()).not.toBeInTheDocument();
	});

	await step('Checking the optional pill in the additional filters displays it', async () => {
		await userEvent.click(getAddFiltersButton());
		await waitForAngular();
		const option = screen.getByRole('checkbox', { name: 'Période' });
		await expect(option).not.toBeChecked();
		await userEvent.click(option);
		await waitForAngular();
		await expect(option).toBeChecked();
		await expect(getPeriodPill()).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(screen.queryByRole('checkbox', { name: 'Période' })).not.toBeInTheDocument());
	});

	await step('The displayed optional pill can be filled', async () => {
		await userEvent.click(getPeriodPill());
		await waitForAngular();
		await pickDay(screen.getByLabelText('Start'), 10, true);
		await pickDay(screen.getByLabelText('End'), 20, true);
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(getPeriodPill()).toHaveAttribute('aria-expanded', 'false'));
		await expect(getPeriodPill()).not.toHaveTextContent('Aucune valeur sélectionnée');
	});

	await step('Unchecking the optional pill hides it', async () => {
		await togglePeriodOption();
		await expect(queryPeriodPill()).not.toBeInTheDocument();
	});

	await step('Hiding an optional pill clears its value', async () => {
		await togglePeriodOption();
		await expect(getPeriodPill()).toHaveTextContent('Aucune valeur sélectionnée');
	});

	await step('The additional filters can be managed with the keyboard', async () => {
		getAddFiltersButton().focus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		const option = screen.getByRole('checkbox', { name: 'Période' });
		await expect(option).toBeChecked();
		option.focus();
		await userEvent.keyboard(' ');
		await waitForAngular();
		await expect(option).not.toBeChecked();
		await expect(queryPeriodPill()).not.toBeInTheDocument();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(screen.queryByRole('checkbox', { name: 'Période' })).not.toBeInTheDocument());
		await expect(getAddFiltersButton()).toHaveFocus();
	});
});
