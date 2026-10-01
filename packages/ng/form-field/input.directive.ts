import { computed, Directive, effect, ElementRef, inject, input, OnInit, Renderer2 } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import { FORM_FIELD_INSTANCE } from './form-field.token';

function splitIds(ids: string | null): string[] {
	return ids?.split(/\s+/).filter(Boolean) ?? [];
}

function mergeIds(...lists: string[][]): string {
	return [...new Set(lists.flat())].join(' ');
}

@Directive({
	selector: '[luInput]',
	host: {
		// Used to autofocus in dialog boxes, do not change except if you know what you're doing
		class: 'luNativeInput',
	},
})
export class InputDirective implements OnInit {
	public readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

	public readonly formFieldRef = inject(FORM_FIELD_INSTANCE, { optional: true });

	readonly #renderer = inject(Renderer2);

	/**
	 * Prevents message and label ids from being propagated, useful if the input holds its own message and label (like for radios)
	 */
	readonly standalone = input(false, { transform: luBooleanAttribute, alias: 'luInputStandalone' });

	/**
	 * @internal Space-separated ids labelling the input, merged with the ones provided by the parent form field
	 */
	readonly ɵlabelledBy = input<string | null>(null, { alias: 'ɵluInputLabelledBy' });

	/**
	 * @internal Space-separated ids describing the input, placed before the ones provided by the parent form field
	 */
	readonly ɵdescribedBy = input<string | null>(null, { alias: 'ɵluInputDescribedBy' });

	readonly #linkedFormField = computed(() => (this.standalone() ? null : this.formFieldRef));

	readonly #ariaLabelledBy = computed(() => mergeIds(this.#linkedFormField()?.ariaLabelledBy() ?? [], splitIds(this.ɵlabelledBy())));

	// Own descriptions (e.g. instructions) are read before the form field ones, so an error message comes last
	readonly #ariaDescribedBy = computed(() => mergeIds(splitIds(this.ɵdescribedBy()), this.#linkedFormField()?.ariaDescribedBy() ?? []));

	constructor() {
		this.#syncAttribute('aria-labelledby', this.#ariaLabelledBy);
		this.#syncAttribute('aria-describedby', this.#ariaDescribedBy);
	}

	ngOnInit(): void {
		// If the field is used as standalone, we won't have the ref provided so it'll crash
		if (this.formFieldRef) {
			this.formFieldRef.addInput(this);
		}
	}

	/**
	 * This directive is the only writer of the attribute while it has ids to set.
	 * It never touches the attribute otherwise, so a value bound by the consumer on a standalone input is kept.
	 */
	#syncAttribute(name: string, value: () => string): void {
		let written = false;
		effect(() => {
			const ids = value();
			if (ids) {
				this.#renderer.setAttribute(this.host.nativeElement, name, ids);
				written = true;
			} else if (written) {
				this.#renderer.removeAttribute(this.host.nativeElement, name);
				written = false;
			}
		});
	}
}
