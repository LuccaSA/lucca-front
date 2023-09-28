import { booleanAttribute, Component, Input } from '@angular/core';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { AbstractFieldComponent } from '../abstract-field-component';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { InlineMessageState } from '../../inline-message/inline-message-state';
import { FormFieldSize } from '../../form-field/form-field-size';
import { InputDirective } from '../../form-field/input.directive';

@Component({
	selector: 'lu-switchfield',
	standalone: true,
	imports: [FormFieldComponent, ReactiveFormsModule, InputDirective],
	templateUrl: './switchfield.component.html',
	hostDirectives: [NoopValueAccessorDirective],
})
export class SwitchfieldComponent extends AbstractFieldComponent {
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
	size: FormFieldSize = 'M';

	override get required(): boolean {
		return this.ngControl.control.hasValidator(Validators.requiredTrue);
	}
}
