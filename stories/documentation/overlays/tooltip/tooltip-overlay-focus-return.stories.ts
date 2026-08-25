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
		<p>Ouvrez puis fermez chaque dialog : seul le second garde sa tooltip fermée au retour du focus.</p>

		<button type="button" luButton="outlined" class="pr-u-marginInlineEnd200" luTooltip="Comportement par défaut" (click)="openDialog()">Sans l’option</button>

		<button type="button" luButton="outlined" luTooltip="Pas de tooltip au retour du focus" luTooltipNotOnOverlayFocusReturn (click)="openDialog()">Avec l’option</button>
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
	const trigger = (name: RegExp) => canvas.getByRole('button', { name });
	const tooltip = (text: RegExp) => screen.queryByText(text, { selector: '.tooltip' });

	// The pointer stays off the triggers throughout: hover legitimately opens the tooltip.
	const openThenCloseWith = async (name: RegExp, closeLabel: RegExp) => {
		trigger(name).focus();
		trigger(name).click();
		await waitForAngular();
		await userEvent.click(await screen.findByRole('button', { name: closeLabel }));
		await waitForAngular();
	};

	// The tooltip has a 300ms enter delay, so leave it time to fail to appear.
	const expectStaysClosed = async (text: RegExp) => {
		await new Promise((resolve) => setTimeout(resolve, 600));
		await expect(tooltip(text)).toBeNull();
	};

	await step('Sans l’option, le retour du focus ouvre la tooltip', async () => {
		await openThenCloseWith(/Sans l’option/, /Fermer/);
		await expect(trigger(/Sans l’option/)).toHaveFocus();
		await waitFor(() => expect(tooltip(/Comportement par défaut/)).toBeVisible());
	});

	await step('Avec l’option, le retour du focus laisse la tooltip fermée', async () => {
		await openThenCloseWith(/Avec l’option/, /Fermer/);
		await expect(trigger(/Avec l’option/)).toHaveFocus();
		await expectStaysClosed(/Pas de tooltip au retour du focus/);
	});

	await step('Idem via une fermeture avec résultat, que le bouton par défaut ne couvre pas', async () => {
		await openThenCloseWith(/Avec l’option/, /Close/);
		await expect(trigger(/Avec l’option/)).toHaveFocus();
		await expectStaysClosed(/Pas de tooltip au retour du focus/);
	});
});
