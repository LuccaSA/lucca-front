import { ComponentRef, Directive, EmbeddedViewRef, inject, Injector, Input, OnChanges, OnDestroy, SimpleChanges, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { LuOptionContext } from '../select.model';
import { LU_OPTION_CONTEXT, provideOptionContext } from './option.token';

@Directive({
	selector: '[luOptionOutlet]',
	standalone: true,
	providers: [provideOptionContext()],
})
export class LuOptionOutletDirective<T> implements OnChanges, OnDestroy {
	@Input() luOptionOutlet?: Type<unknown> | TemplateRef<LuOptionContext<T>>;
	@Input() luOptionOutletValue: T | undefined;

	private viewContainerRef = inject(ViewContainerRef);
	private injector = inject(Injector);
	private embeddedViewRef?: EmbeddedViewRef<LuOptionContext<T>>;
	private componentRef?: ComponentRef<unknown>;
	private optionContext = inject(LU_OPTION_CONTEXT);

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['luOptionOutlet'] || !this.luOptionOutletValue) {
			this.clearContainer();
		}

		const hasRef = this.embeddedViewRef || this.componentRef;

		if (changes['luOptionOutlet'] || (changes['luOptionOutletValue'].currentValue && !hasRef)) {
			const newValue = changes['luOptionOutletValue'].currentValue as T | undefined;
			if (newValue !== null && newValue !== undefined) {
				this.createComponent();
			}
		} else if (changes['luOptionOutletValue']) {
			this.updateRefValue();
		}
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

	private createComponent(): void {
		if (!this.luOptionOutlet) {
			return;
		}

		if (this.luOptionOutlet instanceof TemplateRef) {
			this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.luOptionOutlet, { $implicit: this.luOptionOutletValue }, { injector: this.injector });
		} else {
			this.optionContext.option$.next(this.luOptionOutletValue);
			this.componentRef = this.viewContainerRef.createComponent(this.luOptionOutlet, { injector: this.injector });
		}
	}

	private updateRefValue(): void {
		if (this.embeddedViewRef) {
			this.embeddedViewRef.context = { $implicit: this.luOptionOutletValue };
		} else if (this.componentRef) {
			this.optionContext.option$.next(this.luOptionOutletValue);
		}
	}
}
