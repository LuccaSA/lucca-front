import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractFieldComponent } from '../abstract-field-component';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { InlineMessageState } from '@lucca-front/ng/inline-message';
import { FormFieldComponent, FormFieldSize, InputDirective } from '@lucca-front/ng/form-field';
import { LuSimpleSelectInputComponent } from '../../simple-select/input';

@Component({
	selector: 'lu-simple-select-field',
	standalone: true,
	imports: [FormFieldComponent, InputDirective, ReactiveFormsModule, LuSimpleSelectInputComponent],
	templateUrl: './simple-select-field.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleSelectFieldComponent extends AbstractFieldComponent {
	@Input({ required: true })
	label: string;

	@Input({ transform: booleanAttribute })
	hiddenLabel = false;

	@Input()
	tooltip: string | SafeHtml;

	@Input()
	inlineMessage: string;

	@Input()
	inlineMessageState: InlineMessageState;

	@Input()
	size: FormFieldSize = 'M';
}
