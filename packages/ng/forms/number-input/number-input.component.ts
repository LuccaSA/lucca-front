import { booleanAttribute, Component, ElementRef, Input, numberAttribute, ViewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { TextInputAddon } from '../text-input/text-input-addon';
import { getIntl } from '@lucca-front/ng/core';
import { LU_NUMBERFIELD_TRANSLATIONS } from './number-input.translate';
import { injectNgControl } from '../inject-ng-control';

@Component({
	selector: 'lu-number-input',
	standalone: true,
	imports: [FormFieldComponent, InputDirective, NgIf, ReactiveFormsModule, FormFieldIdDirective, NgTemplateOutlet],
	templateUrl: './number-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
})
export class NumberInputComponent {
	ngControl = injectNgControl();

	@Input()
	placeholder: string = '';

	@Input({ transform: numberAttribute })
	step: number = 1;

	@Input({ transform: booleanAttribute })
	noSpinButtons = false;

	@Input({ transform: booleanAttribute })
	hasClearer = false;

	@ViewChild('inputElement', { static: true })
	inputElementRef: ElementRef<HTMLInputElement>;

	@Input()
	prefix: TextInputAddon;

	@Input()
	suffix: TextInputAddon;

	@Input()
	min?: number;

	@Input()
	max?: number;

	intl = getIntl(LU_NUMBERFIELD_TRANSLATIONS);

	clearValue(): void {
		this.ngControl.reset();
		this.inputElementRef.nativeElement.focus();
	}
}
