import { ComponentRef, Directive, EmbeddedViewRef, inject, Injector, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { PORTAL_CONTEXT, PortalContent } from './portal-content';

@Directive({
	selector: '[luPortal]',
	standalone: true,
})
export class PortalDirective<T = unknown> implements OnChanges, OnDestroy {
	private viewContainerRef = inject(ViewContainerRef);
	private renderer = inject(Renderer2);
	private templateRef = inject(TemplateRef);
	private injector = inject(Injector);

	@Input({ required: true })
	public luPortal: PortalContent<T> = null;

	@Input()
	public luPortalContext: T | null = null;

	private createdTextElement: Text | null = null;
	private embeddedViewRef?: EmbeddedViewRef<T>;
	private componentRef?: ComponentRef<unknown>;

	private render(): void {
		this.viewContainerRef.clear();
		this.embeddedViewRef = undefined;
		this.componentRef = undefined;

		if (typeof this.luPortal !== 'string') {
			this.destroyRenderedText();
		}

		if (this.luPortal instanceof TemplateRef) {
			const context = Object.assign({}, this.luPortalContext);
			this.embeddedViewRef = this.viewContainerRef.createEmbeddedView<T>(this.luPortal, context);
		} else if (typeof this.luPortal === 'string') {
			this.renderText(this.luPortal);
		} else {
			const injector = Injector.create({
				parent: this.injector,
				providers: [{ provide: PORTAL_CONTEXT, useValue: this.luPortalContext }],
			});
			this.componentRef = this.viewContainerRef.createComponent(this.luPortal, { injector });
			this.componentRef.changeDetectorRef.detectChanges();
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['luPortal']) {
			// If we're here, it means that either the template ref changed or the string changed,
			// meaning that we need to render again
			this.render();
		} else if (changes['luPortalContext'] && this.embeddedViewRef) {
			this.updateEmbeddedViewContext(this.luPortalContext);
		}
	}

	ngOnDestroy(): void {
		this.destroyRenderedText();
		this.embeddedViewRef?.destroy();
		this.componentRef?.destroy();
	}

	private renderText(text: string): void {
		if (this.createdTextElement) {
			this.createdTextElement.textContent = text;
		} else {
			const ref = this.viewContainerRef.createEmbeddedView(this.templateRef);
			const container: HTMLElement = ref.rootNodes[0] as HTMLElement;
			const parent = container.parentElement;
			this.createdTextElement = document.createTextNode(text);
			this.renderer.insertBefore(parent, this.createdTextElement, container);
		}
	}

	private destroyRenderedText(): void {
		if (this.createdTextElement) {
			this.renderer.removeChild(this.createdTextElement.parentNode, this.createdTextElement);
			this.createdTextElement = null;
		}
	}

	/**
	 * Embeded view context should not be overwritten, but updated.
	 * @see https://github.com/angular/angular/pull/51887
	 */
	private updateEmbeddedViewContext(context: T): void {
		if (this.embeddedViewRef) {
			const props = Object.keys(context);

			for (const prop of props) {
				delete this.embeddedViewRef.context[prop];
			}

			Object.assign(this.embeddedViewRef.context, context);
			this.embeddedViewRef.detectChanges();
		}
	}
}
