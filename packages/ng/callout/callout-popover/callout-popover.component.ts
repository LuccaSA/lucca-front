import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, numberAttribute, OnDestroy, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@lucca-front/ng/icon';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Palette } from '../../core/type';
import { LuccaIcon } from '@lucca-front/icons';
import { ButtonComponent } from '../../button/button.component';

@Component({
	selector: 'lu-callout-popover',
	standalone: true,
	imports: [CommonModule, IconComponent, ButtonComponent],
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
})
export class CalloutPopoverComponent implements OnDestroy {
	#overlay = inject(Overlay);
	#viewContainerRef = inject(ViewContainerRef);
	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

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
	icon: LuccaIcon = 'signInfo';

	/**
	 * Heading for the details popover
	 */
	@Input({ required: true })
	heading: string;

	get contentSize(): 'S' | 'M' | undefined {
		if (this.size === 'XS') {
			return 'S';
		}
		return this.size;
	}

	public showContent() {
		// Don't open if we still have one opened
		if (this._showDelayId) {
			return;
		}
		clearTimeout(this._hideDelayId as number);
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

		// Hide on leaving the panel, but pass the event in case we're going back to trigger element
		this.#overlayRef.overlayElement.onmouseleave = (event: MouseEvent) => this.hideContent(event);

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
				}
			}
		}, this.closeDelay);
	}

	ngOnDestroy(): void {
		this.hideContent(null);
	}
}
