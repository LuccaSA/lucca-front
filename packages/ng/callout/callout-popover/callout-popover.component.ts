import { ChangeDetectionStrategy, Component, ElementRef, inject, OnDestroy, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@lucca-front/ng/icon';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'lu-callout-popover',
	standalone: true,
	imports: [CommonModule, IconComponent],
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

	@ViewChild('overlayOriginRef')
	overlayOrigin: ElementRef;

	@ViewChild('overlayContentRef')
	overlayContent: TemplateRef<unknown>;

	readonly openDelay = 50;
	readonly closeDelay = 50;

	#overlayRef: OverlayRef;

	// Using unknown here because it's using Node types for whatever reason but it's a number
	private _hideDelayId: unknown | undefined;

	// Using unknown here because it's using Node types for whatever reason but it's a number
	private _showDelayId: unknown | undefined;

	public showContent() {
		clearTimeout(this._hideDelayId as number);

		this._showDelayId = setTimeout(() => {
			this.createPanelContent();
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
			]);

		this.#overlayRef = this.#overlay.create({
			positionStrategy,
		});

		// Hide on leaving the panel
		this.#overlayRef.overlayElement.onmouseleave = () => this.hideContent(null);

		const portal = new TemplatePortal(this.overlayContent, this.#viewContainerRef);

		this.#overlayRef.attach(portal);
	}

	public hideContent(event: MouseEvent | null) {
		clearTimeout(this._showDelayId as number);
		this._hideDelayId = setTimeout(() => {
			const newTarget = event?.relatedTarget as Node | null;
			// This is to prevent tooltip closing when user puts cursor on tooltip, thus leaving the origin trigger
			if (!newTarget || !this.#overlayRef?.overlayElement.contains(newTarget)) {
				// Remove the tooltip if needed.
				if (this.#overlayRef) {
					this.#overlayRef.dispose();
				}
			}
		}, this.closeDelay);
	}

	ngOnDestroy(): void {
		this.hideContent(null);
	}
}
