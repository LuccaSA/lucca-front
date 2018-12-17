import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-api',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './api.html',
})
export class LuFormlyFieldApi extends FieldType {
	get _api() {
		return this.to.api;
	}
	get _filters() {
		return this.to.filters || [];
	}
	focus() {
		this.to._isFocused = true;
	}
	blur() {
		this.to._isFocused = false;
	}
}
