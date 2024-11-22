import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, inject, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-scroll-box',
	standalone: true,
	template: '<ng-content />',
	// templateUrl: './scroll-box.component.html',
	styleUrls: ['./scroll-box.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [],
	host: {
		class: 'scrollBox2',
	},
})
export class ScrollBoxComponent implements OnInit {
	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	@HostBinding('class.is-firstVisible')
	isFirstVisible = false;

	@HostBinding('class.is-lastVisible')
	isLastVisible = false;

	initObserver(element: Element, isFirst: boolean) {
		new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (isFirst) {
						this.isFirstVisible = entry.isIntersecting;
					} else {
						this.isLastVisible = entry.isIntersecting;
					}
				});
			},
			{
				threshold: 1.0,
			},
		).observe(element);
	}

	ngOnInit() {
		const children = this.#elementRef.nativeElement.children;

		[].forEach.call(children, (child, index) => {
			if (index === 0) {
				this.initObserver(child as Element, true);
			}

			if (index === children.length - 1) {
				this.initObserver(child as Element, false);
			}
		});
	}
}
