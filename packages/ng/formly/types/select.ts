import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClearComponent } from '@lucca-front/ng/clear';
import { LuInputDisplayerDirective } from '@lucca-front/ng/input';
import { LuOptionPickerModule } from '@lucca-front/ng/option';
import { LuSelectInputComponent } from '@lucca-front/ng/select';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-select',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './select.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ReactiveFormsModule, FormlyModule, LuSelectInputComponent, LuOptionPickerModule, LuInputDisplayerDirective, ClearComponent],
})
export class LuFormlyFieldSelect extends FieldType<FieldTypeConfig> {
	get _options() {
		return (this.props.options || []) as { value: unknown; label: unknown; name: string }[];
	}
	focus() {
		this.props['_isFocused'] = true;
	}
	blur() {
		this.props['_isFocused'] = false;
	}
}
