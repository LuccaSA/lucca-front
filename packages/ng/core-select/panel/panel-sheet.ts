import { ComponentType } from '@angular/cdk/overlay';
import { Injector } from '@angular/core';
import { LuDialogConfig, LuDialogRef, LuDialogService } from '@lucca-front/ng/dialog';

/**
 * Opens a select panel as a bottom sheet.
 *
 * Below the `S` breakpoint the panel stops being a popover anchored to the field and becomes a modal
 * surface pinned to the bottom of the viewport. That surface already exists as the dialog's `sheet`
 * mode — backdrop, blocked page scroll, slide up animation, focus trap, focus restoration and close
 * button all come with it — so the panel is opened as a dialog instead of as a bespoke overlay.
 *
 * @param dialogService the dialog service provided alongside the select input
 * @param panel the panel component to render inside the sheet
 * @param injector the injector carrying the panel ref and the select input for the panel
 * @param ariaLabel names the sheet, so it stays named even before its header has rendered
 */
export function openSelectPanelSheet<TPanel>(dialogService: LuDialogService, panel: ComponentType<TPanel>, injector: Injector, ariaLabel: string): LuDialogRef<TPanel, never> {
	const config: LuDialogConfig<TPanel, never> = {
		content: panel,
		mode: 'sheet',
		size: 'maxContent',
		ariaLabel: ariaLabel || undefined,
		// The panel ref and the select input reach the panel through this injector: the dialog's own
		// `providers` hook is reserved by the service for `LuDialogRef`.
		cdkConfigOverride: { injector },
	};

	return dialogService.open<TPanel, never>(config);
}
