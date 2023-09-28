import { booleanAttribute, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent, FormFieldSize, InputDirective } from '@lucca-front/ng/form-field';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { TextfieldAddon } from './textfield-addon';
import { InlineMessageState } from '../../inline-message/inline-message-state';
import { LuccaIcon } from '@lucca-front/icons';
import { AbstractFieldComponent } from '../abstract-field-component';
import { SafeHtml } from '@angular/platform-browser';

@Component({
	selector: 'lu-textfield',
	standalone: true,
	imports: [FormFieldComponent, InputDirective, NgIf, ReactiveFormsModule, FormFieldIdDirective, NgTemplateOutlet],
	templateUrl: './textfield.component.html',
	hostDirectives: [NoopValueAccessorDirective],
})
export class TextfieldComponent extends AbstractFieldComponent {
	@Input({ required: true })
	label: string;

	@Input()
	placeholder: string;

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

	@Input({ transform: booleanAttribute })
	hasClearer = false;

	@Input({ transform: booleanAttribute })
	hasSearchIcon = false;

	@ViewChild('inputElement', { static: true })
	inputElementRef: ElementRef<HTMLInputElement>;

	@Input()
	prefix: TextfieldAddon;

	@Input()
	suffix: TextfieldAddon;

	@Input()
	type: 'text' | 'email' | 'password' | 'number' = 'text';

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
