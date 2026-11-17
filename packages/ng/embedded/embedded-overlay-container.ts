import { OverlayContainer } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { LuEmbeddedShadowRoots } from './embedded-shadow-roots';

/**
 * Creates the overlay container inside the shadow root of the embedded application, where its styles live.
 */
@Injectable()
export class LuEmbeddedOverlayContainer extends OverlayContainer {
	readonly #shadowRoots = inject(LuEmbeddedShadowRoots);

	protected override _createContainer(): void {
		super._createContainer();
		this.#shadowRoots.current?.appendChild(this._containerElement as HTMLElement);
	}
}
