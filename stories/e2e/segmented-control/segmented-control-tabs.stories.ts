import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { StoryObj } from '@storybook/angular-vite';
import meta, { Basic } from '@/stories/navigation/segmented-control/angular/segmented-control-tabs.stories';

export default {
	...meta,
	title: 'E2E/SegmentedControl/Tabs',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const tablist = canvas.getByRole('tablist', { name: 'Lorem ipsum' });
		await expect(tablist).toBeVisible();
		const tabs = canvas.getAllByRole('tab');
		await expect(tabs.length).toBe(4);
	});

	await step('Clic sur un onglet', async () => {
		const tabs = canvas.getAllByRole('tab');
		await userEvent.click(tabs[1]);
		await waitForAngular();
		await expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
		await expect(canvas.getByText('Content Ipsum')).toBeVisible();
	});

	await step('Navigation clavier entre les onglets', async () => {
		const tabs = canvas.getAllByRole('tab');
		tabs[1].focus();
		await expect(tabs[1]).toHaveFocus();
		await userEvent.keyboard('{ArrowRight}');
		await waitForAngular();
		await expect(tabs[2]).toHaveFocus();
	});
});

const IconOnly: StoryObj = { ...Basic, name: 'Icon only', args: { ...Basic.args, withIcon: true, hiddenLabel: true } };

export const HiddenLabelTEST = createTestStory(IconOnly, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Icon-only tabs keep their accessible name', async () => {
		const tablist = canvas.getByRole('tablist', { name: 'Lorem ipsum' });
		await expect(within(tablist).getAllByRole('tab')).toHaveLength(4);
		await expect(canvas.getByRole('tab', { name: /Lorem/ })).toBeVisible();
		await expect(canvas.getByRole('tab', { name: 'Ipsum' })).toBeVisible();
		// The label stays in the DOM for assistive technologies, visually hidden
		await expect(canvas.getByText('Ipsum').closest('.pr-u-mask')).not.toBeNull();
	});

	await step('A tab with a hidden text label shows it as a tooltip on focus', async () => {
		const tab = canvas.getByRole('tab', { name: 'Ipsum' });
		tab.focus();
		await waitFor(() => expect(screen.getByRole('tooltip')).toHaveTextContent('Ipsum'));
		await expect(tab).not.toHaveAttribute('aria-describedby');
	});

	await step('Icon-only tabs can be navigated with the keyboard', async () => {
		await userEvent.click(canvas.getByRole('tab', { name: 'Ipsum' }));
		await waitForAngular();
		await userEvent.keyboard('{ArrowRight}');
		await waitForAngular();
		const next = canvas.getByRole('tab', { name: 'Dolor sit amet' });
		await expect(next).toHaveFocus();
		await expect(next).toHaveAttribute('aria-selected', 'true');
	});
});
