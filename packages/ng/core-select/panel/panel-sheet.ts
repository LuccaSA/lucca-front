import { ComponentType } from '@angular/cdk/overlay';
import { ApplicationRef, Injector } from '@angular/core';
import { LuDialogConfig, LuDialogRef, LuDialogService } from '@lucca-front/ng/dialog';
import { take } from 'rxjs';

/**
 * Opens a select panel as a bottom sheet.
 *
 * Below the `S` breakpoint the panel stops being a popover anchored to the field and becomes a modal
 * surface pinned to the bottom of the viewport. That surface already exists as the dialog's `sheet`
 * mode — backdrop, blocked page scroll, focus trap, focus restoration and close button all come with
 * it — so the panel is opened as a dialog instead of as a bespoke overlay.
 *
 * The opening animation is disabled (`mod-select`, styled by the select packages themselves — see their
 * `sheet` mixin) and the search input is focused by hand instead of through CDK's `autoFocus`. iOS
 * Safari only raises the virtual keyboard for a `focus()` call made synchronously inside the tap that
 * triggered it; CDK's own autofocus defers the actual `focus()` through `afterNextRender`, which always
 * lands after that window has closed, so the keyboard silently never opens. Forcing a render with
 * `ApplicationRef.tick()` right here — still inside the same synchronous call stack as the tap — makes
 * the search input exist in the DOM in time to focus it for real, and skipping the animation keeps the
 * sheet from visibly jumping once the keyboard's own viewport resize kicks in immediately after.
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
		// `mod-select` lets the select packages scope their own dialog header tweaks (centered title,
		// close button pulled out of flow, no opening animation) without reaching into the generic
		// dialog styles.
		panelClasses: ['mod-select'],
		// The panel ref and the select input reach the panel through this injector: the dialog's own
		// `providers` hook is reserved by the service for `LuDialogRef`. `autoFocus: false` disables
		// CDK's own deferred autofocus — the search input is focused by hand right below instead.
		cdkConfigOverride: { injector, autoFocus: false },
	};

	const dialogRef = dialogService.open<TPanel, never>(config);

	injector.get(ApplicationRef).tick();
	const searchInput = dialogRef.cdkRef.overlayRef.overlayElement.querySelector<HTMLInputElement>('.textField-input-value');
	searchInput?.focus();

	trackVisibleViewport(dialogRef);

	return dialogRef;
}

/**
 * Keeps `--components-dialog-visibleViewportBlockSize` and `--components-dialog-insetBlockEnd`
 * in sync with the visual viewport for as long as the sheet stays open.
 *
 * iOS doesn't shrink the layout viewport when the on-screen keyboard opens — only the visual one — so
 * a sheet pinned with a plain `bottom: 0` stays anchored to the bottom of the full, keyboard-unaware
 * layout viewport, which is now hidden behind the keyboard: most of the sheet renders underneath it,
 * clamped height or not. Nudging `bottom` up by the amount the keyboard currently obscures — on top of
 * clamping the max height — keeps the sheet entirely above the keyboard, using all the space that's
 * actually visible, instead of a second, outer page scroll on top of the listbox's own.
 *
 * Set on the sheet's own overlay element rather than `document.documentElement`: these custom properties
 * are also read by any other dialog in `mode: 'sheet'` (e.g. approbation-inbox's), and a document-wide
 * value would leak this select's keyboard tracking onto an unrelated sheet stacked underneath it.
 */
function trackVisibleViewport<TPanel>(dialogRef: LuDialogRef<TPanel, never>): void {
	const viewport = window.visualViewport;
	if (!viewport) {
		return;
	}

	const style = dialogRef.cdkRef.overlayRef.overlayElement.style;
	const update = (): void => {
		style.setProperty('--components-dialog-visibleViewportBlockSize', `${viewport.height}px`);
		style.setProperty('--components-dialog-insetBlockEnd', `${window.innerHeight - viewport.height - viewport.offsetTop}px`);
		// The initially-selected option scrolls into view as soon as it's rendered (see
		// `scrollIntoViewOnceReady`), which — with the opening animation disabled — happens before the
		// keyboard has finished opening and before the resize above has clamped the sheet down to its
		// final size. That earlier scroll position is stale once the sheet's own geometry has changed
		// size underneath it, so it's redone here on every viewport update, landing correctly once the
		// keyboard settles.
		dialogRef.cdkRef.overlayRef.overlayElement.querySelector('.is-highlighted')?.scrollIntoView({ block: 'nearest' });
	};
	update();
	viewport.addEventListener('resize', update);
	viewport.addEventListener('scroll', update);

	dialogRef.closed$.pipe(take(1)).subscribe(() => {
		viewport.removeEventListener('resize', update);
		viewport.removeEventListener('scroll', update);
		style.removeProperty('--components-dialog-visibleViewportBlockSize');
		style.removeProperty('--components-dialog-insetBlockEnd');
	});
}
