import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuDateSelectInputComponent } from '@lucca-front/ng/date';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-date',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './date.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ReactiveFormsModule, FormlyModule, LuDateSelectInputComponent],
})
export class LuFormlyFieldDate extends FieldType<FieldTypeConfig> {
	focus() {
		this.props['_isFocused'] = true;
	}
	blur() {
		this.props['_isFocused'] = false;
	}
}
