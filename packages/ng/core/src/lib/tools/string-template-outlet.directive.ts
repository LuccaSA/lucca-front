import { Directive, EmbeddedViewRef, Input, OnChanges, SimpleChange, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

// Modified version of https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/core/outlet/string_template_outlet.directive.ts

export class StringTemplateOutletContext<T = unknown> {
	$implicit: T;
}

@Directive({
	selector: '[luStringTemplateOutlet]',
	exportAs: 'luStringTemplateOutlet',
	standalone: true,
})
export class StringTemplateOutletDirective implements OnChanges {
	private embeddedViewRef: EmbeddedViewRef<unknown> | null = null;
	private context = new StringTemplateOutletContext();
	@Input() nzStringTemplateOutletContext: unknown | null = null;
	@Input() nzStringTemplateOutlet: unknown | TemplateRef<unknown> = null;

	constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<unknown>) {}

	private recreateView(): void {
		this.viewContainer.clear();
		const isTemplateRef = this.nzStringTemplateOutlet instanceof TemplateRef;
		const templateRef = (isTemplateRef ? this.nzStringTemplateOutlet : this.templateRef) as TemplateRef<unknown>;
		this.embeddedViewRef = this.viewContainer.createEmbeddedView(templateRef, isTemplateRef ? this.nzStringTemplateOutletContext : this.context);
	}

	private updateContext(): void {
		const isTemplateRef = this.nzStringTemplateOutlet instanceof TemplateRef;
		const newCtx = isTemplateRef ? this.nzStringTemplateOutletContext : this.context;
		const oldCtx = this.embeddedViewRef.context;
		if (newCtx) {
			Object.assign(oldCtx, newCtx);
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		const { nzStringTemplateOutletContext, nzStringTemplateOutlet } = changes;
		const shouldRecreateView = (): boolean => {
			let shouldOutletRecreate = false;
			if (nzStringTemplateOutlet) {
				if (nzStringTemplateOutlet.firstChange) {
					shouldOutletRecreate = true;
				} else {
					const isPreviousOutletTemplate = nzStringTemplateOutlet.previousValue instanceof TemplateRef;
					const isCurrentOutletTemplate = nzStringTemplateOutlet.currentValue instanceof TemplateRef;
					shouldOutletRecreate = isPreviousOutletTemplate || isCurrentOutletTemplate;
				}
			}
			const hasContextShapeChanged = (ctxChange: SimpleChange): boolean => {
				const prevCtxKeys = Object.keys((ctxChange.previousValue as unknown) || {});
				const currCtxKeys = Object.keys((ctxChange.currentValue as unknown) || {});
				if (prevCtxKeys.length === currCtxKeys.length) {
					for (const propName of currCtxKeys) {
						if (prevCtxKeys.indexOf(propName) === -1) {
							return true;
						}
					}
					return false;
				} else {
					return true;
				}
			};
			const shouldContextRecreate = nzStringTemplateOutletContext && hasContextShapeChanged(nzStringTemplateOutletContext);
			return shouldContextRecreate || shouldOutletRecreate;
		};

		if (nzStringTemplateOutlet) {
			this.context.$implicit = nzStringTemplateOutlet.currentValue;
		}

		const recreateView = shouldRecreateView();
		if (recreateView) {
			/** recreate view when context shape or outlet change **/
			this.recreateView();
		} else {
			/** update context **/
			this.updateContext();
		}
	}
}
