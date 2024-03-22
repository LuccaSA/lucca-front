import { Directive, inject, Injector, Input, OnChanges, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { PORTAL_CONTEXT, PortalContent } from './portal-content';

@Directive({
	selector: '[luPortal]',
	standalone: true,
})
export class PortalDirective<T = unknown> implements OnChanges {
	private viewContainerRef = inject(ViewContainerRef);
	private renderer = inject(Renderer2);
	private templateRef = inject(TemplateRef);
	private injector = inject(Injector);

	@Input({ required: true })
	public luPortal: PortalContent<T> = null;

	@Input()
	public luPortalContext: T | null = null;

	private render(): void {
		this.viewContainerRef.clear();

		if (this.luPortal instanceof TemplateRef) {
			this.viewContainerRef.createEmbeddedView<T>(this.luPortal, this.luPortalContext);
		} else if (typeof this.luPortal === 'string') {
			const ref = this.viewContainerRef.createEmbeddedView(this.templateRef);
			const container: HTMLElement = ref.rootNodes[0] as HTMLElement;
			const parent = container.parentElement;
			this.renderer.insertBefore(parent, document.createTextNode(this.luPortal), container);
		} else {
			const injector = Injector.create({
				parent: this.injector,
				providers: [{ provide: PORTAL_CONTEXT, useValue: this.luPortalContext }],
			});
			const ref = this.viewContainerRef.createComponent(this.luPortal, { injector });
			ref.changeDetectorRef.detectChanges();
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['luPortal']) {
			// If we're here, it means that either the template ref changed or the string changed,
			// meaning that we need to render again
			this.render();
		}
	}
}
