import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ALuDateAdapter, LuNativeDateAdapter, luDefaultNativeDateAdapterOptions } from '@lucca-front/ng/core';
import { LuDateInputDirective } from './date-input.directive';

@Component({
	selector: 'lu-date-input-host',
	imports: [ReactiveFormsModule, LuDateInputDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <input luDateInput [formControl]="formControl" /> `,
})
class DateInputHostComponent {
	formControl = new FormControl<Date | null>(new Date(2024, 0, 15));
}

describe(LuDateInputDirective.name, () => {
	let fixture: ComponentFixture<DateInputHostComponent>;
	let host: DateInputHostComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [DateInputHostComponent],
			providers: [{ provide: ALuDateAdapter, useFactory: () => new LuNativeDateAdapter('en-US', luDefaultNativeDateAdapterOptions) }],
		});

		fixture = TestBed.createComponent(DateInputHostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
	});

	function type(text: string): void {
		const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
		input.value = text;
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
	}

	it('should update the control when a date is typed', () => {
		// Act
		type('02/20/2024');

		// Assert
		expect(host.formControl.value).toEqual(new Date(2024, 1, 20));
	});

	it('should empty the control when the date is erased', () => {
		// Act
		type('');

		// Assert
		expect(host.formControl.value).toBeNull();
	});
});
