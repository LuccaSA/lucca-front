import { booleanAttribute, Component, Input } from '@angular/core';
import { FormFieldComponent, FormFieldSize, InputDirective } from '@lucca-front/ng/form-field';
import { AbstractFieldComponent } from '../abstract-field-component';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { InlineMessageState } from '@lucca-front/ng/inline-message';
import { NgSwitchCase, NgTemplateOutlet } from '@angular/common';

@Component({
	selector: 'lu-checkboxfield',
	standalone: true,
	imports: [FormFieldComponent, ReactiveFormsModule, InputDirective, NgSwitchCase, NgTemplateOutlet],
	templateUrl: './checkboxfield.component.html',
	hostDirectives: [NoopValueAccessorDirective],
})
export class CheckboxfieldComponent extends AbstractFieldComponent {
	@Input({ required: true })
	label: string;

	@Input({ transform: booleanAttribute })
	hiddenLabel = false;

	@Input()
	tooltip: string | SafeHtml;

	@Input()
	inlineMessage: string;

	@Input()
	inlineMessageState: InlineMessageState;

	@Input()
	size: FormFieldSize;

	override get required(): boolean {
		return this.ngControl.control.hasValidator(Validators.requiredTrue);
	}
}
