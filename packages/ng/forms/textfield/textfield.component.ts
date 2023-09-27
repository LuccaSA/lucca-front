import { booleanAttribute, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { NG_VALIDATORS, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { FormFieldComponent, FormFieldSize, InputDirective } from '@lucca-front/ng/form-field';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { TextfieldAddon } from './textfield-addon';
import { InlineMessageState } from '../../inline-message/inline-message-state';
import { LuccaIcon } from '@lucca-front/icons';

@Component({
	selector: 'lu-textfield',
	standalone: true,
	imports: [FormFieldComponent, InputDirective, NgIf, ReactiveFormsModule, FormFieldIdDirective, NgTemplateOutlet],
	templateUrl: './textfield.component.html',
	styleUrls: ['./textfield.component.scss'],
	hostDirectives: [NoopValueAccessorDirective],
})
export class TextfieldComponent {
	ngControl = injectNgControl();

	#ngModelRequiredValidator: RequiredValidator | null = inject(NG_VALIDATORS, { optional: true })?.find((v): v is RequiredValidator => v instanceof RequiredValidator);

	@ViewChild('inputElement', { static: true })
	inputElementRef: ElementRef<HTMLInputElement>;

	@Input()
	prefix: TextfieldAddon;

	@Input()
	suffix: TextfieldAddon;

	get required(): boolean {
		return this.ngControl.control.hasValidator(Validators.required) || booleanAttribute(this.#ngModelRequiredValidator.required);
	}

	@Input({ required: true })
	label: string;

	@Input()
	placeholder: string;

	@Input({ transform: booleanAttribute })
	hiddenLabel = false;

	@Input()
	type: 'text' | 'email' | 'password' | 'number' = 'text';

	@Input()
	inlineMessage: string;

	@Input()
	inlineMessageState: InlineMessageState;

	@Input()
	size: FormFieldSize = 'M';

	@Input({ transform: booleanAttribute })
	hasClearer = false;

	@Input({ transform: booleanAttribute })
	hasSearchIcon = false;

	@Input()
	/**
	 * Search icon to use for when `hasSearchIcon` is true, defaults to 'search'
	 */
	searchIcon: LuccaIcon = 'search';

	clearValue(): void {
		this.ngControl.reset();
		this.inputElementRef.nativeElement.focus();
	}
}
