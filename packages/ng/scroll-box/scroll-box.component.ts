import { ChangeDetectionStrategy, Component, ElementRef, OnInit, signal, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-scroll-box',
	templateUrl: './scroll-box.component.html',
	styleUrl: './scroll-box.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [],
	host: {
		class: 'scrollBox',
		'[class.is-firstVisible]': 'isFirstVisible()',
		'[class.is-lastVisible]': 'isLastVisible()',
	},
})
export class ScrollBoxComponent implements OnInit {
	first = viewChild<ElementRef<HTMLElement>>('first');
	last = viewChild<ElementRef<HTMLElement>>('last');

	isFirstVisible = signal(false);
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
				threshold: 1,
			},
		).observe(element);
	}

	ngOnInit(): void {
		this.initObserver(this.first().nativeElement, true);
		this.initObserver(this.last().nativeElement, false);
	}
}
