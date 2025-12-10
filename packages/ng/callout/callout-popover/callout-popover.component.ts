import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChildren,
	ElementRef,
	inject,
	input,
	numberAttribute,
	OnDestroy,
	TemplateRef,
	viewChild,
	ViewContainerRef,
	ViewEncapsulation,
} from '@angular/core';
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
export class CalloutPopoverComponent implements OnDestroy {
	#overlay = inject(Overlay);
	#viewContainerRef = inject(ViewContainerRef);
	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	readonly overlayOrigin = viewChild<ElementRef>('overlayOriginRef');

	readonly overlayContent = viewChild<TemplateRef<unknown>>('overlayContentRef');

	#overlayRef: OverlayRef;

	// Using unknown here because it's using Node types for whatever reason but it's a number
	#hideDelayId: unknown | undefined;

	// Using unknown here because it's using Node types for whatever reason but it's a number
	#showDelayId: unknown | undefined;

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

	readonly headingHiddenIfSingleItem = input(false, { transform: booleanAttribute });

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

	public showContent() {
		clearTimeout(this.#hideDelayId as number);
		// Don't open if we still have one opened
		if (this.#showDelayId) {
			return;
		}
		this.#showDelayId = setTimeout(() => {
			this.createPanelContent();
			this.#hideDelayId = undefined;
		}, this.openDelay());
	}

	private createPanelContent() {
		const positionStrategy = this.#overlay
			.position()
			.flexibleConnectedTo(this.overlayOrigin())
			.withPositions([
				{
					originX: 'center',
					originY: 'top',
					overlayX: 'center',
					overlayY: 'bottom',
				},
				{
					originX: 'center',
					originY: 'bottom',
					overlayX: 'center',
					overlayY: 'top',
				},
			]);

		this.#overlayRef = this.#overlay.create({
			positionStrategy,
		});

		const portal = new TemplatePortal(this.overlayContent(), this.#viewContainerRef);

		this.#overlayRef.attach(portal);
	}

	public hideContent(event: MouseEvent | null) {
		clearTimeout(this.#showDelayId as number);
		this.#hideDelayId = setTimeout(() => {
			const newTarget = event?.relatedTarget as Node | null;
			// This is to prevent tooltip closing when user puts cursor on tooltip, thus leaving the origin trigger
			if (!newTarget || !(this.#overlayRef?.overlayElement?.contains(newTarget) || this.#elementRef?.nativeElement?.contains(newTarget))) {
				// Remove the tooltip if needed.
				if (this.#overlayRef) {
					this.#overlayRef.dispose();
					this.#showDelayId = undefined;
					this.#hideDelayId = undefined;
				}
			}
		}, this.closeDelay());
	}

	ngOnDestroy(): void {
		this.hideContent(null);
	}
}
