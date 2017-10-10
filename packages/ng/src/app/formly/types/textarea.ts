import { Component } from '@angular/core';
import { FieldType } from 'ng-formly';
@Component({
	selector: 'lu-formly-field-input',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './textarea.html',
})
export class LuFormlyFieldTextarea extends FieldType {}
