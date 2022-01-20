import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-input',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './textarea.html',
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuFormlyFieldTextarea extends FieldType {
	override readonly formControl: FormControl;
	focus() {
		this.to['_isFocused'] = true;
	}
	blur() {
		this.to['_isFocused'] = false;
	}
}
