describe('ALuSelectInputComponent', () => {
	it('should not fail because test suite is empty', () => {});
});

import { ComponentFixture } from '@angular/core/testing';
import { ALuSelectInputComponent } from './select-input.component';

export type TestEntity = { id: number; name: string };

type LuSelectInputComponentTestSuiteConfig<TValue> = {
	getFixture: () => ComponentFixture<ALuSelectInputComponent<TestEntity, TValue>>;
	exampleValue: TValue;
	emptyValue: TValue;
	clearerSelector: string;
};

/**
 * These tests are common to simple and multi select input components
 */
export function runALuSelectInputComponentTestSuite<TValue>(config: LuSelectInputComponentTestSuiteConfig<TValue>): void {
	let component: ALuSelectInputComponent<TestEntity, TValue>;
	let fixture: ComponentFixture<ALuSelectInputComponent<TestEntity, TValue>>;
	let nativeElement: HTMLElement;

	beforeEach(() => {
		fixture = config.getFixture();
		component = fixture.componentInstance;
		nativeElement = fixture.nativeElement as HTMLElement;
	});

	it('should openPanel when ArrowDown', async () => {
		// Arrange
		const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

		// Act
		nativeElement.dispatchEvent(event);
		await fixture.whenStable();

		// Assert
		expect(component.isPanelOpen).toBe(true);
	});

	it.each(['a', 'A', 'À'])('should openPanel and emit clueChange when pressing %s', async (key) => {
		// Arrange
		const event = new KeyboardEvent('keydown', { key });
		const clueChangeSpy = jest.spyOn(component.clueChange, 'emit');

		// Act
		nativeElement.dispatchEvent(event);
		await fixture.whenStable();

		// Assert
		expect(component.isPanelOpen).toBe(true);
		expect(clueChangeSpy).toHaveBeenCalledWith(key);
	});

	it('should openPanel and but not emit clueChange when pressing Space', async () => {
		// Arrange
		const event = new KeyboardEvent('keydown', { key: ' ' });
		const clueChangeSpy = jest.spyOn(component.clueChange, 'emit');

		// Act
		nativeElement.dispatchEvent(event);
		await fixture.whenStable();

		// Assert
		expect(component.isPanelOpen).toBe(true);
		expect(clueChangeSpy).not.toHaveBeenCalled();
	});

	it('should not open the panel when clicking the clearer', () => {
		// Arrange
		component.clearable = true;
		component.writeValue(config.exampleValue);
		fixture.detectChanges();

		const clearer = nativeElement.querySelector(config.clearerSelector);

		if (!(clearer instanceof HTMLElement)) {
			throw new Error('Clearer not found');
		}

		// Act
		clearer.click();

		// Assert
		expect(component.isPanelOpen).toBe(false);
		expect(component.value).toEqual(config.emptyValue);
	});

	it.each(['ArrowLeft', 'ArrowRight', 'Backspace', 'Meta'])('should not open the panel when sending not a letter events (%s)', (key) => {
		// Arrange
		const event = new KeyboardEvent('keydown', { key });
		const clueChangeSpy = jest.spyOn(component.clueChange, 'emit');

		// Act
		nativeElement.dispatchEvent(event);

		// Assert
		expect(component.isPanelOpen).toBe(false);
		expect(clueChangeSpy).not.toHaveBeenCalled();
	});
}
