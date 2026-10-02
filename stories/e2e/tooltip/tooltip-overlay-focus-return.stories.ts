import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import meta, { OverlayFocusReturn } from '@/stories/overlays/tooltip/tooltip-overlay-focus-return.stories';

export default {
	...meta,
	title: 'E2E/Tooltip/OverlayFocusReturn',
	tags: ['!autodocs'],
};

export const OverlayFocusReturnTEST = createTestStory(OverlayFocusReturn, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const trigger = () => canvas.getByRole('button', { name: /Déclencheur/ });
	const tooltip = () => screen.queryByText(/Ouvrir la dialog/, { selector: '.tooltip' });

	// The pointer stays off the trigger throughout: hover legitimately opens the tooltip.
	const openThenCloseWith = async (closeLabel: RegExp) => {
		trigger().focus();
		trigger().click();
		await waitForAngular();
		await userEvent.click(await screen.findByRole('button', { name: closeLabel }));
		await waitForAngular();
	};

	// The tooltip has a 300ms enter delay, so leave it time to fail to appear.
	const expectStaysClosed = async () => {
		await new Promise((resolve) => setTimeout(resolve, 600));
		await expect(tooltip()).toBeNull();
	};

	await step('Le retour du focus après une fermeture laisse la tooltip fermée', async () => {
		await openThenCloseWith(/Fermer/);
		await expect(trigger()).toHaveFocus();
		await expectStaysClosed();
	});

	await step('Idem via une fermeture avec résultat, que le bouton par défaut ne couvre pas', async () => {
		await openThenCloseWith(/Close/);
		await expect(trigger()).toHaveFocus();
		await expectStaysClosed();
	});

	await step('Le survol ouvre toujours la tooltip', async () => {
		await userEvent.hover(trigger());
		await waitFor(() => expect(tooltip()).toBeVisible());
	});
});
