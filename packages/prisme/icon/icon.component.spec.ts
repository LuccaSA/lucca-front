import { ChangeDetectionStrategy, Component, input, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { IconSpriteService } from './icon-sprite.service';
import { IconComponent } from './icon.component';
import type { LuccaIcon } from './icons';

@Component({
	selector: 'lu-icon-test',
	imports: [IconComponent],
	template: `<lu-icon [icon]="icon()" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	icon = input.required<LuccaIcon>();
	cmp = viewChild.required(IconComponent);
}

describe(IconComponent.name, () => {
	let fixture: ComponentFixture<HostComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HostComponent],
			providers: [{ provide: IconSpriteService, useValue: { ensureSpriteLoaded: vi.fn() } }],
		});
		fixture = TestBed.createComponent(HostComponent);
	});

	describe('spriteIconId', () => {
		it('should keep a single-word canonical icon unchanged', () => {
			// Arrange
			fixture.componentRef.setInput('icon', 'heart');
			// Act
			fixture.detectChanges();
			// Assert
			expect(fixture.componentInstance.cmp().spriteIconId()).toBe('heart');
		});

		it('should convert a multi-word canonical icon to kebab-case', () => {
			// Arrange
			fixture.componentRef.setInput('icon', 'arrowBackward');
			// Act
			fixture.detectChanges();
			// Assert
			expect(fixture.componentInstance.cmp().spriteIconId()).toBe('arrow-backward');
		});

		it('should resolve a single-word deprecated alias to its canonical icon', () => {
			// Arrange
			fixture.componentRef.setInput('icon', 'apps');
			// Act
			fixture.detectChanges();
			// Assert
			expect(fixture.componentInstance.cmp().spriteIconId()).toBe('app');
		});

		it('should resolve a deprecated alias to a multi-word canonical icon, in kebab-case', () => {
			// Arrange
			fixture.componentRef.setInput('icon', 'backward');
			// Act
			fixture.detectChanges();
			// Assert
			expect(fixture.componentInstance.cmp().spriteIconId()).toBe('arrow-backward');
		});
	});
});
