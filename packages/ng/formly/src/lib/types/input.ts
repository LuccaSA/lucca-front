import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
@Component({
	selector: 'lu-formly-field-input',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './input.html',
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LuFormlyFieldInput extends FieldType {
	get type() {
		return this.to.type || 'text';
	}
	override readonly formControl: UntypedFormControl;
	focus() {
		this.to['_isFocused'] = true;
	}
	blur() {
		this.to['_isFocused'] = false;
	}
}
