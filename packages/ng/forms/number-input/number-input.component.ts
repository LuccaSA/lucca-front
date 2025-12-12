import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ElementRef, input, numberAttribute, viewChild, ViewEncapsulation } from '@angular/core';
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
	imports: [InputDirective, ReactiveFormsModule, FormFieldIdDirective, NgTemplateOutlet, ClearComponent],
	templateUrl: './number-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputComponent {
	ngControl = injectNgControl();

	readonly placeholder = input<string>('');

	readonly step = input<number, number>(1, { transform: numberAttribute });

	readonly noSpinButtons = input(false, { transform: booleanAttribute });

	readonly hasClearer = input(false, { transform: booleanAttribute });

	readonly inputElementRef = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

	readonly prefix = input<TextInputAddon>();

	readonly suffix = input<TextInputAddon>();

	readonly min = input<number>();

	readonly max = input<number>();

	readonly valueAlignRight = input(false, { transform: booleanAttribute });

	readonly intl = getIntl(LU_NUMBERFIELD_TRANSLATIONS);

	clearValue(): void {
		this.ngControl.reset();
		this.inputElementRef().nativeElement.focus();
	}
}
