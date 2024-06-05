import { Directive, ElementRef, HostListener, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ConnectedPosition, ConnectionPositionPair, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PopoverContentComponent } from './content/popover-content/popover-content.component';
import { PopoverFocusTrap } from './popover-focus-trap';

export type PopoverPosition = 'above' | 'below' | 'before' | 'after';

@Directive({
	selector: '[luPopover2]',
	providers: [PopoverFocusTrap],
	standalone: true,
})
export class PopoverDirective {
	#overlay = inject(Overlay);

	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	#vcr = inject(ViewContainerRef);

	#focusManager = new PopoverFocusTrap(this.#elementRef.nativeElement);

	@Input({
		alias: 'luPopover2',
	})
	content: TemplateRef<unknown>;

	@Input()
	luPopoverPosition: PopoverPosition = 'above';

	#overlayRef: OverlayRef;

	positionPairs: Record<PopoverPosition, ConnectionPositionPair> = {
		above: new ConnectionPositionPair(
			{ originX: 'center', originY: 'top' },
			{
				overlayX: 'center',
				overlayY: 'bottom',
			},
		),
		below: new ConnectionPositionPair(
			{ originX: 'center', originY: 'bottom' },
			{
				overlayX: 'center',
				overlayY: 'top',
			},
		),
		before: new ConnectionPositionPair(
			{ originX: 'start', originY: 'center' },
			{
				overlayX: 'end',
				overlayY: 'center',
			},
		),
		after: new ConnectionPositionPair(
			{ originX: 'end', originY: 'center' },
			{
				overlayX: 'start',
				overlayY: 'center',
			},
		),
	};

	@HostListener('click')
	openPopover(): void {
		this.#overlayRef = this.#overlay.create({
			positionStrategy: this.#overlay.position().flexibleConnectedTo(this.#elementRef).withPositions(this.#buildPositions()),
			scrollStrategy: this.#overlay.scrollStrategies.block(),
		});
		const componentRef = this.#overlayRef.attach(new ComponentPortal(PopoverContentComponent, this.#vcr));
		componentRef.instance.content = this.content;
		componentRef.instance.ref = this.#overlayRef;
	}

	#buildPositions(): ConnectedPosition[] {
		const opposite: Record<PopoverPosition, PopoverPosition> = {
			before: 'after',
			after: 'before',
			above: 'below',
			below: 'above',
		};
		// Once we have opposite, what's remaining?
		const remaining: Record<PopoverPosition, PopoverPosition[]> = {
			before: ['above', 'below'],
			after: ['above', 'below'],
			above: ['before', 'after'],
			below: ['before', 'after'],
		};
		return [this.positionPairs[this.luPopoverPosition], this.positionPairs[opposite[this.luPopoverPosition]], ...remaining[this.luPopoverPosition].map((r) => this.positionPairs[r])];
	}
}
