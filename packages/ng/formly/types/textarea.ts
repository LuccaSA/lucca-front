import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

// eslint-disable-next-line @angular-eslint/prefer-standalone
@Component({
	selector: 'lu-formly-field-input',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './textarea.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LuFormlyFieldTextarea extends FieldType<FieldTypeConfig> {
	focus() {
		this.props['_isFocused'] = true;
	}
	blur() {
		this.props['_isFocused'] = false;
	}
}
