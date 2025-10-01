import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-radios',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './radios.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ReactiveFormsModule, FormlyModule, NgFor],
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
