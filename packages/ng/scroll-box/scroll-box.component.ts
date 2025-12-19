import { afterNextRender, booleanAttribute, Component, ElementRef, inject, input, OnInit, signal, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-scroll-box',
	standalone: true,
	template: '<ng-content />',
	styleUrl: './scroll-box.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'scrollBox',
		'(scroll)': 'scroll()',
		'[class.is-firstVisible]': 'isFirstVisible()',
		'[class.is-lastVisible]': 'isLastVisible()',
	},
})
export class ScrollBoxComponent implements OnInit {
	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	isFirstVisible = signal(true);
	isLastVisible = signal(false);

	vertical = input(false, { transform: booleanAttribute });

	scroll() {
		if (this.vertical()) {
			this.isFirstVisible.set(this.#elementRef.nativeElement.scrollTop === 0);
			this.isLastVisible.set(this.#elementRef.nativeElement.scrollTop >= this.#elementRef.nativeElement.scrollHeight - this.#elementRef.nativeElement.clientHeight);
		} else {
			this.isFirstVisible.set(this.#elementRef.nativeElement.scrollLeft === 0);
			this.isLastVisible.set(this.#elementRef.nativeElement.scrollLeft >= this.#elementRef.nativeElement.scrollWidth - this.#elementRef.nativeElement.clientWidth);
		}
	}

	constructor() {
		afterNextRender(() => {
			this.scroll();
		});
	}

	ngOnInit(): void {
		new ResizeObserver(() => {
			this.scroll();
		}).observe(this.#elementRef.nativeElement);
	}
}
