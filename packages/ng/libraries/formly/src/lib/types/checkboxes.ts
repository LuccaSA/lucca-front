import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-checkboxes',
	styleUrls: ['formly-field.common.scss', 'grouped-inputs.scss'],
	templateUrl: './checkboxes.html',
})
export class LuFormlyFieldCheckboxes extends FieldType {
	focus() {
		this.to._isFocused = true;
	}
	blur() {
		this.to._isFocused = false;
	}
}
