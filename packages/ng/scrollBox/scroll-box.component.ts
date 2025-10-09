import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, inject, OnDestroy, OnInit, signal, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-scroll-box',
	standalone: true,
	template: '<ng-content />',
	styleUrl: './scroll-box.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [],
	host: {
		class: 'scrollBox',
	},
})
export class ScrollBoxComponent implements OnInit, OnDestroy {
	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	@HostBinding('class.is-firstVisible')
	get isFirstVisibleClass() {
		return this.isFirstVisible();
	}
	isFirstVisible = signal(false);

	@HostBinding('class.is-lastVisible')
	get isLastVisibleClass() {
		return this.isLastVisible();
	}
	isLastVisible = signal(false);

	initObserver(element: Element, isFirst: boolean) {
		new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (isFirst) {
						this.isFirstVisible.set(entry.isIntersecting);
					} else {
						this.isLastVisible.set(entry.isIntersecting);
					}
				});
			},
			{
				threshold: 1.0,
			},
		).observe(element);
	}

	observeFirstAndLastElement = () => {
		const children = this.#elementRef.nativeElement.children;

		[].forEach.call(children, (child, index) => {
			if (index === 0) {
				this.initObserver(child as Element, true);
			}

			if (index === children.length - 1) {
				this.initObserver(child as Element, false);
			}
		});
	};

	observer = new MutationObserver(this.observeFirstAndLastElement);

	ngOnInit() {
		this.observeFirstAndLastElement();
		this.observer.observe(this.#elementRef.nativeElement, { childList: true });
	}

	ngOnDestroy() {
		this.observer.disconnect();
	}
}
