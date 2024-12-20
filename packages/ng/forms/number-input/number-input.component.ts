import { booleanAttribute, Component, ElementRef, input, numberAttribute, viewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from '@lucca-front/ng/form-field';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { NgTemplateOutlet } from '@angular/common';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { TextInputAddon } from '../text-input/text-input-addon';
import { getIntl } from '@lucca-front/ng/core';
import { LU_NUMBERFIELD_TRANSLATIONS } from './number-input.translate';
import { injectNgControl } from '../inject-ng-control';

@Component({
	selector: 'lu-number-input',
	standalone: true,
	imports: [InputDirective, ReactiveFormsModule, FormFieldIdDirective, NgTemplateOutlet],
	templateUrl: './number-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
})
export class NumberInputComponent {
	ngControl = injectNgControl();

	placeholder = input<string>('');

	step = input<number, number>(1, { transform: numberAttribute });

	noSpinButtons = input<boolean, boolean>(false, { transform: booleanAttribute });

	hasClearer = input<boolean, boolean>(false, { transform: booleanAttribute });

	inputElementRef = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

	prefix = input<TextInputAddon>();

	suffix = input<TextInputAddon>();

	min = input<number>();

	max = input<number>();

	intl = getIntl(LU_NUMBERFIELD_TRANSLATIONS);

	clearValue(): void {
		this.ngControl.reset();
		this.inputElementRef().nativeElement.focus();
	}
}
