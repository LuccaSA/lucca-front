import { ApplicationRef } from '@angular/core';

export function setAriaHiddenOnApplicationRoot(applicationRef: ApplicationRef, hidden: boolean): void {
	for (const component of applicationRef.components) {
		const nativeElement = component.location.nativeElement as unknown;

		if (nativeElement instanceof HTMLElement) {
			nativeElement.ariaHidden = hidden ? 'true' : undefined;
		}
	}
}
