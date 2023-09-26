import { Directive, HostBinding, inject, Input } from '@angular/core';
import { FormFieldComponent } from '../form-field/form-field.component';
import { filter, first } from 'rxjs/operators';

@Directive({
	selector: '[luFormFieldId]',
	standalone: true,
})
export class FormFieldIdDirective {
	#formFieldComponent = inject(FormFieldComponent);

	#suffix: string;

	@Input({
		required: true,
		alias: 'luFormFieldId',
	})
	set suffix(suffix: string) {
		this.#suffix = suffix;
		if (this.#formFieldComponent.ready) {
			this.applyLabelledBy();
		}
	}

	@Input()
	labelledByStrategy: 'prepend' | 'append' = 'append';

	@HostBinding('attr.id')
	get id(): string {
		return `${this.#formFieldComponent.id}-${this.#suffix}`;
	}

	constructor() {
		this.#formFieldComponent.ready$.pipe(filter(Boolean), first()).subscribe(() => {
			this.applyLabelledBy();
		});
	}

	private applyLabelledBy(): void {
		this.#formFieldComponent.addLabelledBy(`${this.#formFieldComponent.id}-${this.#suffix}`, this.labelledByStrategy === 'prepend');
	}
}
