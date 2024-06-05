import { FocusTrap, InteractivityChecker } from '@angular/cdk/a11y';
import { inject, Injectable, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class PopoverFocusTrap extends FocusTrap {
	override startAnchorListener = () => {
		console.log('startAnchorListener');
		return true;
	};

	override endAnchorListener = () => {
		console.log('endAnchorListener');
		return true;
	};

	constructor(element: HTMLElement) {
		super(element, inject(InteractivityChecker), inject(NgZone), inject(DOCUMENT), true);
	}
}
