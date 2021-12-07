import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-select',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './select.html',
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuFormlyFieldSelect extends FieldType {
	get _options() {
		return <any[]>this.to.options || [];
	}
	override readonly formControl: FormControl;
	focus() {
		this.to['_isFocused'] = true;
	}
	blur() {
		this.to['_isFocused'] = false;
	}
}
