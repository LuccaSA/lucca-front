import { Directive, inject, Input, OnDestroy } from '@angular/core';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { filter, take } from 'rxjs/operators';

@Directive({
	selector: '[luFormFieldId]',
	host: {
		'[attr.id]': 'id()',
	},
})
export class FormFieldIdDirective implements OnDestroy {
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

	id(): string {
		return `${this.#formFieldComponent.id()}-${this.#suffix}`;
	}

	constructor() {
		this.#formFieldComponent.ready$.pipe(filter(Boolean), take(1)).subscribe(() => {
			this.applyLabelledBy();
		});
	}

	private applyLabelledBy(): void {
		this.#formFieldComponent.addLabelledBy(`${this.#formFieldComponent.id()}-${this.#suffix}`, this.labelledByStrategy === 'prepend');
	}

	ngOnDestroy(): void {
		this.#formFieldComponent.removeLabelledBy(`${this.#formFieldComponent.id()}-${this.#suffix}`);
	}
}
