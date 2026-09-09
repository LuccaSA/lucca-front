import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, input, OnDestroy, TemplateRef, viewChild } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { isNotNil, syncInputSignal, ɵeffectWithDeps } from '@lucca-front/ng/core';
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
	readonly template = input<TemplateRef<unknown>>();

	/** Template context to use for the popover when created using a template */
	readonly templateContext = input<unknown>(undefined, { alias: 'template-context' });

	/**
	 * Popover container close on click
	 * default: false
	 */
	readonly inputCloseOnClick = input<boolean>(false, { alias: 'close-on-click' });

	/**
	 * Popover focus trap using cdkTrapFocus
	 * default: false
	 */
	readonly inputTrapFocus = input<boolean>(false, { alias: 'trap-focus' });

	/**
	 * Popover scrollStrategy
	 * default: reposition
	 */
	readonly inputScrollStrategy = input<LuPopoverScrollStrategy>('reposition', { alias: 'scroll-strategy' });

	/**
	 * This method takes classes set on the host lu-popover element and applies them on the
	 * popover template that displays in the overlay container.  Otherwise, it's difficult
	 * to style the containing popover from outside the component.
	 * @param classes list of class names
	 */
	readonly inputPanelClasses = input<string>('', { alias: 'panel-classes' });

	/**
	 * This method takes classes set on the host lu-popover element and applies them on the
	 * popover template that displays in the overlay container. Otherwise, it's difficult
	 * to style the containing popover from outside the component.
	 * @param classes list of class names
	 */
	readonly inputContentClasses = input<string>('', { alias: 'content-classes' });

	override readonly close = new EventEmitter<void>();
	override readonly open = new EventEmitter<void>();
	override readonly hovered = new EventEmitter<boolean>();

	/** Event emitted when the popover is closed. */
	protected readonly closeOutput = outputFromObservable(this.close, { alias: 'close' });
	/** Event emitted when the popover is open. */
	protected readonly openOutput = outputFromObservable(this.open, { alias: 'open' });
	/** Event emitted when the popover is hovered. */
	protected readonly hoveredOutput = outputFromObservable(this.hovered, { alias: 'hovered' });

	readonly vcTemplateRef = viewChild(TemplateRef);

	constructor() {
		super();

		syncInputSignal(this.template, (template) => (this._template = template));
		syncInputSignal(this.templateContext, (templateContext) => (this._templateContext = templateContext));
		syncInputSignal(this.inputCloseOnClick, (closeOnClick) => (this.closeOnClick = closeOnClick));
		syncInputSignal(this.inputTrapFocus, (trapFocus) => (this.trapFocus = trapFocus));
		syncInputSignal(this.inputScrollStrategy, (scrollStrategy) => (this.scrollStrategy = scrollStrategy));
		syncInputSignal(this.inputPanelClasses, (panelClasses) => (this.panelClasses = panelClasses));
		syncInputSignal(this.inputContentClasses, (contentClasses) => (this.contentClasses = contentClasses));

		ɵeffectWithDeps([this.vcTemplateRef], (vcTemplateRef) => {
			if (isNotNil(vcTemplateRef)) {
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
