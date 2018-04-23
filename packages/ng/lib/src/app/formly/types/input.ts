import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
@Component({
	selector: 'lu-formly-field-input',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './input.html',
})
export class LuFormlyFieldInput extends FieldType {
	get type() {
		return this.to.type || 'text';
	}
	focus() {
		this.to._isFocused = true;
	}
	blur() {
		this.to._isFocused = false;
	}
}
