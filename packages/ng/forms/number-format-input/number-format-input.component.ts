import { booleanAttribute, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { TextInputAddon } from '../text-input/text-input-addon';
import { getIntl } from '@lucca-front/ng/core';
import { LU_NUMBERFORMATFIELD_TRANSLATIONS } from './number-format-input.translate';
import { injectNgControl } from '../inject-ng-control';
import { NumberFormatDirective } from '@lucca-front/ng/number-format';

@Component({
	selector: 'lu-number-format-input',
	standalone: true,
	imports: [FormFieldComponent, InputDirective, NgIf, ReactiveFormsModule, FormFieldIdDirective, NgTemplateOutlet, NumberFormatDirective],
	templateUrl: './number-format-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
})
export class NumberFormatInputComponent {
	ngControl = injectNgControl();

	@Input()
	placeholder: string = '';

	@Input({ transform: booleanAttribute })
	hasClearer = false;

	@ViewChild('inputElement', { static: true })
	inputElementRef: ElementRef<HTMLInputElement>;

	@Input()
	prefix: TextInputAddon;

	@Input()
	suffix: TextInputAddon;

	intl = getIntl(LU_NUMBERFORMATFIELD_TRANSLATIONS);

	clearValue(): void {
		this.ngControl.reset();
		this.inputElementRef.nativeElement.focus();
	}
}
