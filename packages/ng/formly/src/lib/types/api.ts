import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-api',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './api.html',
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuFormlyFieldApi extends FieldType {
	get _api() {
		return this.to.api;
	}
	get _filters() {
		return this.to.filters || [];
	}
	get _orderBy() {
		return this.to.orderBy;
	}
	get _standard() {
		return this.to.standard || 'v3';
	}
	override readonly formControl: FormControl;
	focus() {
		this.to._isFocused = true;
	}
	blur() {
		this.to._isFocused = false;
	}
}
