import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LuDisabledOptionDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { vi } from 'vitest';

type Entity = { id: number; name: string };

const options: Entity[] = [
	{ id: 1, name: 'test 1' },
	{ id: 2, name: 'test 2' },
];

@Component({
	selector: 'lu-disabled-option-host',
	imports: [FormsModule, LuSimpleSelectInputComponent, LuOptionDirective, LuDisabledOptionDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-simple-select #select [ngModel]="selected" [options]="options">
			<span *luOption="let option; select: select" [luDisabledOption]="option.id === 2">{{ option.name }}</span>
		</lu-simple-select>
	`,
})
class DisabledOptionHostComponent {
	selected: Entity | null = null;

	options = options;
}

describe('CoreSelectPanelElement', () => {
	let fixture: ComponentFixture<DisabledOptionHostComponent>;

	beforeEach(() => {
		vi.useFakeTimers();
		fixture = TestBed.createComponent(DisabledOptionHostComponent);
		fixture.detectChanges();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should expose aria-disabled on the options disabled through luDisabledOption', async () => {
		// Arrange
		const select = fixture.nativeElement.querySelector('lu-simple-select') as HTMLElement;

		// Act
		select.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
		await vi.runAllTimersAsync();
		fixture.detectChanges();

		// Assert
		const renderedOptions = Array.from(document.querySelectorAll('[role="option"]'));
		expect(renderedOptions.map((option) => option.getAttribute('aria-disabled'))).toEqual([null, 'true']);
	});
});
