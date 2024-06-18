import { FocusTrap, InteractivityChecker } from '@angular/cdk/a11y';
import { inject, Injectable, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
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
	) {
		super(element, inject(InteractivityChecker), inject(NgZone), inject(DOCUMENT), true);
	}
}
