import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-establishment',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './establishment.html'
})
export class LuFormlyFieldEstablishment extends FieldType {
	focus() {
		this.to._isFocused = true;
	}
	blur() {
		this.to._isFocused = false;
	}
}
