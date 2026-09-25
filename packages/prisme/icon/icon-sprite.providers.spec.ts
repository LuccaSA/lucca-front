import { ApplicationInitStatus } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { IconSpriteService } from './icon-sprite.service';
import { provideLuIconSpritePreload } from './icon-sprite.providers';

describe(provideLuIconSpritePreload.name, () => {
	it('should trigger the sprite load during app initialization', async () => {
		// Arrange
		const ensureSpriteLoaded = vi.fn();
		TestBed.configureTestingModule({
			providers: [provideLuIconSpritePreload(), { provide: IconSpriteService, useValue: { ensureSpriteLoaded } }],
		});
		// Act
		await TestBed.inject(ApplicationInitStatus).donePromise;
		// Assert
		expect(ensureSpriteLoaded).toHaveBeenCalledOnce();
	});
});
