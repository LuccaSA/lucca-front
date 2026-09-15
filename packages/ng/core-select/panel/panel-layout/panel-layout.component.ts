import { CdkTrapFocus } from '@angular/cdk/a11y';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';

/**
 * Shared floating surface for the simple/multi select panels.
 *
 * Carries the popover surface (elevation, scroll viewport, positioning) that used to live on the
 * deprecated `.lu-picker-panel` / `.lu-picker-content` styles, so panels no longer depend on them.
 * The projected content (a `lu-listbox`, an "add option" row, a footer…) is laid out inside the
 * scrollable content area.
 */
@Component({
	selector: 'lu-select-panel-layout',
	templateUrl: './panel-layout.component.html',
	styleUrl: './panel-layout.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'lu-select-panel-layout',
	},
	imports: [CdkTrapFocus],
})
export class LuSelectPanelLayoutComponent {
	/** Applies the `is-loading` state on the scroll content while options are being fetched. */
	readonly loading = input(false, { transform: booleanAttribute });

	/** Enables a focus trap on the scroll content (used by the single select panel). */
	readonly trapFocus = input(false, { transform: booleanAttribute });

	/** `tabindex` to set on the scroll content, or `null` to leave it non-focusable. */
	readonly contentTabIndex = input<number | null>(null);

	/** Emitted when the scroll content is scrolled (used to trigger pagination). */
	readonly scrolled = output<Event>();
}
