import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-department',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './department.html',
})
export class LuFormlyFieldDepartment extends FieldType {
	focus() {
		this.to._isFocused = true;
	}
	blur() {
		this.to._isFocused = false;
	}
}
