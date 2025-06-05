import { booleanAttribute, Component, ElementRef, inject, input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-main-layout',
	standalone: true,
	styleUrls: ['./main-layout.component.scss'],
	templateUrl: './main-layout.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'mainLayout',
		role: 'main',
	},
})
export class MainLayoutComponent implements OnInit {
	headerSticky = input(false, { transform: booleanAttribute });
	footerSticky = input(false, { transform: booleanAttribute });

	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	#renderer = inject(Renderer2);

	ngOnInit(): void {
		const resizeObserver = new ResizeObserver(() => {
			this.#renderer.setProperty(this.#elementRef.nativeElement, `style`, `--components-mainLayout-widthCalculated: ${this.#elementRef.nativeElement.clientWidth}px`);
		});

		resizeObserver.observe(this.#elementRef.nativeElement);
	}
}
