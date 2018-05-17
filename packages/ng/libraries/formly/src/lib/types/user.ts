import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-user',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './user.html',
})
export class LuFormlyFieldUser extends FieldType {
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
