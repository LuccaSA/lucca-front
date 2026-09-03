import { isPlatformBrowser } from '@angular/common';
import { ApplicationRef, createComponent, EnvironmentInjector, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IconSpriteComponent } from './icon-sprite.component';

@Injectable({ providedIn: 'root' })
export class IconSpriteService {
	#applicationRef = inject(ApplicationRef);
	#environmentInjector = inject(EnvironmentInjector);
	#platformId = inject(PLATFORM_ID);
	#loaded = false;

	ensureSpriteLoaded(): void {
		if (this.#loaded || !isPlatformBrowser(this.#platformId)) {
			return;
		}
		this.#loaded = true;

		const componentRef = createComponent(IconSpriteComponent, { environmentInjector: this.#environmentInjector });
		document.body.append(componentRef.location.nativeElement as HTMLElement);
		this.#applicationRef.attachView(componentRef.hostView);
	}
}
