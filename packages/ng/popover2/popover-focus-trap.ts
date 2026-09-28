import { FocusTrap, InteractivityChecker } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import { inject, Injector, NgZone } from '@angular/core';

export class PopoverFocusTrap extends FocusTrap {
	override startAnchorListener = () => {
		this.triggerElement.focus();
		return true;
	};

	override endAnchorListener = () => {
		this.triggerElement.focus();
		return true;
	};

	constructor(
		element: HTMLElement,
		private triggerElement: HTMLElement,
		private injector: Injector,
	) {
		super(element, inject(InteractivityChecker), inject(NgZone), inject(DOCUMENT), true, injector);
	}
}
