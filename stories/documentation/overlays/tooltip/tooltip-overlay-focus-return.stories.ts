import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DialogComponent, DialogContentComponent, DialogFooterComponent, DialogHeaderComponent, LuDialogService, configureLuDialog, injectDialogRef, provideLuDialog } from '@lucca-front/ng/dialog';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { focusSilently } from '@lucca/prisme/core';
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

		<button type="button" luButton="text">Point de départ</button>

		<button type="button" luButton="outlined" luTooltip="Ouvrir la dialog" (click)="openDialog()">Déclencheur</button>

		<button type="button" luButton="outlined" luTooltip="Ouvrir sans restauration" (click)="openDialogWithoutFocusRestoration()">Déclencheur sans restauration</button>
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

	openDialogWithoutFocusRestoration(): void {
		this.#dialog.open({ content: TooltipFocusReturnDialogComponent, cdkConfigOverride: { restoreFocus: false } });
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
	const start = () => canvas.getByRole('button', { name: /Point de départ/ });
	const trigger = () => canvas.getByRole('button', { name: /^Déclencheur$/ });
	const looseTrigger = () => canvas.getByRole('button', { name: /Déclencheur sans restauration/ });
	const tooltip = (text: RegExp) => screen.queryByText(text, { selector: '.tooltip' });
	const dialogTooltip = () => tooltip(/Ouvrir la dialog/);

	// The pointer stays off the triggers throughout, since hover legitimately opens the tooltip.
	const openThenClose = async (button: HTMLElement, close: () => Promise<void>) => {
		button.focus();
		button.click();
		await waitForAngular();
		await close();
		await waitForAngular();
	};

	const clickClose = (label: RegExp) => async () => {
		await userEvent.click(await screen.findByRole('button', { name: label }));
	};

	const pressEscape = async () => {
		await userEvent.keyboard('{Escape}');
	};

	// The tooltip has a 300ms enter delay, so leave it time to fail to appear.
	const expectStaysClosed = async (text: RegExp) => {
		await new Promise((resolve) => setTimeout(resolve, 600));
		await expect(tooltip(text)).toBeNull();
	};

	await step('Le retour du focus après une fermeture laisse la tooltip fermée', async () => {
		await openThenClose(trigger(), clickClose(/Fermer/));
		await expect(trigger()).toHaveFocus();
		await expectStaysClosed(/Ouvrir la dialog/);
	});

	await step('Idem via une fermeture avec résultat, que le bouton par défaut ne couvre pas', async () => {
		await openThenClose(trigger(), clickClose(/Close/));
		await expect(trigger()).toHaveFocus();
		await expectStaysClosed(/Ouvrir la dialog/);
	});

	await step('Idem via la touche Échap', async () => {
		await openThenClose(trigger(), pressEscape);
		await expect(trigger()).toHaveFocus();
		await expectStaysClosed(/Ouvrir la dialog/);
	});

	await step('La navigation au clavier ouvre toujours la tooltip', async () => {
		await userEvent.click(start());
		await userEvent.tab();
		await expect(trigger()).toHaveFocus();
		await waitFor(() => expect(dialogTooltip()).toBeVisible());
	});

	await step('Un focus programmatique, hors retour d’overlay, ouvre la tooltip', async () => {
		start().focus();
		await waitFor(() => expect(dialogTooltip()).toBeNull());
		trigger().focus();
		await waitFor(() => expect(dialogTooltip()).toBeVisible());
		start().focus();
	});

	await step('focusSilently laisse la tooltip fermée', async () => {
		start().focus();
		await waitFor(() => expect(dialogTooltip()).toBeNull());
		focusSilently(trigger());
		await expect(trigger()).toHaveFocus();
		await expectStaysClosed(/Ouvrir la dialog/);
		start().focus();
	});

	await step('Le survol ouvre toujours la tooltip', async () => {
		await userEvent.click(start());
		await userEvent.hover(trigger());
		await waitFor(() => expect(dialogTooltip()).toBeVisible());
		await userEvent.unhover(trigger());
	});

	await step('Sans restauration du focus, la navigation au clavier ouvre la tooltip du déclencheur', async () => {
		await openThenClose(looseTrigger(), clickClose(/Fermer/));
		await userEvent.click(start());
		await userEvent.tab();
		await userEvent.tab();
		await expect(looseTrigger()).toHaveFocus();
		await waitFor(() => expect(tooltip(/Ouvrir sans restauration/)).toBeVisible());
	});
});
