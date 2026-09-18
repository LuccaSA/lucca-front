import { afterRenderEffect, ChangeDetectionStrategy, Component, ElementRef, input, model, output, viewChild, ViewEncapsulation } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { luBooleanAttribute, luNumberAttribute } from '@lucca-front/ng/core';
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

	readonly disabled = input(false, { transform: luBooleanAttribute });

	readonly touch = output<void>();

	readonly parent = viewChild<ElementRef<HTMLElement>>('parent');

	readonly placeholder = input<string>('');

	readonly rows = input(3, { transform: luNumberAttribute });

	readonly autoResize = input(false, { transform: luBooleanAttribute });

	readonly autoResizeScrollIntoView = input(false, { transform: luBooleanAttribute });

	readonly disableSpellcheck = input(false, { transform: luBooleanAttribute });

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
