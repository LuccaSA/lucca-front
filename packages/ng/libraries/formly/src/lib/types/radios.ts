import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-radios',
	styleUrls: ['formly-field.common.scss', 'grouped-inputs.scss'],
	templateUrl: './radios.html',
})
export class LuFormlyFieldRadios extends FieldType {
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
