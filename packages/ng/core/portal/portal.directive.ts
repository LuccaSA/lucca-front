import { Directive, inject, Input, OnChanges, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { PortalContent } from './portal-content';

@Directive({
	selector: '[luPortal]',
	standalone: true,
})
export class PortalDirective<T = unknown> implements OnChanges {
	private viewContainerRef = inject(ViewContainerRef);
	private renderer = inject(Renderer2);
	private templateRef = inject(TemplateRef);

	@Input({ required: true })
	public luPortal: PortalContent<T> = null;

	private render(): void {
		this.viewContainerRef.clear();

		if (this.luPortal instanceof TemplateRef) {
			this.viewContainerRef.createEmbeddedView(this.luPortal);
		} else {
			const ref = this.viewContainerRef.createEmbeddedView(this.templateRef);
			const container: HTMLElement = ref.rootNodes[0] as HTMLElement;
			const parent = container.parentElement;
			this.renderer.insertBefore(parent, document.createTextNode(this.luPortal), container);
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
