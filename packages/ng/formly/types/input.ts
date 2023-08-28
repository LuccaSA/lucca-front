import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
@Component({
	selector: 'lu-formly-field-input',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './input.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LuFormlyFieldInput extends FieldType<FieldTypeConfig> {
	get type() {
		return this.props.type || 'text';
	}
	focus() {
		this.props['_isFocused'] = true;
	}
	blur() {
		this.props['_isFocused'] = false;
	}
}
