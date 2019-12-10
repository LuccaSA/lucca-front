import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-checkboxes',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './checkboxes.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuFormlyFieldCheckboxes extends FieldType {
	focus() {
		this.to._isFocused = true;
	}
	blur() {
		this.to._isFocused = false;
	}
}
