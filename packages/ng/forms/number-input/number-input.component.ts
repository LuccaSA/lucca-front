import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, ElementRef, input, numberAttribute, viewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClearComponent } from '@lucca-front/ng/clear';
import { getIntl } from '@lucca-front/ng/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { TextInputAddon } from '../text-input/text-input-addon';
import { LU_NUMBERFIELD_TRANSLATIONS } from './number-input.translate';

@Component({
	selector: 'lu-number-input',
	standalone: true,
	imports: [InputDirective, ReactiveFormsModule, FormFieldIdDirective, NgTemplateOutlet, ClearComponent],
	templateUrl: './number-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
})
export class NumberInputComponent {
	ngControl = injectNgControl();

	placeholder = input<string>('');

	step = input<number, number>(1, { transform: numberAttribute });

	noSpinButtons = input(false, { transform: booleanAttribute });

	hasClearer = input(false, { transform: booleanAttribute });

	inputElementRef = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

	prefix = input<TextInputAddon>();

	suffix = input<TextInputAddon>();

	min = input<number>();

	max = input<number>();

	valueAlignRight = input(false, { transform: booleanAttribute });

	intl = getIntl(LU_NUMBERFIELD_TRANSLATIONS);

	clearValue(): void {
		this.ngControl.reset();
		this.inputElementRef().nativeElement.focus();
	}
}
