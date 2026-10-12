import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, input, viewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClearComponent } from '@lucca-front/ng/clear';
import { intlInputOptions, luBooleanAttribute, luNumberAttribute, luOptionalNumberAttribute } from '@lucca-front/ng/core';
import { InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { TextInputAddon } from '../text-input/text-input-addon';
import { LU_NUMBERFIELD_TRANSLATIONS } from './number-input.translate';

@Component({
	selector: 'lu-number-input',
	imports: [InputDirective, ReactiveFormsModule, FormFieldIdDirective, NgTemplateOutlet, ClearComponent, ɵPresentationDisplayDefaultDirective],
	templateUrl: './number-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputComponent {
	ngControl = injectNgControl();

	readonly placeholder = input<string>('');

	readonly step = input(1, { transform: luNumberAttribute });

	readonly noSpinButtons = input(false, { transform: luBooleanAttribute });

	readonly hasClearer = input(false, { transform: luBooleanAttribute });

	readonly inputElementRef = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

	readonly prefix = input<TextInputAddon>();

	readonly suffix = input<TextInputAddon>();

	readonly min = input(undefined, { transform: luOptionalNumberAttribute });

	readonly max = input(undefined, { transform: luOptionalNumberAttribute });

	readonly valueAlignRight = input(false, { transform: luBooleanAttribute });

	readonly intl = input(...intlInputOptions(LU_NUMBERFIELD_TRANSLATIONS));

	clearValue(): void {
		this.ngControl.reset();
		this.inputElementRef().nativeElement.focus();
	}
}
