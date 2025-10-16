import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuUserSelectInputComponent } from '@lucca-front/ng/user';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-user',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './user.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ReactiveFormsModule, FormlyModule, LuUserSelectInputComponent],
})
export class LuFormlyFieldUser extends FieldType<FieldTypeConfig> {
	focus() {
		this.props['_isFocused'] = true;
	}
	blur() {
		this.props['_isFocused'] = false;
	}
}
