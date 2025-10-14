import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuInputDirective } from '@lucca-front/ng/input';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-input',
	styleUrl: 'formly-field.common.scss',
	templateUrl: './input.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ReactiveFormsModule, FormlyModule, LuInputDirective],
})
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
