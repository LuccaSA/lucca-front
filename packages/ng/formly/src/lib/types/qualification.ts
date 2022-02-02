import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-qualification',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './qualification.html',
})
export class LuFormlyFieldQualification extends FieldType {
	override readonly formControl: FormControl;
	focus() {
		this.to['_isFocused'] = true;
	}
	blur() {
		this.to['_isFocused'] = false;
	}
}
