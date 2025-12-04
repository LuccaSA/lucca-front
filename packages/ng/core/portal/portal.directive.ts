import { ComponentRef, Directive, effect, EmbeddedViewRef, inject, Injector, input, OnDestroy, Renderer2, TemplateRef, untracked, ViewContainerRef } from '@angular/core';
import { PORTAL_CONTEXT, PortalContent } from './portal-content';

@Directive({
	selector: '[luPortal]',
})
export class PortalDirective<T = unknown> implements OnDestroy {
	private viewContainerRef = inject(ViewContainerRef);
	private renderer = inject(Renderer2);
	private templateRef = inject(TemplateRef);
	private injector = inject(Injector);

	luPortal = input.required<PortalContent<T>>();

	luPortalContext = input<T | null>(null);

	private createdTextElement: Text | null = null;
	private embeddedViewRef?: EmbeddedViewRef<T>;
	private componentRef?: ComponentRef<unknown>;

	constructor() {
		effect(() => {
			const portal = this.luPortal();
			untracked(() => {
				if (portal) {
					this.render(portal, this.luPortalContext());
				}
			});
		});
		effect(() => {
			const ctx = this.luPortalContext();
			untracked(() => {
				if (this.embeddedViewRef && ctx) {
					this.updateEmbeddedViewContext(ctx);
				}
			});
		});
	}

	private render(luPortal: PortalContent<T>, ctx: T | null): void {
		this.viewContainerRef.clear();
		this.embeddedViewRef = undefined;
		this.componentRef = undefined;

		if (typeof luPortal !== 'string') {
			this.destroyRenderedText();
		}

		if (!luPortal) {
			return;
		}

		if (luPortal instanceof TemplateRef) {
			const context = Object.assign({}, ctx);
			this.embeddedViewRef = this.viewContainerRef.createEmbeddedView<T>(luPortal, context, { injector: this.injector });
		} else if (typeof luPortal === 'string') {
			this.renderText(luPortal);
		} else {
			const injector = Injector.create({
				parent: this.injector,
				providers: [{ provide: PORTAL_CONTEXT, useValue: ctx }],
			});
			try {
				this.componentRef = this.viewContainerRef.createComponent(luPortal, { injector });
				this.componentRef.changeDetectorRef.detectChanges();
			} catch (e) {
				console.error(e);
				throw new Error('[LuPortal] Angular failed to create component, make sure you are not giving LuPortal an Object that is not a Type<>');
			}
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
		console.log(context);
		if (this.embeddedViewRef) {
			const props = Object.keys(context);

			for (const prop of props) {
				delete this.embeddedViewRef.context[prop];
			}

			Object.assign(this.embeddedViewRef.context, context);
			this.embeddedViewRef.detectChanges();
		}
	}

	public static ngTemplateContextGuard<T>(_dir: PortalDirective<T>, ctx: unknown): ctx is void {
		return true;
	}
}
