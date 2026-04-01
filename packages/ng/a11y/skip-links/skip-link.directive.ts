import { computed, Directive, ElementRef, inject, input, OnDestroy, OnInit } from '@angular/core';
import { LuSkipLink } from './skip-link';
import { SkipLinksService } from './skip-links.service';

@Directive({
	selector: '[luSkipLinkTarget]',
})
export class SkipLinkDirective implements OnInit, OnDestroy {
	#service = inject(SkipLinksService);
	#host = inject<ElementRef<HTMLElement>>(ElementRef);

	link: LuSkipLink;

	luSkipLinkLabel = input.required<string>();
	luSkipLinkTarget = input.required<string>();

	#link = computed(() => {
		return {
			id: this.luSkipLinkTarget(),
			label: this.luSkipLinkLabel(),
			host: this.#host.nativeElement,
		} as LuSkipLink;
	});

	ngOnDestroy(): void {
		this.#service.unregister(this.#link());
	}
	ngOnInit(): void {
		this.#service.register(this.#link());
	}
}
