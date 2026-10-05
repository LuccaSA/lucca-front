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
	const openAdditionalFilters = async () => {
		await userEvent.click(getAddFiltersButton());
		await waitForAngular();
		return await screen.findByRole('option', { name: 'Période' });
	};
	const closeAdditionalFilters = async () => {
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(screen.queryByRole('option', { name: 'Période' })).not.toBeInTheDocument());
		await waitFor(() => expect(getAddFiltersButton()).toHaveAttribute('aria-expanded', 'false'));
	};
	const togglePeriodOption = async () => {
		const option = await openAdditionalFilters();
		await userEvent.click(option);
		await waitForAngular();
		await closeAdditionalFilters();
	};

	await step('An optional pill is hidden until it is added', async () => {
		await expect(getAddFiltersButton()).toBeVisible();
		await expect(queryPeriodPill()).not.toBeInTheDocument();
	});

	await step('Selecting the optional pill in the additional filters displays it', async () => {
		const option = await openAdditionalFilters();
		await expect(option).toHaveAttribute('aria-selected', 'false');
		await userEvent.click(option);
		await waitForAngular();
		await expect(option).toHaveAttribute('aria-selected', 'true');
		await expect(getPeriodPill()).toBeVisible();
		await closeAdditionalFilters();
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

	await step('Unselecting the optional pill hides it', async () => {
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
		const option = await screen.findByRole('option', { name: 'Période' });
		await expect(option).toHaveAttribute('aria-selected', 'true');
		await userEvent.keyboard('{ArrowDown}');
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(option).toHaveAttribute('aria-selected', 'false');
		await expect(queryPeriodPill()).not.toBeInTheDocument();
		await closeAdditionalFilters();
		await expect(getAddFiltersButton()).toHaveFocus();
	});
});
