import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	DialogComponent,
	DialogContentComponent,
	DialogFooterComponent,
	DialogHeaderComponent,
	LuDialogService,
	configureLuDialog,
	injectDialogRef,
	provideLuDialog,
} from '@lucca-front/ng/dialog';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta, StoryObj, applicationConfig } from '@storybook/angular-vite';

@Component({
	selector: 'sb-tooltip-focus-return-dialog',
	template: `
		<lu-dialog>
			<lu-dialog-header>Fermez cette dialog</lu-dialog-header>

			<lu-dialog-content>À la fermeture, le focus revient sur le bouton déclencheur.</lu-dialog-content>

			<lu-dialog-footer>
				<button type="button" luButton (click)="ref.close()">Fermer</button>
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
