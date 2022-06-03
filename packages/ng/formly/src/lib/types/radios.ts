import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-radios',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './radios.html',
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LuFormlyFieldRadios extends FieldType {
	get _options() {
		return (this.to.options || []) as { value: unknown; label: unknown }[];
	}
	override readonly formControl: UntypedFormControl;
	focus() {
		this.to['_isFocused'] = true;
	}
	blur() {
		this.to['_isFocused'] = false;
	}
}
