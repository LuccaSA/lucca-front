import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, inject, input, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';

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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollBoxComponent implements OnInit {
	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	/**
	 * Scroll box content vertically
	 */
	readonly vertical = input(false, { transform: luBooleanAttribute });

	readonly isFirstVisible = signal(true);
	readonly isLastVisible = signal(false);

	scroll() {
		const container = this.#elementRef.nativeElement.getBoundingClientRect();
		const first = this.#elementRef.nativeElement.firstElementChild?.getBoundingClientRect();
		const last = this.#elementRef.nativeElement.lastElementChild?.getBoundingClientRect();

		if (this.vertical()) {
			this.isFirstVisible.set(!first || first.top >= container.top);
			this.isLastVisible.set(!last || last.bottom <= container.bottom);
		} else {
			this.isFirstVisible.set(!first || first.left >= container.left);
			this.isLastVisible.set(!last || last.right <= container.right);
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
