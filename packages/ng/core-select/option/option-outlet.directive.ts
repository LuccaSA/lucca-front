import { ComponentRef, Directive, EmbeddedViewRef, inject, Injector, input, OnDestroy, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { isNotNil, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { LuOptionContext } from '../select.model';
import { LU_OPTION_CONTEXT, provideOptionContext } from './option.token';

function hasRenderableValue<T>(value: T | undefined): value is T {
	return isNotNil(value);
}

@Directive({
	selector: '[luOptionOutlet]',
	providers: [provideOptionContext()],
})
export class LuOptionOutletDirective<T> implements OnDestroy {
	readonly luOptionOutlet = input<Type<unknown> | TemplateRef<LuOptionContext<T>>>();

	readonly luOptionOutletValue = input<T | undefined>();

	readonly luOptionShowNull = input<boolean>(false);

	private viewContainerRef = inject(ViewContainerRef);
	private injector = inject(Injector);
	private embeddedViewRef?: EmbeddedViewRef<LuOptionContext<T>>;
	private componentRef?: ComponentRef<unknown>;
	private optionContext = inject(LU_OPTION_CONTEXT);

	constructor() {
		let previousOutlet: Type<unknown> | TemplateRef<LuOptionContext<T>> | undefined;

		ɵeffectWithDeps([this.luOptionOutlet, this.luOptionOutletValue], (outlet, value) => {
			const outletChanged = outlet !== previousOutlet;
			previousOutlet = outlet;

			if (outletChanged || !hasRenderableValue(value)) {
				this.clearContainer();
			}

			if (outlet && hasRenderableValue(value)) {
				if (!(this.embeddedViewRef || this.componentRef)) {
					if (outlet instanceof TemplateRef) {
						this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(outlet, { $implicit: value }, { injector: this.injector });
					} else {
						this.optionContext.option$.next(value);
						this.componentRef = this.viewContainerRef.createComponent(outlet, { injector: this.injector });
					}
				} else {
					if (this.embeddedViewRef) {
						this.embeddedViewRef.context.$implicit = value;
					} else if (this.componentRef) {
						this.optionContext.option$.next(value);
					}
				}
			}
		});
	}

	ngOnDestroy(): void {
		this.optionContext.destroy();
	}

	private clearContainer(): void {
		this.viewContainerRef.clear();
		this.embeddedViewRef?.destroy();
		this.componentRef?.destroy();
		this.embeddedViewRef = undefined;
		this.componentRef = undefined;
	}

	public static ngTemplateContextGuard<T>(_dir: LuOptionOutletDirective<T>, ctx: unknown): ctx is void {
		return true;
	}
}
