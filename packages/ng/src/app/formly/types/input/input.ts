import { Component } from '@angular/core';
import { FieldType } from 'ng-formly';
@Component({
	selector: 'lu-formly-field-input',
	templateUrl: './input.html',
	host: { 'class': 'input' },
	styles: [ ':host { display: block; }' ],
})
export class LuFormlyFieldInput extends FieldType {
	get type() {
		return this.to.type || 'text';
	}
}
