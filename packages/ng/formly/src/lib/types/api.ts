import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-api',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './api.html',
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LuFormlyFieldApi extends FieldType {
	get _api() {
		return this.to['api'] as string;
	}
	get _filters() {
		return (this.to['filters'] || []) as string[];
	}
	get _orderBy() {
		return this.to['orderBy'] as string;
	}
	get _standard() {
		return (this.to['standard'] || 'v3') as string;
	}
	override readonly formControl: FormControl;
	focus() {
		this.to['_isFocused'] = true;
	}
	blur() {
		this.to['_isFocused'] = false;
	}
}
