import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FormFieldWidth } from '@lucca-front/ng/form-field';
import { NumberFormatInputComponent } from './number-format-input/number-format-input.component';
import { NumberInputComponent } from './number-input/number-input.component';

@Component({
	selector: 'lu-number-input-width-host',
	imports: [FormsModule, NumberInputComponent, NumberFormatInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-number-input id="number" [ngModel]="null" [width]="width" />
		<lu-number-format-input id="numberFormat" [ngModel]="null" [width]="width" />
	`,
})
class NumberInputWidthHostComponent {
	width: FormFieldWidth | null = null;
}

describe('number inputs width input', () => {
	function render(width: FormFieldWidth | null): { number: HTMLElement; numberFormat: HTMLElement } {
		TestBed.configureTestingModule({ imports: [NumberInputWidthHostComponent] });

		const fixture = TestBed.createComponent(NumberInputWidthHostComponent);
		fixture.componentInstance.width = width;
		fixture.detectChanges();

		const element = fixture.nativeElement as HTMLElement;
		return {
			number: element.querySelector('#number .textField') as HTMLElement,
			numberFormat: element.querySelector('#numberFormat .textField') as HTMLElement,
		};
	}

	it('should not set any width class when the input is not provided', () => {
		const { number, numberFormat } = render(null);

		expect(number.className).toContain('textField');
		expect(number.className).not.toMatch(/mod-width/);
		expect(numberFormat.className).toContain('textField');
		expect(numberFormat.className).not.toMatch(/mod-width/);
	});

	it('should set the width class on both inputs, keeping the textField classes', () => {
		const { number, numberFormat } = render(30);

		expect(number.className).toContain('textField');
		expect(number.className).toContain('mod-width30');
		expect(numberFormat.className).toContain('textField');
		expect(numberFormat.className).toContain('mod-width30');
	});

	it('should keep the valueAlignRight class alongside the width class', () => {
		TestBed.overrideComponent(NumberInputWidthHostComponent, {
			set: {
				template: `
					<lu-number-input id="number" [ngModel]="null" [width]="width" valueAlignRight />
					<lu-number-format-input id="numberFormat" [ngModel]="null" [width]="width" valueAlignRight />
				`,
			},
		});
		const { number, numberFormat } = render(20);

		expect(number.className).toContain('mod-valueAlignRight');
		expect(number.className).toContain('mod-width20');
		expect(numberFormat.className).toContain('mod-valueAlignRight');
		expect(numberFormat.className).toContain('mod-width20');
	});
});
