import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, OnInit, signal, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-scroll-box',
	standalone: true,
	templateUrl: './scroll-box.component.html',
	styleUrls: ['./scroll-box.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [],
	host: {
		class: 'scrollBox',
	},
})
export class ScrollBoxComponent implements OnInit {
	firstRef = viewChild<ElementRef<HTMLElement>>('first');
	lastRef = viewChild<ElementRef<HTMLElement>>('last');

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

	ngOnInit() {
		this.initObserver(this.firstRef().nativeElement, true);
		this.initObserver(this.lastRef().nativeElement, false);
	}
}
