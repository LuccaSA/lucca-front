import { ChangeDetectionStrategy, Component, computed, ElementRef, Signal, signal, Type, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { injectNgControl } from './inject-ng-control';
import { NoopValueAccessorDirective } from './noop-value-accessor.directive';

@Component({
	selector: 'lu-custom-control',
	imports: [ReactiveFormsModule],
	hostDirectives: [NoopValueAccessorDirective],
	template: `<input #htmlInput [formControl]="ngControl.control" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomControl {
	readonly ngControl = injectNgControl();
	readonly htmlInput = viewChild<ElementRef<HTMLInputElement>>('htmlInput');
}

@Component({
	selector: 'lu-ng-model-host',
	imports: [CustomControl, FormsModule],
	template: `<lu-custom-control [(ngModel)]="value" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgModelHost {
	readonly value = signal('Initial');
	readonly customControl = viewChild(CustomControl);
}

describe('injectNgControl', () => {
	function createHost<T extends { customControl: Signal<CustomControl> }>(cmp: Type<T>) {
		TestBed.configureTestingModule({
			imports: [cmp],
		});

		const fixture = TestBed.createComponent(cmp);
		return { fixture, host: fixture.componentInstance, nativeInput: computed(() => fixture.componentInstance.customControl().htmlInput().nativeElement) };
	}

	it('a', () => {
		// Arrange
		const { host, nativeInput } = createHost(NgModelHost);

		// Act
		nativeInput().value = 'Changed';
		nativeInput().dispatchEvent(new Event('change'));

		// Assert
		expect(host.value()).toBe('Changed');
	});
});
