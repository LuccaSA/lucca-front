import {
	Directive,
	Input,
	Output,
	EventEmitter,
	ElementRef,
	ViewContainerRef,
} from '@angular/core';
import {
	Overlay,
	OverlayConfig,
} from '@angular/cdk/overlay';

import { LuPopoverTrigger } from '../../popover';
import { LuSelectPicker } from '../picker/select-picker.component';
import { LuSelectOption } from '../option/select-option.component';

/**
 * Directive to put on a div to allow it to react with a popover to emulate a select component
 */
@Directive({
	selector: 'div[luSelect]',
})
export class LuSelectDirective
extends LuPopoverTrigger {

	/** the name of the picker linked to this input */
	@Input('luSelect') popover: LuSelectPicker<any>;
	@Output() close = new EventEmitter();

	constructor(
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
		// protected _renderer: Renderer2,
	) {
		super(
			_overlay,
			_elementRef,
			_viewContainerRef,
		);
	}
	/** Open the popover linked to the directive */
	openPopover(): void {
		super.openPopover();
		this._subscribeToBackdrop();
	}

	closePopover(): void {
		super.closePopover();
		this.close.emit();
	}
	protected _getOverlayConfig(): OverlayConfig {
		const config = super._getOverlayConfig();
		config.hasBackdrop = true;
		config.backdropClass = 'cdk-overlay-transparent-backdrop';
		const clientRect = this._elementRef.nativeElement.getBoundingClientRect();
		config.minWidth = `${clientRect.width}px`;
		return config;
	}
}
