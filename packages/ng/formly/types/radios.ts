import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-radios',
	styleUrl: 'formly-field.common.scss',
	templateUrl: './radios.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ReactiveFormsModule, FormlyModule],
})
export class LuFormlyFieldRadios extends FieldType<FieldTypeConfig> {
	get _options() {
		return (this.props.options || []) as { value: unknown; label: unknown }[];
	}
	focus() {
		this.props['_isFocused'] = true;
	}
	blur() {
		this.props['_isFocused'] = false;
	}
}
