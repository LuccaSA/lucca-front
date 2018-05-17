import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-select',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './select.html',
})
export class LuFormlyFieldSelect extends FieldType {
	get _options() {
		return <any[]>this.to.options || [];
	}
	focus() {
		this.to._isFocused = true;
	}
	blur() {
		this.to._isFocused = false;
	}
}
