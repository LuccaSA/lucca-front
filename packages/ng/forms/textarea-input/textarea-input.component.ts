import { ChangeDetectionStrategy, Component, Input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';

@Component({
	selector: 'lu-textarea-input',
	standalone: true,
	imports: [InputDirective, ReactiveFormsModule],
	templateUrl: './textarea-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaInputComponent {
	ngControl = injectNgControl();

	@Input()
	placeholder: string;

	@Input({
		transform: numberAttribute,
	})
	cols: number;

	@Input({
		transform: numberAttribute,
	})
	rows: number;
}
