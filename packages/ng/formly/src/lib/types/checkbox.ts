import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-checkbox',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './checkbox.html',
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LuFormlyFieldCheckbox extends FieldType {
	override readonly formControl: UntypedFormControl;
	focus() {
		this.to['_isFocused'] = true;
	}
	blur() {
		this.to['_isFocused'] = false;
	}
}
