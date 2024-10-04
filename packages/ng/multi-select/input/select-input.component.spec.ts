import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, NgControl } from '@angular/forms';
import { LuMultiSelectInputComponent } from './select-input.component';

type Entity = { id: number; name: string };

describe('LuMultiSelectInputComponent', () => {
	let component: LuMultiSelectInputComponent<Entity>;
	let fixture: ComponentFixture<LuMultiSelectInputComponent<Entity>>;
	let nativeElement: HTMLElement;
	let searchControl: FormControl;

	beforeEach(() => {
		searchControl = new FormControl();

		TestBed.configureTestingModule({
			imports: [LuMultiSelectInputComponent],
			providers: [
				// The input inside the displayer needs a NgControl
				{
					provide: NgControl,
					useValue: searchControl,
				},
			],
		});

		fixture = TestBed.createComponent<LuMultiSelectInputComponent<Entity>>(LuMultiSelectInputComponent);
		component = fixture.componentInstance;
		nativeElement = fixture.nativeElement as HTMLElement;
		fixture.detectChanges();
	});

	it('should openPanel when ArrowDown', () => {
		// Arrange
		const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

		// Act
		nativeElement.dispatchEvent(event);

		// Assert
		expect(component.isPanelOpen).toBe(true);
	});

	it.each(['a', 'A', 'À'])('should openPanel and emit clueChange when pressing %s', (key) => {
		// Arrange
		const event = new KeyboardEvent('keydown', { key });
		const clueChangeSpy = jest.spyOn(component.clueChange, 'emit');

		// Act
		nativeElement.dispatchEvent(event);

		// Assert
		expect(component.isPanelOpen).toBe(true);
		expect(clueChangeSpy).toHaveBeenCalledWith(key);
	});

	it('should openPanel and but not emit clueChange when pressing Space', () => {
		// Arrange
		const event = new KeyboardEvent('keydown', { key: ' ' });
		const clueChangeSpy = jest.spyOn(component.clueChange, 'emit');

		// Act
		nativeElement.dispatchEvent(event);

		// Assert
		expect(component.isPanelOpen).toBe(true);
		expect(clueChangeSpy).not.toHaveBeenCalled();
	});

	it('should not open the panel when clicking the clearer', () => {
		// Arrange
		component.clearable = true;
		component.writeValue([{ id: 1, name: 'test' }]);
		fixture.detectChanges();

		const clearer = nativeElement.querySelector('.multipleSelect-clear');

		if (!(clearer instanceof HTMLElement)) {
			throw new Error('Clearer not found');
		}

		// Act
		clearer.click();

		// Assert
		expect(component.isPanelOpen).toBe(false);
		expect(component.value).toEqual([]);
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
});
