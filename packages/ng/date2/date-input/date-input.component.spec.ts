import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DateInputComponent } from './date-input.component';

@Component({
	template: `<lu-date-input [value]="value" (valueChange)="onValueChange($event)" />`,
	imports: [DateInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	value: Date | null = null;

	onValueChange(value: Date | null) {
		this.value = value;
	}
}

describe('DateInputComponent', () => {
	let fixture: ComponentFixture<HostComponent>;

	function createHost(value: Date | null): HTMLInputElement {
		TestBed.configureTestingModule({
			imports: [HostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		fixture = TestBed.createComponent(HostComponent);
		fixture.componentInstance.value = value;
		fixture.detectChanges();

		return (fixture.nativeElement as HTMLElement).querySelector('[data-testid="lu-date-input"]') as HTMLInputElement;
	}

	function typeInElement(value: string, input: HTMLInputElement): void {
		input.value = value;
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
	}

	it('should emit null when user clear the input', () => {
		const input = createHost(new Date('2024-01-01T00:00:00.000Z'));
		expect(input).toBeTruthy();

		typeInElement('', input);
		TestBed.flushEffects();

		expect(fixture.componentInstance.value).toBeNull();
	});

	it('should emit null when user enter an invalid date', () => {
		const input = createHost(new Date('2024-01-01T00:00:00.000Z'));
		expect(input).toBeTruthy();

		typeInElement('12', input);
		TestBed.flushEffects();

		expect(fixture.componentInstance.value).toBeNull();
	});

	it('should not emit value at init if null value', fakeAsync(() => {
		const host = createHost(null);
		expect(host).toBeTruthy();
		const onValueChange = vi.spyOn(fixture.componentInstance, 'onValueChange');

		tick();
		TestBed.flushEffects();
		expect(onValueChange).toHaveBeenCalledTimes(0);
	}));

	it('should not emit value at init if there is a value', fakeAsync(() => {
		const host = createHost(new Date('2024-01-01T00:00:00.000Z'));
		expect(host).toBeTruthy();
		const onValueChange = vi.spyOn(fixture.componentInstance, 'onValueChange');

		tick();
		TestBed.flushEffects();
		expect(onValueChange).toHaveBeenCalledTimes(0);
	}));
});
