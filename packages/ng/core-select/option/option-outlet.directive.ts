import { ComponentRef, Directive, EmbeddedViewRef, inject, Injector, input, OnDestroy, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { isNotNil, luBooleanAttribute, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { LuOptionContext } from '../select.model';
import { LU_OPTION_CONTEXT, provideOptionContext } from './option.token';

function hasRenderableValue<T>(value: T | undefined, showNull: boolean): value is T {
	return showNull ? value !== undefined : isNotNil(value);
}

@Directive({
	selector: '[luOptionOutlet]',
	providers: [provideOptionContext()],
	exportAs: 'ɵluOptionOutlet',
})
export class LuOptionOutletDirective<T> implements OnDestroy {
	private viewContainerRef = inject(ViewContainerRef);
	private injector = inject(Injector);
	private optionContext = inject(LU_OPTION_CONTEXT);

	readonly luOptionOutlet = input<Type<unknown> | TemplateRef<LuOptionContext<T>>>();

	readonly luOptionOutletValue = input<T | undefined>();

	readonly luOptionShowNull = input(false, { transform: luBooleanAttribute });

	readonly isDisabled = toSignal(this.optionContext.isDisabled$, { requireSync: true });

	private embeddedViewRef?: EmbeddedViewRef<LuOptionContext<T>>;
	private componentRef?: ComponentRef<unknown>;

	constructor() {
		let previousOutlet: Type<unknown> | TemplateRef<LuOptionContext<T>> | undefined;

		ɵeffectWithDeps([this.luOptionOutlet, this.luOptionOutletValue, this.luOptionShowNull], (outlet, value, showNull) => {
			const outletChanged = outlet !== previousOutlet;
			previousOutlet = outlet;

			if (outletChanged || !hasRenderableValue(value, showNull)) {
				this.clearContainer();
			}

			if (outlet && hasRenderableValue(value, showNull)) {
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

	public static ngTemplateContextGuard<T>(_dir: LuOptionOutletDirective<T>, _ctx: unknown): _ctx is void {
		return true;
	}
}
