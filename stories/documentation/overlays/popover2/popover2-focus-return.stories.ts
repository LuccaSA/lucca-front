import { ButtonComponent } from '@lucca-front/ng/button';
import { configureLuPopover, PopoverDirective } from '@lucca-front/ng/popover2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { createTestStory } from '../../../helpers/stories';

export default {
	title: 'Documentation/Overlays/Popover2/Retour de focus depuis le panneau',
	component: PopoverDirective,
	decorators: [
		applicationConfig({
			providers: [configureLuPopover()],
		}),
		moduleMetadata({
			imports: [ButtonComponent, PopoverDirective],
		}),
	],
} as Meta;

export const FocusReturn: StoryObj<PopoverDirective> = {
	render: () => ({
		template: `<p>Le panneau s’ouvre au focus. À sa fermeture, le focus revient sur le déclencheur sans le réouvrir.</p>

<button type="button" luButton="text">Point de départ</button>

<button
	type="button"
	luButton
	[luPopover2]="contentRef"
	luPopoverTrigger="hover+focus"
	[luPopoverOpenDelay]="0"
	[luPopoverCloseDelay]="0"
>Déclencheur</button>

<ng-template #contentRef>
	<p>Contenu du panneau.</p>
</ng-template>
`,
	}),
};

export const FocusReturnTEST = createTestStory(FocusReturn, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const start = () => canvas.getByRole('button', { name: /Point de départ/ });
	const trigger = () => canvas.getByRole('button', { name: /Déclencheur/ });
	const panel = () => screen.queryByText(/Contenu du panneau/);

	const tabToTrigger = async () => {
		await userEvent.click(start());
		await userEvent.tab();
		await expect(trigger()).toHaveFocus();
	};

	await step('La navigation au clavier ouvre le panneau', async () => {
		await tabToTrigger();
		await waitFor(() => expect(panel()).toBeVisible());
	});

	await step('Le retour du focus après une fermeture laisse le panneau fermé', async () => {
		await userEvent.tab();
		await userEvent.click(await screen.findByRole('button', { name: /Fermer/ }));
		await waitForAngular();
		await expect(trigger()).toHaveFocus();
		await new Promise((resolve) => setTimeout(resolve, 400));
		await expect(panel()).toBeNull();
	});

	await step('Un focus programmatique, hors retour d’overlay, ouvre le panneau', async () => {
		start().focus();
		trigger().focus();
		await waitFor(() => expect(panel()).toBeVisible());
		await userEvent.click(await screen.findByRole('button', { name: /Fermer/ }));
		await waitForAngular();
	});

	await step('Une nouvelle navigation au clavier réouvre le panneau', async () => {
		await tabToTrigger();
		await waitFor(() => expect(panel()).toBeVisible());
	});
});
