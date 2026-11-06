import { createTestStory } from '@/helpers/stories';
import { expectNgModelDisplay, waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/filter-pills/angular/checkbox-filter-pill.stories';

export default {
	...meta,
	title: 'E2E/FilterPill/Checkbox',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const pill = canvas.getByRole('button', { name: /Inclure les collaborateurs partis/ });

	await step('Initial state: the pill is not pressed', async () => {
		await expect(pill).toHaveAttribute('aria-pressed', 'false');
		await expectNgModelDisplay(canvasElement, 'false');
	});

	await step('Clicking the pill toggles the value', async () => {
		await userEvent.click(pill);
		await waitForAngular();
		await expect(pill).toHaveAttribute('aria-pressed', 'true');
		await expectNgModelDisplay(canvasElement, 'true');
	});

	await step('Space and Enter toggle the value', async () => {
		pill.focus();
		await userEvent.keyboard(' ');
		await waitForAngular();
		await expect(pill).toHaveAttribute('aria-pressed', 'false');
		await expectNgModelDisplay(canvasElement, 'false');

		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(pill).toHaveAttribute('aria-pressed', 'true');
		await expectNgModelDisplay(canvasElement, 'true');
	});

	await step('A checkbox pill never shows a clear button', async () => {
		await expect(within(pill.closest('.filterPillWrapper') as HTMLElement).queryByRole('button', { name: /Vider ce champ/ })).not.toBeInTheDocument();
	});
});
