import { animate, state, style, transition, trigger } from '@angular/animations';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, numberAttribute, OnDestroy, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { ButtonComponent } from '@lucca-front/ng/button';
import { getIntl, Palette, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { CalloutIconPipe } from '../callout-icon.pipe';
import { CalloutState } from '../callout-state';
import { getCalloutPalette } from '../callout.utils';
import { LU_CALLOUT_TRANSLATIONS } from '../callout.translate';

@Component({
	selector: 'lu-callout-popover',
	standalone: true,
	imports: [IconComponent, PortalDirective, CalloutIconPipe, NgClass],
	animations: [
		trigger('tooltip', [
			state(
				'enter',
				style({
					opacity: 1,
					transform: `scale(1)`,
				}),
			),
			transition('void => *', [
				style({
					opacity: 0,
					transform: `scale(0)`,
				}),
				animate(`150ms cubic-bezier(0.25, 0.8, 0.25, 1)`),
			]),
			transition('* => void', [animate('50ms 100ms linear', style({ opacity: 0 }))]),
		]),
	],
	templateUrl: './callout-popover.component.html',
	styleUrls: ['./callout-popover.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class CalloutPopoverComponent implements OnDestroy {
	#overlay = inject(Overlay);
	#viewContainerRef = inject(ViewContainerRef);
	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	protected intl = getIntl(LU_CALLOUT_TRANSLATIONS);

	@ViewChild('overlayOriginRef')
	overlayOrigin: ElementRef;

	@ViewChild('overlayContentRef')
	overlayContent: TemplateRef<unknown>;

	#overlayRef: OverlayRef;

	// Using unknown here because it's using Node types for whatever reason but it's a number
	private _hideDelayId: unknown | undefined;

	// Using unknown here because it's using Node types for whatever reason but it's a number
	private _showDelayId: unknown | undefined;

	/**
	 * Debounce for the popover to open (mouse will have to be on the element fox openDelay milliseconds for popover to show)
	 */
	@Input({ transform: numberAttribute })
	readonly openDelay = 50;

	/**
	 * Debounce for the popover to close (mouse will have to be out of both popover and trigger for closeDelay milliseconds for it to close)
	 */
	@Input({ transform: numberAttribute })
	readonly closeDelay = 500;

	/**
	 * Label to put inside the button, often used to show just a number
	 */
	@Input()
	buttonLabel: string;

	/**
	 * Palette for both the button and the popover content
	 */
	@Input()
	palette: Palette = 'none';

	/**
	 * Size for both button and popover content
	 */
	@Input()
	size?: 'M' | 'S' | 'XS';

	/**
	 * Icon shows in button and next to popover's title
	 */
	@Input()
	icon: LuccaIcon;

	@Input()
	/**
	 * State is a shorthand to set the icon and the palette to the recommended values for the icon and palette based on
	 * the provided state.
	 *
	 * If one of the icon or palette inputs are filled along with the state input, their values will have the priority over
	 * state (so setting state to success and palette to warning will make the palette warning)
	 */
	state: CalloutState;

	/**
	 * Heading for the details popover
	 */
	@Input({ required: true })
	heading: PortalContent;

	get calloutClasses() {
		const palette = getCalloutPalette(this.state, this.palette);
		return {
			[`mod-${this.size}`]: !!this.size,
			[`palette-${palette}`]: !!palette,
		};
	}

	get calloutOverlayClasses() {
		return {
			[`mod-${this.size}`]: !!this.size,
		};
	}

	get calloutOverlayHeadClasses() {
		const palette = getCalloutPalette(this.state, this.palette);
		return {
			[`palette-${palette}`]: !!palette,
		};
	}

	public showContent() {
		clearTimeout(this._hideDelayId as number);
		// Don't open if we still have one opened
		if (this._showDelayId) {
			return;
		}
		this._showDelayId = setTimeout(() => {
			this.createPanelContent();
			delete this._hideDelayId;
		}, this.openDelay);
	}

	private createPanelContent() {
		const positionStrategy = this.#overlay
			.position()
			.flexibleConnectedTo(this.overlayOrigin)
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

		const portal = new TemplatePortal(this.overlayContent, this.#viewContainerRef);

		this.#overlayRef.attach(portal);
	}

	public hideContent(event: MouseEvent | null) {
		clearTimeout(this._showDelayId as number);
		this._hideDelayId = setTimeout(() => {
			const newTarget = event?.relatedTarget as Node | null;
			// This is to prevent tooltip closing when user puts cursor on tooltip, thus leaving the origin trigger
			if (!newTarget || !(this.#overlayRef?.overlayElement?.contains(newTarget) || this.#elementRef?.nativeElement?.contains(newTarget))) {
				// Remove the tooltip if needed.
				if (this.#overlayRef) {
					this.#overlayRef.dispose();
					delete this._showDelayId;
					delete this._hideDelayId;
				}
			}
		}, this.closeDelay);
	}

	ngOnDestroy(): void {
		this.hideContent(null);
	}
}
