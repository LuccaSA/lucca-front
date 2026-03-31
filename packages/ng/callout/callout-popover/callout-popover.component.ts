import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChildren, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { Palette, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective, PopoverPosition } from '@lucca-front/ng/popover2';
import { CalloutFeedbackItemComponent } from '../callout-feedback-item/callout-feedback-item.component';
import { CalloutIconPipe } from '../callout-icon.pipe';
import { CalloutPopoverSize, CalloutState } from '../callout.type';
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
	readonly openDelay = input(50, { transform: numberAttribute });

	/**
	 * Debounce for the popover to close (mouse will have to be out of both popover and trigger for closeDelay milliseconds for it to close)
	 */
	readonly closeDelay = input(500, { transform: numberAttribute });

	/**
	 * Label (visual only) to put inside the button, often used to show just a number
	 */
	readonly buttonLabel = input<string>();

	/**
	 * Alternative for the button
	 */
	readonly buttonAlt = input<string>('');

	/**
	 * Hide callout popover title if there is only one item
	 */
	readonly headingHiddenIfSingleItem = input(false, { transform: booleanAttribute });

	readonly popoverTrigger = input<'click' | 'click+hover' | 'hover+focus'>('click+hover');

	/**
	 * Palette for both the button and the popover content
	 */
	readonly palette = input<Palette>('none');

	/**
	 * Size for both button and popover content
	 */
	readonly size = input<CalloutPopoverSize>();

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

	/**
	 * Defines callout popover open position above by default
	 */
	readonly popoverPosition = input<PopoverPosition>('above');

	/**
	 * Defines custom callout popover open position override popoverPosition
	 */
	readonly customPopoverPositions = input<ConnectionPositionPair[]>();

	readonly feedbackItems = contentChildren(CalloutFeedbackItemComponent, { descendants: true });

	readonly contentSize = computed<'S' | 'M' | undefined>(() => {
		const size = this.size();
		return size === 'XS' ? 'S' : size;
	});

	readonly calloutOverlayClasses = computed(() => ({
		[`mod-${this.contentSize()}`]: !!this.contentSize(),
	}));

	readonly calloutPalette = computed(() => getCalloutPalette(this.state(), this.palette()));

	readonly calloutClasses = computed(() => {
		const palette = this.calloutPalette();
		return {
			[`mod-${this.size()}`]: !!this.size(),
			[`palette-${palette}`]: !!palette,
		};
	});

	readonly calloutOverlayHeadClasses = computed(() => ({
		[`palette-${this.calloutPalette()}`]: !!this.calloutPalette(),
	}));
}
