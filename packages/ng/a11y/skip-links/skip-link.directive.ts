import { computed, Directive, effect, ElementRef, inject, input, linkedSignal, OnDestroy, Renderer2 } from '@angular/core';
import { LuSkipLink } from './skip-link';
import { SkipLinksService } from './skip-links.service';

let nextId = 0;

@Directive({
	selector: '[luSkipLinkTarget]',
})
export class SkipLinkDirective implements OnDestroy {
	#service = inject(SkipLinksService);
	#host = inject<ElementRef<HTMLElement>>(ElementRef);
	#renderer = inject(Renderer2);

	link: LuSkipLink;

	luSkipLinkLabel = input.required<string>();
	luSkipLinkTarget = input<string>('');

	linkTarget = linkedSignal(() => this.luSkipLinkTarget());

	#link = computed(() => {
		return {
			id: this.linkTarget(),
			label: this.luSkipLinkLabel(),
			host: this.#host.nativeElement,
		} as LuSkipLink;
	});

	#registeredLink: LuSkipLink | null = null;

	ngOnDestroy(): void {
		if (this.#registeredLink) {
			this.#service.unregister(this.#registeredLink);
		}
	}

	constructor() {
		effect(() => {
			const link = this.#link();
			const currentId = this.#host.nativeElement.id;

			this.#host.nativeElement.classList.add('skipLinks_target');

			const isFocusable = this.#host.nativeElement.matches('button, a[href], input:not([type="hidden"]), textarea, select, [tabindex]');

			if (!isFocusable) {
				this.#renderer.setAttribute(this.#host.nativeElement, 'tabindex', '-1');
			}

			if (!currentId && !link.id) {
				const id = `skipLink${++nextId}`;

				this.#renderer.setAttribute(this.#host.nativeElement, 'id', id);
				this.linkTarget.set(id);
				return;
			}

			if (!currentId) {
				this.#renderer.setAttribute(this.#host.nativeElement, 'id', link.id);

				if (this.#registeredLink) {
					this.#service.unregister(this.#registeredLink);
				}
				this.#registeredLink = link;
				this.#service.register(this.#registeredLink);
				return;
			}

			if (!link.id) {
				this.linkTarget.set(currentId);
				return;
			}

			if (link.id !== currentId) {
				console.warn('The ID passed as a parameter to luSkipLinkTarget will overwrite the existing ID on the element.');
				this.#renderer.setAttribute(this.#host.nativeElement, 'id', link.id);
			}

			if (this.#registeredLink) {
				this.#service.unregister(this.#registeredLink);
			}

			this.#registeredLink = link;
			this.#service.register(this.#registeredLink);
		});
	}
}
