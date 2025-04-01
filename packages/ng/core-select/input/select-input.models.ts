import { OverlayRef } from '@angular/cdk/overlay';
import { ElementRef, Provider, inject } from '@angular/core';
import { SELECT_ID, SELECT_LABEL, SELECT_LABEL_ID } from '../select.model';

let selectId = 0;

function selectIdFactory(): number {
	return selectId++;
}

function selectLabelFactory(): HTMLLabelElement | undefined {
	const elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	function getLabel(node: HTMLElement): HTMLLabelElement | undefined {
		if (node instanceof HTMLLabelElement) {
			return node;
		}

		if (!node.parentElement) {
			return undefined;
		}

		return getLabel(node.parentElement);
	}

	return getLabel(elementRef.nativeElement);
}

function selectLabelIdFactory(): string {
	return inject(SELECT_LABEL)?.id || `lu-select-label-${inject(SELECT_ID)}`;
}

export function provideLuSelectLabelsAndIds(): Provider[] {
	return [
		{ provide: SELECT_ID, useFactory: selectIdFactory },
		{ provide: SELECT_LABEL, useFactory: selectLabelFactory },
		{ provide: SELECT_LABEL_ID, useFactory: selectLabelIdFactory },
	];
}

export function addAttributesOnCdkContainer(overlayRef: OverlayRef, selectLabelId: string, selectId: number) {
	const potentialCdkOverlayContainer = overlayRef?.overlayElement?.parentElement?.parentElement;
	if (potentialCdkOverlayContainer && potentialCdkOverlayContainer.className.includes('cdk-overlay-container')) {
		potentialCdkOverlayContainer.setAttribute('aria-labelledby', selectLabelId);
		potentialCdkOverlayContainer.id = `lu-select-overlay-container-${selectId}`;
	}
}
