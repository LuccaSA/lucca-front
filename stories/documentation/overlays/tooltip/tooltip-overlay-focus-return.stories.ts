import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DialogComponent, DialogContentComponent, DialogFooterComponent, DialogHeaderComponent, LuDialogService, configureLuDialog, injectDialogRef, provideLuDialog } from '@lucca-front/ng/dialog';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta, StoryObj, applicationConfig } from '@storybook/angular-vite';

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
