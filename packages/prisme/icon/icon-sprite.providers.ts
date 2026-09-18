import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { IconSpriteService } from './icon-sprite.service';

/**
 * Triggers the icon sprite fetch at application startup instead of waiting for the first `<lu-icon>`/`<pr-icon>` to mount.
 * Optional: without it, the sprite still loads lazily on first icon usage.
 */
export function provideLuIconSpritePreload(): EnvironmentProviders {
	return makeEnvironmentProviders([
		provideAppInitializer(() => {
			inject(IconSpriteService).ensureSpriteLoaded();
		}),
	]);
}
