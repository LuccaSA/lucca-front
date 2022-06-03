import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-establishment',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './establishment.html',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LuFormlyFieldEstablishment extends FieldType {
	override readonly formControl: UntypedFormControl;
	focus() {
		this.to['_isFocused'] = true;
	}
	blur() {
		this.to['_isFocused'] = false;
	}
}
