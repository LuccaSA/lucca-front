import { afterRenderEffect, booleanAttribute, ChangeDetectionStrategy, Component, ElementRef, input, model, output, viewChild, ViewEncapsulation } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { ReadMoreComponent } from '@lucca-front/ng/read-more';

@Component({
	selector: 'lu-textarea-input',
	imports: [InputDirective, ReadMoreComponent, ɵPresentationDisplayDefaultDirective],
	templateUrl: './textarea-input.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaInputComponent implements FormValueControl<string> {
	readonly value = model<string>('');

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly touch = output<void>();

	readonly parent = viewChild<ElementRef<HTMLElement>>('parent');

	readonly placeholder = input<string>('');

	readonly rows = input<number>(3);

	readonly autoResize = input(false, { transform: booleanAttribute });

	readonly autoResizeScrollIntoView = input(false, { transform: booleanAttribute });

	readonly disableSpellcheck = input(false, { transform: booleanAttribute });

	constructor() {
		afterRenderEffect(() => {
			void this.value();
			if (this.autoResizeScrollIntoView()) {
				this.parent()?.nativeElement.scrollIntoView({
					behavior: 'instant',
					block: 'end',
				});
			}
		});
	}
}
