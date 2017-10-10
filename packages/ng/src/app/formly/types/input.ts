import { Component } from '@angular/core';
import { FieldType } from 'ng-formly';
@Component({
	selector: 'lu-formly-field-input',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './input.html',
})
export class LuFormlyFieldInput extends FieldType {
	get type() {
		return this.to.type || 'text';
	}
}
