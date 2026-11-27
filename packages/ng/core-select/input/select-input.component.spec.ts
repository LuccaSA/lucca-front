describe('ALuSelectInputComponent', () => {
	it('should not fail because test suite is empty', () => {});
});

import { ComponentFixture } from '@angular/core/testing';
import { ALuSelectInputComponent } from './select-input.component';

export type TestEntity = { id: number; name: string };

type LuSelectInputComponentTestSuiteConfig<TValue> = {
	getFixture: () => ComponentFixture<ALuSelectInputComponent<TestEntity, TValue>>;
	exampleValue: TValue;
	emptyValue: TValue | null;
	/** The value of the select once this option alone is picked */
	toValue: (option: TestEntity) => TValue;
	clearerSelector: string;
	/** Whether the input displays the clue through a binding, so the browser must not insert the opening key itself */
	inputBoundToClue: boolean;
};

const vegetables: TestEntity[] = [
	{ id: 1, name: 'Carrot' },
	{ id: 2, name: 'Leek' },
	{ id: 3, name: 'Turnip' },
];

// CDK's ActiveDescendantKeyManager reads event.keyCode, which happy-dom won't infer from `key`.
const keyCodes: Record<string, number> = { ArrowDown: 40, Enter: 13, Escape: 27, Tab: 9 };

/**
 * These tests are common to simple and multi select input components
 */
export function runALuSelectInputComponentTestSuite<TValue>(config: LuSelectInputComponentTestSuiteConfig<TValue>): void {
	let component: ALuSelectInputComponent<TestEntity, TValue>;
	let fixture: ComponentFixture<ALuSelectInputComponent<TestEntity, TValue>>;
	let nativeElement: HTMLElement;

	beforeEach(() => {
		vi.useFakeTimers();
		fixture = config.getFixture();
		component = fixture.componentInstance;
		nativeElement = fixture.nativeElement as HTMLElement;
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	/** Renders the select and its panel, then what they deferred to timers */
	async function render(): Promise<void> {
		fixture.detectChanges();
		// Not runAllTimersAsync: happy-dom has no layout, so the panel waits for its highlighted
		// option to get a height (scrollIntoViewOnceReady) one animation frame after another, forever
		await vi.runOnlyPendingTimersAsync();
		fixture.detectChanges();
	}

	function combobox(): HTMLInputElement {
		const input = nativeElement.querySelector<HTMLInputElement>('input[role="combobox"]');
		if (!input) {
			throw new Error('Combobox not found');
		}
		return input;
	}

	async function openPanelWithOptions(): Promise<void> {
		fixture.componentRef.setInput('options', vegetables);
		component.openPanel();
		await render();
	}

	async function press(key: string, init: KeyboardEventInit = {}): Promise<KeyboardEvent> {
		const event = new KeyboardEvent('keydown', { key, keyCode: keyCodes[key], bubbles: true, cancelable: true, ...init });
		combobox().dispatchEvent(event);
		await render();
		return event;
	}

	function highlightedOptionName(): string {
		const id = combobox().getAttribute('aria-activedescendant');
		return (id && document.getElementById(id)?.textContent?.trim()) ?? '';
	}

	it('should openPanel when ArrowDown', async () => {
		// Arrange
		const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

		// Act
		nativeElement.dispatchEvent(event);
		await vi.runAllTimersAsync();

		// Assert
		expect(component.isPanelOpen).toBe(true);
	});

	it.each(['a', 'A', 'À'])('should openPanel and emit clueChange when pressing %s and select is searchable', async (key) => {
		// Arrange
		const event = new KeyboardEvent('keydown', { key });
		const clueChangeSpy = vi.spyOn(component.clueChange$, 'next');
		component.clueChange$.subscribe(); // Emulate a `(clueChange)=""` binding

		// Act
		nativeElement.dispatchEvent(event);
		await vi.runAllTimersAsync();

		// Assert
		expect(component.isPanelOpen).toBe(true);
		expect(clueChangeSpy).toHaveBeenCalledWith(key);
	});

	it(`should ${config.inputBoundToClue ? '' : 'not '}prevent the browser from inserting the letter that opens the panel`, async () => {
		// Arrange
		const event = new KeyboardEvent('keydown', { key: 'a', cancelable: true });
		component.clueChange$.subscribe(); // Emulate a `(clueChange)=""` binding

		// Act
		nativeElement.dispatchEvent(event);
		await vi.runAllTimersAsync();

		// Assert
		expect(component.isPanelOpen).toBe(true);
		expect(event.defaultPrevented).toBe(config.inputBoundToClue);
	});

	it.each(['a', 'A', 'À'])('should openPanel and not emit clueChange when pressing %s and select is not searchable', async (key) => {
		// Arrange
		const event = new KeyboardEvent('keydown', { key });
		const clueChangeSpy = vi.spyOn(component.clueChange$, 'next');

		// Act
		nativeElement.dispatchEvent(event);
		await vi.runAllTimersAsync();

		// Assert
		expect(component.isPanelOpen).toBe(true);
		expect(clueChangeSpy).not.toHaveBeenCalled();
	});

	it('should openPanel and but not emit clueChange when pressing Space', async () => {
		// Arrange
		const event = new KeyboardEvent('keydown', { key: ' ' });
		const clueChangeSpy = vi.spyOn(component.clueChange$, 'next');

		// Act
		nativeElement.dispatchEvent(event);
		await vi.runAllTimersAsync();

		// Assert
		expect(component.isPanelOpen).toBe(true);
		expect(clueChangeSpy).not.toHaveBeenCalled();
	});

	it('should not open the panel when clicking the clearer', () => {
		// Arrange
		component.clearable.set(true);
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
		const clueChangeSpy = vi.spyOn(component.clueChange$, 'next');

		// Act
		nativeElement.dispatchEvent(event);

		// Assert
		expect(component.isPanelOpen).toBe(false);
		expect(clueChangeSpy).not.toHaveBeenCalled();
	});

	it('should not throw nor open the panel on a keydown event without key (e.g. browser autofill)', () => {
		// Arrange
		const event = new Event('keydown');

		// Act
		nativeElement.dispatchEvent(event);

		// Assert
		expect(component.isPanelOpen).toBe(false);
	});

	it('should stay non-searchable once the panel has been opened', async () => {
		// Arrange — no `(clueChange)` binding, so the select must never turn searchable
		const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

		// Act
		nativeElement.dispatchEvent(event);
		await vi.runAllTimersAsync();
		fixture.detectChanges();

		// Assert
		expect(component.isPanelOpen).toBe(true);
		expect(component.searchable).toBe(false);
	});

	it('should update filter pill disabled signal when disabled state changes', () => {
		// Assert initial state
		expect(component.filterPillDisabled?.()).toBe(false);

		// Act
		component.setDisabledState(true);

		// Assert
		expect(component.filterPillDisabled?.()).toBe(true);
	});

	it('should not open the panel when disabled', () => {
		// Arrange
		component.setDisabledState(true);
		fixture.detectChanges();

		// Act
		component.openPanel();

		// Assert
		expect(component.isPanelOpen).toBe(false);
	});

	it('should let Escape reach the page when the panel is closed, so a dialog around the select can close', async () => {
		// Arrange
		const pageListener = vi.fn();
		document.addEventListener('keydown', pageListener);

		// Act
		await press('Escape');
		document.removeEventListener('keydown', pageListener);

		// Assert
		expect(pageListener).toHaveBeenCalledOnce();
	});

	it.each([{ ctrlKey: true }, { metaKey: true }])('should leave a paste shortcut to the browser instead of opening the panel (%o)', (modifier) => {
		// Arrange
		const event = new KeyboardEvent('keydown', { key: 'v', ...modifier });

		// Act
		nativeElement.dispatchEvent(event);

		// Assert
		expect(component.isPanelOpen).toBe(false);
	});

	it('should open the panel on a character typed with AltGr, which browsers report as Ctrl+Alt', async () => {
		// Arrange
		const event = new KeyboardEvent('keydown', { key: '€', ctrlKey: true, altKey: true });

		// Act
		nativeElement.dispatchEvent(event);
		await vi.runAllTimersAsync();

		// Assert
		expect(component.isPanelOpen).toBe(true);
	});

	describe('with the panel open', () => {
		it('should close the panel on Escape without changing the value', async () => {
			// Arrange
			component.writeValue(config.exampleValue);
			await openPanelWithOptions();

			// Act
			await press('Escape');

			// Assert
			expect(component.isPanelOpen).toBe(false);
			expect(component.value).toEqual(config.exampleValue);
		});

		it('should keep Escape from reaching the page, so a dialog around the select stays open', async () => {
			// Arrange
			await openPanelWithOptions();
			const pageListener = vi.fn();
			document.addEventListener('keydown', pageListener);

			// Act
			await press('Escape');
			document.removeEventListener('keydown', pageListener);

			// Assert
			expect(pageListener).not.toHaveBeenCalled();
		});

		it('should close the panel on Tab', async () => {
			// Arrange
			await openPanelWithOptions();

			// Act
			await press('Tab');

			// Assert
			expect(component.isPanelOpen).toBe(false);
		});

		it('should empty the search field when the panel closes', async () => {
			// Arrange
			component.clueChange$.subscribe(); // Emulate a `(clueChange)=""` binding
			await openPanelWithOptions();
			combobox().value = 'car';
			combobox().dispatchEvent(new Event('input'));
			await render();

			// Act
			await press('Escape');
			await render(); // NgModel writes the emptied clue into the field asynchronously

			// Assert
			expect(combobox().value).toBe('');
		});

		it('should emit panelClosed once and mark the control as touched when the panel closes', async () => {
			// Arrange
			const onTouched = vi.fn();
			const panelClosed = vi.fn();
			component.registerOnTouched(onTouched);
			component.panelClosed.subscribe(panelClosed);
			await openPanelWithOptions();

			// Act
			await press('Escape');

			// Assert
			expect(panelClosed).toHaveBeenCalledOnce();
			expect(onTouched).toHaveBeenCalled();
		});

		it('should give the focus back to the combobox when the panel closes', async () => {
			// Arrange
			await openPanelWithOptions();
			combobox().blur();

			// Act
			await press('Escape');

			// Assert
			expect(document.activeElement).toBe(combobox());
		});

		it('should pick the highlighted option on Enter without submitting the form', async () => {
			// Arrange
			const onChange = vi.fn();
			component.registerOnChange(onChange);
			await openPanelWithOptions();
			await press('ArrowDown');

			// Act
			const event = await press('Enter');

			// Assert
			expect(event.defaultPrevented).toBe(true);
			expect(onChange).toHaveBeenCalledExactlyOnceWith(config.toValue(vegetables[1]));
		});

		it.each([{ ctrlKey: true }, { shiftKey: true }])('should leave Enter to the browser when pressed with a modifier (%o)', async (modifier) => {
			// Arrange
			const onChange = vi.fn();
			component.registerOnChange(onChange);
			await openPanelWithOptions();

			// Act
			const event = await press('Enter', modifier);

			// Assert
			expect(event.defaultPrevented).toBe(false);
			expect(onChange).not.toHaveBeenCalled();
		});

		it('should point aria-activedescendant at the option the arrow keys highlight', async () => {
			// Arrange
			await openPanelWithOptions();

			// Act
			await press('ArrowDown');
			const afterOnePress = highlightedOptionName();
			await press('ArrowDown');

			// Assert
			expect(afterOnePress).toContain(vegetables[1].name);
			expect(highlightedOptionName()).toContain(vegetables[2].name);
		});

		it('should clear aria-activedescendant when the panel closes', async () => {
			// Arrange
			await openPanelWithOptions();
			await press('ArrowDown');
			const highlightedBeforeClosing = highlightedOptionName();

			// Act
			await press('Escape');

			// Assert
			expect(highlightedBeforeClosing).toContain(vegetables[1].name);
			expect(combobox().getAttribute('aria-activedescendant') ?? '').toBe('');
		});
	});
}
