import { computed, Directive, inject, input, OnDestroy, untracked } from '@angular/core';
import { ɵeffectWithDeps } from '@lucca-front/ng/core';
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

	readonly suffix = input('', { alias: 'luFormFieldId' });

	readonly labelledByStrategy = input<'prepend' | 'append'>('append');

	readonly id = computed(() => `${this.#formFieldComponent.id()}-${this.suffix()}`);

	constructor() {
		ɵeffectWithDeps([this.suffix], (suffix) => {
			if (suffix && this.#formFieldComponent.ready) {
				this.#applyLabelledBy(this.id(), this.labelledByStrategy());
			}
		});
		this.#formFieldComponent.ready$.pipe(filter(Boolean), take(1)).subscribe(() => {
			untracked(() => {
				if (this.suffix()) {
					this.#applyLabelledBy(this.id(), this.labelledByStrategy());
				}
			});
		});
	}

	#applyLabelledBy(id: string, strategy: 'prepend' | 'append'): void {
		this.#formFieldComponent.addLabelledBy(id, strategy === 'prepend');
	}

	ngOnDestroy(): void {
		if (this.suffix()) {
			this.#formFieldComponent.removeLabelledBy(this.id());
		}
	}
}
