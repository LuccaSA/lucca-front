import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, input, OnDestroy, Output, TemplateRef, viewChild } from '@angular/core';
import { syncSignal, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { luTransformPopover } from '../animation/index';
import { ALuPopoverPanel, ILuPopoverPanel, LuPopoverScrollStrategy } from './popover-panel.model';

// import { standardPopoverTemplate } from './popover.template';

@Component({
	selector: 'lu-popover',
	templateUrl: './popover-panel.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [luTransformPopover],
	imports: [NgTemplateOutlet, OverlayModule, A11yModule],
	exportAs: 'LuPopoverPanel',
})
export class LuPopoverPanelComponent extends ALuPopoverPanel implements ILuPopoverPanel, OnDestroy {
	protected _template: TemplateRef<unknown>;
	protected _templateContext: unknown;

	/** Template to Use for the popover */
	template = input<TemplateRef<unknown>>();

	/** Template context to use for the popover when created using a template */
	templateContext = input<unknown>(undefined, { alias: 'template-context' });

	/**
	 * Popover container close on click
	 * default: false
	 */
	inputCloseOnClick = input<boolean>(false, { alias: 'close-on-click' });

	/**
	 * Popover focus trap using cdkTrapFocus
	 * default: false
	 */
	inputTrapFocus = input<boolean>(false, { alias: 'trap-focus' });

	/**
	 * Popover scrollStrategy
	 * default: reposition
	 */
	inputScrollStrategy = input<LuPopoverScrollStrategy>('reposition', { alias: 'scroll-strategy' });

	/**
	 * This method takes classes set on the host lu-popover element and applies them on the
	 * popover template that displays in the overlay container.  Otherwise, it's difficult
	 * to style the containing popover from outside the component.
	 * @param classes list of class names
	 */
	inputPanelClasses = input<string>('', { alias: 'panel-classes' });

	/**
	 * This method takes classes set on the host lu-popover element and applies them on the
	 * popover template that displays in the overlay container. Otherwise, it's difficult
	 * to style the containing popover from outside the component.
	 * @param classes list of class names
	 */
	inputContentClasses = input<string>('', { alias: 'content-classes' });

	/** Event emitted when the popover is closed. */
	// eslint-disable-next-line @angular-eslint/no-output-native
	@Output() override close = new EventEmitter<void>();
	@Output() override open = new EventEmitter<void>();
	@Output() override hovered = new EventEmitter<boolean>();

	vcTemplateRef = viewChild(TemplateRef);

	constructor() {
		super();

		syncSignal(this.template, (template) => (this._template = template));
		syncSignal(this.templateContext, (templateContext) => (this._templateContext = templateContext));
		syncSignal(this.inputCloseOnClick, (closeOnClick) => (this.closeOnClick = closeOnClick));
		syncSignal(this.inputTrapFocus, (trapFocus) => (this.trapFocus = trapFocus));
		syncSignal(this.inputScrollStrategy, (scrollStrategy) => (this.scrollStrategy = scrollStrategy));
		syncSignal(this.inputPanelClasses, (panelClasses) => (this.panelClasses = panelClasses));
		syncSignal(this.inputContentClasses, (contentClasses) => (this.contentClasses = contentClasses));

		ɵeffectWithDeps([this.vcTemplateRef], (vcTemplateRef) => {
			if (vcTemplateRef) {
				this.templateRef = vcTemplateRef;
			}
		});
	}

	ngOnDestroy() {
		this.onClose();
		this.close.complete();
	}
	_emitCloseEvent(): void {
		this.close.emit();
	}

	_emitOpenEvent(): void {
		this.open.emit();
	}
	_emitHoveredEvent(hovered: boolean): void {
		this.hovered.emit(hovered);
	}
}
