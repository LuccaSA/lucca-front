import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, inject, input, OnInit, viewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { luBooleanAttribute, luNumberAttribute } from '@lucca-front/ng/core';
import { InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { ReadMoreComponent } from '@lucca-front/ng/read-more';
import { startWith } from 'rxjs';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';

@Component({
	selector: 'lu-textarea-input',
	imports: [InputDirective, ReactiveFormsModule, ReadMoreComponent, ɵPresentationDisplayDefaultDirective],
	templateUrl: './textarea-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaInputComponent implements OnInit {
	#cdr = inject(ChangeDetectorRef);
	#destroyRef = inject(DestroyRef);

	ngControl = injectNgControl();

	readonly parent = viewChild<ElementRef<HTMLElement>>('parent');

	readonly placeholder = input<string>('');

	readonly rows = input(3, { transform: luNumberAttribute });

	readonly autoResize = input(false, { transform: luBooleanAttribute });

	readonly autoResizeScrollIntoView = input(false, { transform: luBooleanAttribute });

	readonly disableSpellcheck = input(false, { transform: luBooleanAttribute });

	cloneValue = '';

	updateScroll(value: string) {
		this.cloneValue = value;
		this.#cdr.detectChanges(); // Needed to apply cloneValue to autoresize HTML clone

		if (this.autoResizeScrollIntoView() && this.parent()) {
			this.parent()?.nativeElement.scrollIntoView({
				behavior: 'instant',
				block: 'end',
			});
		}
	}

	ngOnInit(): void {
		this.ngControl.valueChanges?.pipe(takeUntilDestroyed(this.#destroyRef), startWith(this.ngControl.value)).subscribe((value) => this.updateScroll(value as string));
	}
}
