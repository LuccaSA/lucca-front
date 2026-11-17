import { createTestStory } from '@/helpers/stories';
import { findPanelOptions, waitForAngular } from '@/helpers/test';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import meta, { Basic, DefaultValue } from '@/stories/forms/filter-pills/angular/select-filter-pill.stories';

export default {
	...meta,
	title: 'E2E/FilterPill/Select',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const [simplePill, multiPill] = canvas.getAllByRole('button', { name: /Légume/ });
	const getModelDisplay = (index: number) => canvas.getAllByTestId('pr-ng-model')[index];
	const getClearer = (pill: HTMLElement) => within(pill.closest('.filterPillWrapper') as HTMLElement).getByRole('button', { name: /Vider ce champ/ });

	await step('Selecting an option fills the simple select pill and the model', async () => {
		await userEvent.click(simplePill);
		await waitForAngular();
		const [option] = await findPanelOptions();
		const optionText = option.innerText;
		await userEvent.click(option);
		await waitForAngular();

		// Selecting a value closes the popover of a simple select
		await waitFor(() => expect(simplePill).toHaveAttribute('aria-expanded', 'false'));
		await expect(simplePill).toHaveTextContent(optionText);
		await expect(getModelDisplay(0)).toHaveTextContent(optionText);
	});

	await step('Clearing the simple select pill empties the model', async () => {
		await userEvent.click(getClearer(simplePill));
		await waitForAngular();
		await expect(simplePill).toHaveTextContent('Aucune valeur sélectionnée');
		await expect(getModelDisplay(0)).toHaveTextContent('null');
	});

	await step('Selecting several options displays the plural label', async () => {
		await userEvent.click(multiPill);
		await waitForAngular();
		const options = await findPanelOptions();
		const optionTexts = [options[0].innerText, options[1].innerText];
		await userEvent.click(options[0]);
		await waitForAngular();
		// The popover of a multi select stays open between selections
		await expect(multiPill).toHaveAttribute('aria-expanded', 'true');
		await expect(multiPill).toHaveTextContent(optionTexts[0]);
		await userEvent.click(options[1]);
		await waitForAngular();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(multiPill).toHaveAttribute('aria-expanded', 'false'));

		await expect(multiPill).toHaveTextContent('2 légumes');
		await expect(getModelDisplay(1)).toHaveTextContent(optionTexts[0]);
		await expect(getModelDisplay(1)).toHaveTextContent(optionTexts[1]);
	});

	await step('Clearing the multi select pill empties the model', async () => {
		await userEvent.click(getClearer(multiPill));
		await waitForAngular();
		await expect(multiPill).toHaveTextContent('Aucune valeur sélectionnée');
		await expect(getModelDisplay(1)).toHaveTextContent('[]');
	});
});

export const DefaultValueTEST = createTestStory(DefaultValue, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const [simplePill, multiPill] = canvas.getAllByRole('button', { name: /légume/i });
	const getModelDisplay = (index: number) => canvas.getAllByTestId('pr-ng-model')[index];
	const queryClearer = (pill: HTMLElement) => within(pill.closest('.filterPillWrapper') as HTMLElement).queryByRole('button', { name: /Vider ce champ/ });

	await step('Pills holding their default value display it as neutral, without clear button', async () => {
		await expect(simplePill).toHaveTextContent('Artichaut');
		await expect(simplePill).toHaveClass('is-default');
		await expect(queryClearer(simplePill)).not.toBeInTheDocument();

		await expect(multiPill).toHaveTextContent('2 légumes');
		await expect(multiPill).toHaveClass('is-default');
		await expect(queryClearer(multiPill)).not.toBeInTheDocument();
	});

	await step('Selecting another option makes the simple select pill active', async () => {
		await userEvent.click(simplePill);
		await waitForAngular();
		const options = await findPanelOptions();
		await userEvent.click(options[1]);
		await waitForAngular();
		await waitFor(() => expect(simplePill).toHaveAttribute('aria-expanded', 'false'));

		await expect(simplePill).toHaveTextContent('Asperge');
		await expect(simplePill).not.toHaveClass('is-default');
		await expect(getModelDisplay(0)).toHaveTextContent('Asperge');
		await expect(queryClearer(simplePill)).toBeInTheDocument();
	});

	await step('Clearing the simple select pill restores its default value', async () => {
		await userEvent.click(queryClearer(simplePill) as HTMLElement);
		await waitForAngular();

		await expect(simplePill).toHaveTextContent('Artichaut');
		await expect(simplePill).toHaveClass('is-default');
		await expect(getModelDisplay(0)).toHaveTextContent('Artichaut');
		await expect(queryClearer(simplePill)).not.toBeInTheDocument();
	});

	await step('Unselecting a default option makes the multi select pill active', async () => {
		await userEvent.click(multiPill);
		await waitForAngular();
		const [firstOption] = await findPanelOptions();
		await userEvent.click(firstOption);
		await waitForAngular();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(multiPill).toHaveAttribute('aria-expanded', 'false'));

		await expect(multiPill).not.toHaveClass('is-default');
		await expect(getModelDisplay(1)).not.toHaveTextContent('Artichaut');
		await expect(queryClearer(multiPill)).toBeInTheDocument();
	});

	await step('Clearing the multi select pill restores its default value', async () => {
		await userEvent.click(queryClearer(multiPill) as HTMLElement);
		await waitForAngular();

		await expect(multiPill).toHaveTextContent('2 légumes');
		await expect(multiPill).toHaveClass('is-default');
		await expect(getModelDisplay(1)).toHaveTextContent('Artichaut');
		await expect(getModelDisplay(1)).toHaveTextContent('Asperge');
		await expect(queryClearer(multiPill)).not.toBeInTheDocument();
	});
});
