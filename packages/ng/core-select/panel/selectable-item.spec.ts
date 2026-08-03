import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LuDisabledOptionDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { CoreSelectPanelElement } from './selectable-item';

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

describe(CoreSelectPanelElement.name, () => {
	let fixture: ComponentFixture<DisabledOptionHostComponent>;
	let overlayContainerElement: HTMLElement;

	beforeEach(() => {
		fixture = TestBed.createComponent(DisabledOptionHostComponent);
		fixture.detectChanges();
		overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
	});

	it('should expose aria-disabled on the options disabled through luDisabledOption', fakeAsync(() => {
		// Arrange
		const select = fixture.nativeElement.querySelector('lu-simple-select') as HTMLElement;

		// Act
		select.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
		fixture.detectChanges();
		tick(20);
		fixture.detectChanges();

		// Assert
		const renderedOptions = Array.from(overlayContainerElement.querySelectorAll('[role="option"]'));
		expect(renderedOptions.map((option) => option.getAttribute('aria-disabled'))).toEqual(['false', 'true']);
	}));
});
