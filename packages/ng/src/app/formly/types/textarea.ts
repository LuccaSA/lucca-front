import { Component } from '@angular/core';
import { FieldType } from 'ng-formly';
@Component({
	selector: 'lu-formly-field-input',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './textarea.html',
})
export class LuFormlyFieldTextarea extends FieldType {
	focus() {
		this.to._isFocused = true;
	}
	blur() {
		this.to._isFocused = false;
	}
}
