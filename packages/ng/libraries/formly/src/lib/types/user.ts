import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-user',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './user.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuFormlyFieldUser extends FieldType {
	focus() {
		this.to._isFocused = true;
	}
	blur() {
		this.to._isFocused = false;
	}
}
