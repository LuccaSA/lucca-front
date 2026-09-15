import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DialogComponent, DialogContentComponent, DialogFooterComponent, DialogHeaderComponent, LuDialogService, configureLuDialog, injectDialogRef, provideLuDialog } from '@lucca-front/ng/dialog';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta, StoryObj, applicationConfig } from '@storybook/angular-vite';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

@Component({
	selector: 'sb-tooltip-focus-return-dialog',
	template: `
		<lu-dialog>
			<lu-dialog-header>Fermez cette dialog</lu-dialog-header>

			<lu-dialog-content>À la fermeture, le focus revient sur le bouton déclencheur.</lu-dialog-content>

			<lu-dialog-footer>
				<button type="button" luButton (click)="ref.close()">Close</button>
			</lu-dialog-footer>
		</lu-dialog>
	`,
	imports: [DialogComponent, DialogHeaderComponent, DialogContentComponent, DialogFooterComponent, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TooltipFocusReturnDialogComponent {
	ref = injectDialogRef<void>();
}

@Component({
	selector: 'sb-tooltip-focus-return-story',
	template: `
		<p>Ouvrez puis fermez la dialog : la tooltip reste fermée quand le focus revient sur le déclencheur.</p>

		<button type="button" luButton="outlined" luTooltip="Ouvrir la dialog" (click)="openDialog()">Déclencheur</button>
	`,
	imports: [ButtonComponent, LuTooltipTriggerDirective],
	providers: [provideLuDialog()],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TooltipFocusReturnStory {
	#dialog = inject(LuDialogService);

	openDialog(): void {
		this.#dialog.open({ content: TooltipFocusReturnDialogComponent });
	}
}

export default {
	title: 'Documentation/Overlays/Tooltip/Retour de focus depuis un overlay',
	component: TooltipFocusReturnStory,
	decorators: [
		applicationConfig({
			providers: [configureLuDialog()],
		}),
	],
} as Meta;

export const OverlayFocusReturn: StoryObj<TooltipFocusReturnStory> = {};

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
