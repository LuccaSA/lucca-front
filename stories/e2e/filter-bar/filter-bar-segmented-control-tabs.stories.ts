import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { StoryObj } from '@storybook/angular-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import meta, { SegmentedControlTabs } from '@/stories/forms/filter-pills/angular/filter-bar-segmented-control-tabs.stories';

export default {
	...meta,
	title: 'E2E/FilterBar/SegmentedControlTabs',
	tags: ['!autodocs'],
};

export const SegmentedControlTabsTEST = createTestStory(SegmentedControlTabs, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const filterBar = canvasElement.querySelector('lu-filter-bar')!;
	const getTab = (name: string) => canvas.getByRole('tab', { name });

	await step('The tabs are displayed in the filter bar, their panels below it', async () => {
		const tablist = canvas.getByRole('tablist', { name: 'Affichage' });
		await expect(filterBar).toContainElement(tablist);
		await expect(getTab('Liste')).toHaveAttribute('aria-selected', 'true');
		await expect(canvas.getByRole('tabpanel', { name: 'Liste' })).toBeVisible();
		await expect(filterBar).not.toContainElement(canvas.getByRole('tabpanel', { name: 'Liste' }));
		// Without actions, the divider is the last element of the scroll box, hidden
		await expect(filterBar.querySelector('.filterBar-scrollBox-divider')).not.toBeVisible();
	});

	await step('Clicking a tab displays its panel', async () => {
		await userEvent.click(getTab('Grille'));
		await waitForAngular();
		await expect(getTab('Grille')).toHaveAttribute('aria-selected', 'true');
		await expect(canvas.getByRole('tabpanel', { name: 'Grille' })).toBeVisible();
		await expect(canvas.queryByRole('tabpanel', { name: 'Liste' })).not.toBeInTheDocument();
	});

	await step('The tabs can be navigated with the keyboard', async () => {
		getTab('Grille').focus();
		await userEvent.keyboard('{ArrowLeft}');
		await waitForAngular();
		await expect(getTab('Liste')).toHaveFocus();
		await expect(getTab('Liste')).toHaveAttribute('aria-selected', 'true');
		await userEvent.keyboard('{End}');
		await waitForAngular();
		await expect(getTab('Grille')).toHaveFocus();
		await expect(getTab('Grille')).not.toHaveAttribute('tabindex');
		await expect(getTab('Liste')).toHaveAttribute('tabindex', '-1');
	});

	await step('A focused tab displays its tooltip, which is not announced as a description', async () => {
		await waitFor(() => expect(screen.getByRole('tooltip')).toHaveTextContent('Grille'));
		await expect(getTab('Grille')).not.toHaveAttribute('aria-describedby');
	});
});

const SegmentedControlTabsWithActions: StoryObj = { ...SegmentedControlTabs, name: 'Segmented control tabs with actions', args: { ...SegmentedControlTabs.args, actionButton: true } };

export const SegmentedControlTabsWithActionsTEST = createTestStory(SegmentedControlTabsWithActions, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const filterBar = canvasElement.querySelector('lu-filter-bar')!;

	await step('The actions follow the tabs, separated by a divider', async () => {
		const tablist = canvas.getByRole('tablist', { name: 'Affichage' });
		const exportButton = canvas.getByRole('button', { name: 'Exporter' });
		const divider = filterBar.querySelector('.filterBar-scrollBox-divider')!;

		await expect(exportButton).toBeVisible();
		await expect(divider).toBeVisible();
		await expect(tablist.compareDocumentPosition(divider) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
		await expect(divider.compareDocumentPosition(exportButton) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
	});
});
