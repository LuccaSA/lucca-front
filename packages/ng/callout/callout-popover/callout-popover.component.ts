import { ChangeDetectionStrategy, Component, ElementRef, inject, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@lucca-front/ng/icon';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
	selector: 'lu-callout-popover',
	standalone: true,
	imports: [CommonModule, IconComponent],
	templateUrl: './callout-popover.component.html',
	styleUrls: ['./callout-popover.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutPopoverComponent {
	#overlay = inject(Overlay);
	#viewContainerRef = inject(ViewContainerRef);

	@ViewChild('overlayOriginRef')
	overlayOrigin: ElementRef;

	@ViewChild('overlayContentRef')
	overlayContent: TemplateRef<unknown>;

	#overlayRef: OverlayRef;

	public showContent() {
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

		const portal = new TemplatePortal(this.overlayContent, this.#viewContainerRef);

		this.#overlayRef.attach(portal);
	}

	public hideContent() {
		if (this.#overlayRef) {
			this.#overlayRef.dispose();
		}
	}
}
