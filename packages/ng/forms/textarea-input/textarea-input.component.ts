import { booleanAttribute, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from '@lucca-front/ng/form-field';
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
	@ViewChild('textarea', { read: ElementRef, static: true })
	textarea: ElementRef<HTMLTextAreaElement>;

	ngControl = injectNgControl();

	@Input()
	placeholder: string = '';

	@Input()
	rows?: number;

	@Input({
		transform: booleanAttribute,
	})
	autoResize = false;

	@Input({
		transform: booleanAttribute,
	})
	scrollIntoViewOnAutoResizing = false;

	updateScroll() {
		if (this.scrollIntoViewOnAutoResizing) {
			this.textarea.nativeElement.scrollIntoView();
		}
	}
}
