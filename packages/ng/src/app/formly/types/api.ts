import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
@Component({
	selector: 'lu-formly-field-api',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './api.html',
})
export class LuFormlyFieldApi extends FieldType {
	get api() {
		return this.to.api || '';
	}
	get filter() {
		return this.to.filter || '';
	}
	focus() {
		this.to._isFocused = true;
	}
	blur() {
		this.to._isFocused = false;
	}
}
