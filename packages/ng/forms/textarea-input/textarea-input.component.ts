import { booleanAttribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, Input, ViewChild, ViewEncapsulation } from '@angular/core';
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
	@ViewChild('parent')
	parent?: ElementRef<HTMLElement>;

	ngControl = injectNgControl();

	#cdr = inject(ChangeDetectorRef);

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
	autoResizeScrollIntoView = false;

	cloneValue = '';

	updateScroll(value: string) {
		this.cloneValue = value;
		this.#cdr.detectChanges(); // Needed to apply cloneValue to autoresize HTML clone

		if (this.autoResizeScrollIntoView && this.parent) {
			this.parent.nativeElement.scrollIntoView({
				behavior: 'instant',
				block: 'end',
			});
		}
	}
}
