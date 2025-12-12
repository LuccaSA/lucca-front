import { computed, Directive, inject, input, OnDestroy } from '@angular/core';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { filter, take } from 'rxjs/operators';
import { ɵeffectWithDeps } from '../core/signal';

@Directive({
	selector: '[luFormFieldId]',
	host: {
		'[attr.id]': 'id()',
	},
})
export class FormFieldIdDirective implements OnDestroy {
	#formFieldComponent = inject(FormFieldComponent);

	readonly suffix = input.required<string>({ alias: 'luFormFieldId' });

	readonly labelledByStrategy = input<'prepend' | 'append'>('append');

	readonly id = computed(() => `${this.#formFieldComponent.id()}-${this.suffix()}`);

	constructor() {
		ɵeffectWithDeps([this.suffix], (suffix) => {
			if (suffix && this.#formFieldComponent.ready) {
				this.applyLabelledBy();
			}
		});
		this.#formFieldComponent.ready$.pipe(filter(Boolean), take(1)).subscribe(() => this.applyLabelledBy());
	}

	private applyLabelledBy(): void {
		this.#formFieldComponent.addLabelledBy(this.id(), this.labelledByStrategy() === 'prepend');
	}

	ngOnDestroy(): void {
		this.#formFieldComponent.removeLabelledBy(this.id());
	}
}
