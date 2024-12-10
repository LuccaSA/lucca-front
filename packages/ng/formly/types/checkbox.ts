import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

// eslint-disable-next-line @angular-eslint/prefer-standalone
@Component({
	selector: 'lu-formly-field-checkbox',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './checkbox.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LuFormlyFieldCheckbox extends FieldType<FieldTypeConfig> {
	focus() {
		this.props['_isFocused'] = true;
	}
	blur() {
		this.props['_isFocused'] = false;
	}
}
