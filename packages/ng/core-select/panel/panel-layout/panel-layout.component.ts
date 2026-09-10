import { CdkTrapFocus } from '@angular/cdk/a11y';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';

/**
 * Shared floating surface for the simple/multi select panels.
 *
 * Carries the popover surface (elevation, scroll viewport, positioning) that used to live on the
 * deprecated `.lu-picker-panel` / `.lu-picker-content` styles, so panels no longer depend on them.
 * The projected content (a `lu-listbox`, an "add option" row, a footer…) is laid out inside the
 * scrollable content area; content marked with the `panel-header` attribute is projected above it,
 * outside the scroll viewport.
 */
@Component({
	selector: 'lu-select-panel-layout',
	templateUrl: './panel-layout.component.html',
	styleUrl: './panel-layout.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'lu-select-panel-layout',
		'[class.mod-bottomSheet]': 'bottomSheet()',
	},
	imports: [CdkTrapFocus],
})
export class LuSelectPanelLayoutComponent {
	/** Applies the `is-loading` state on the scroll content while options are being fetched. */
	readonly loading = input(false, { transform: booleanAttribute });

	/** Enables a focus trap on the scroll content (used by the single select panel). */
	readonly trapFocus = input(false, { transform: booleanAttribute });

	/**
	 * Turns the surface into a bottom sheet: the layout itself carries the elevation and is pinned
	 * full-width to the bottom of the viewport, while the scroll content sheds the popover chrome.
	 * Content projected into the `panel-header` slot then stays pinned above the scroll area.
	 */
	readonly bottomSheet = input(false, { transform: booleanAttribute });

	/** `tabindex` to set on the scroll content, or `null` to leave it non-focusable. */
	readonly contentTabIndex = input<number | null>(null);

	/** Emitted when the scroll content is scrolled (used to trigger pagination). */
	readonly scrolled = output<Event>();
}
