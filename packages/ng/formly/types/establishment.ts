import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuEstablishmentSelectInputComponent } from '@lucca-front/ng/establishment';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-establishment',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './establishment.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ReactiveFormsModule, FormlyModule, LuEstablishmentSelectInputComponent],
})
export class LuFormlyFieldEstablishment extends FieldType<FieldTypeConfig> {
	focus() {
		this.props['_isFocused'] = true;
	}
	blur() {
		this.props['_isFocused'] = false;
	}
}
