import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChildren, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { Palette, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { CalloutFeedbackItemComponent } from '../callout-feedback-item/callout-feedback-item.component';
import { CalloutIconPipe } from '../callout-icon.pipe';
import { CalloutState } from '../callout-state';
import { getCalloutPalette } from '../callout.utils';

@Component({
	selector: 'lu-callout-popover',
	imports: [IconComponent, PortalDirective, PopoverDirective, CalloutIconPipe],
	templateUrl: './callout-popover.component.html',
	styleUrl: './callout-popover.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class CalloutPopoverComponent {
	/**
	 * Debounce for the popover to open (mouse will have to be on the element fox openDelay milliseconds for popover to show)
	 */
	readonly openDelay = input(50, {
		transform: numberAttribute,
	});

	/**
	 * Debounce for the popover to close (mouse will have to be out of both popover and trigger for closeDelay milliseconds for it to close)
	 */
	readonly closeDelay = input(500, {
		transform: numberAttribute,
	});

	/**
	 * Label (visual only) to put inside the button, often used to show just a number
	 */
	readonly buttonLabel = input<string>('');

	/**
	 * Alternative for the button
	 */
	buttonAlt = input<string>('');

	headingHiddenIfSingleItem = input(false, { transform: booleanAttribute });

	/**
	 * Palette for both the button and the popover content
	 */
	readonly palette = input<Palette>('none');

	/**
	 * Size for both button and popover content
	 */
	readonly size = input<'M' | 'S' | 'XS'>();

	/**
	 * Icon shows in button and next to popover's title
	 */
	readonly icon = input<LuccaIcon>();

	/**
	 * State is a shorthand to set the icon and the palette to the recommended values for the icon and palette based on
	 * the provided state.
	 *
	 * If one of the icon or palette inputs are filled along with the state input, their values will have the priority over
	 * state (so setting state to success and palette to warning will make the palette warning)
	 */
	readonly state = input<CalloutState>();

	/**
	 * Heading for the details popover
	 */
	readonly heading = input<PortalContent>();

	feedbackItems = contentChildren(CalloutFeedbackItemComponent, { descendants: true });

	contentSize = computed((): 'S' | 'M' | undefined => {
		const size = this.size();
		if (size === 'XS') {
			return 'S';
		}
		return size;
	});

	calloutClasses = computed(() => {
		const palette = getCalloutPalette(this.state(), this.palette());
		return {
			[`mod-${this.size()}`]: !!this.size(),
			[`palette-${palette}`]: !!palette,
		};
	});

	calloutOverlayClasses = computed(() => {
		return {
			[`mod-${this.contentSize}`]: !!this.contentSize,
		};
	});

	calloutOverlayHeadClasses = computed(() => {
		const palette = getCalloutPalette(this.state(), this.palette());
		return {
			[`palette-${palette}`]: !!palette,
		};
	});
}
