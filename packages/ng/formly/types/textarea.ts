import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-input',
	styleUrl: 'formly-field.common.scss',
	templateUrl: './textarea.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	// eslint-disable-next-line @angular-eslint/prefer-standalone
	standalone: false,
})
export class LuFormlyFieldTextarea extends FieldType<FieldTypeConfig> {
	focus() {
		this.props['_isFocused'] = true;
	}
	blur() {
		this.props['_isFocused'] = false;
	}
}
