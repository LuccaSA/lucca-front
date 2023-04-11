import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { ElementRef, Injectable, Provider, inject } from '@angular/core';
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

@Injectable()
class LuSelectOverlayContainer extends OverlayContainer {
	private selectLabelId = inject(SELECT_LABEL_ID);
	private selectId = inject(SELECT_ID);

	constructor() {
		super(inject(DOCUMENT), inject(Platform));
	}

	protected override _createContainer(): void {
		super._createContainer();
		this._containerElement.setAttribute('aria-labelledby', this.selectLabelId);
		this._containerElement.id = `lu-select-overlay-container-${this.selectId}`;
	}
}

export function provideLuSelectOverlayContainer(): Provider[] {
	return [
		Overlay,
		{
			provide: OverlayContainer,
			useClass: LuSelectOverlayContainer,
		},
	];
}
