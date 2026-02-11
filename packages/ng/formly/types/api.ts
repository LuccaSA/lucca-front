import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuApiSelectInputComponent } from '@lucca-front/ng/api';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
	selector: 'lu-formly-field-api',
	styleUrls: ['formly-field.common.scss', 'select.scss'],
	templateUrl: './api.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ReactiveFormsModule, FormlyModule, LuApiSelectInputComponent],
})
export class LuFormlyFieldApi extends FieldType<FieldTypeConfig> {
	get _api() {
		return this.props['api'] as string;
	}
	get _filters() {
		return (this.props['filters'] || []) as string[];
	}
	get _orderBy() {
		return this.props['orderBy'] as string;
	}
	get _sort() {
		return this.props['sort'] as string;
	}
	get _standard() {
		return (this.props['standard'] || 'v3') as 'v3' | 'v4';
	}
	focus() {
		this.props['_isFocused'] = true;
	}
	blur() {
		this.props['_isFocused'] = false;
	}
}
