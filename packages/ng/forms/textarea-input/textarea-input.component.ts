import { booleanAttribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, inject, input, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from '@lucca-front/ng/form-field';
import { startWith } from 'rxjs';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';

@Component({
	selector: 'lu-textarea-input',
	imports: [InputDirective, ReactiveFormsModule],
	templateUrl: './textarea-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaInputComponent implements OnInit {
	@ViewChild('parent')
	parent?: ElementRef<HTMLElement>;

	ngControl = injectNgControl();

	#cdr = inject(ChangeDetectorRef);
	#destroyRef = inject(DestroyRef);

	@Input()
	placeholder: string = '';

	@Input()
	rows?: number = 3;

	@Input({
		transform: booleanAttribute,
	})
	autoResize = false;

	@Input({
		transform: booleanAttribute,
	})
	autoResizeScrollIntoView = false;

	disableSpeelcheck = input(false, { transform: booleanAttribute });

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

	ngOnInit(): void {
		this.ngControl.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef), startWith(this.ngControl.value)).subscribe((value) => this.updateScroll(value as string));
	}
}
