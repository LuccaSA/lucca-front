import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';

@Component({
	selector: 'lu-tooltip',
	standalone: true,
	templateUrl: './tooltip.component.html',
	styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
	message: string;
}

@Directive({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '[luTooltip]',
	standalone: true,
})
export class TooltipDirective {
	#portal: ComponentPortal<TooltipComponent>;
	#viewContainerRef: ViewContainerRef;
	#message: string;

	@Input('luTooltip')
	get message() {
		return this.#message;
	}
	set message(value: string) {
		this.#message = value;

		this._elementRef.nativeElement.addEventListener('mouseenter', () => {
			this.show();
		});

		this._elementRef.nativeElement.addEventListener('mouseleave', () => {
			this.hide();
		});
	}
	constructor(protected _elementRef: ElementRef<HTMLElement>) {}

	show() {
		//const overlayRef = this._createOverlay(origin);
		this.#portal = this.#portal || new ComponentPortal(TooltipComponent, this.#viewContainerRef);
		//const instance = (this._tooltipInstance = overlayRef.attach(this._portal).instance);
	}

	hide() {}
}
