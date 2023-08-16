import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-department',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './department.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LuFormlyFieldDepartment extends FieldType<FieldTypeConfig> {
	focus() {
		this.props['_isFocused'] = true;
	}
	blur() {
		this.props['_isFocused'] = false;
	}
}
