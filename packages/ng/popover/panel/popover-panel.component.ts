import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild } from '@angular/core';
import { luTransformPopover } from '../animation/index';
import { ALuPopoverPanel, ILuPopoverPanel, LuPopoverScrollStrategy } from './popover-panel.model';

// import { standardPopoverTemplate } from './popover.template';

@Component({
	selector: 'lu-popover',
	templateUrl: './popover-panel.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [luTransformPopover],
	standalone: true,
	imports: [CommonModule, OverlayModule, A11yModule],
	exportAs: 'LuPopoverPanel',
})
export class LuPopoverPanelComponent extends ALuPopoverPanel implements ILuPopoverPanel, OnDestroy {
	protected _template: TemplateRef<unknown>;
	protected _templateContext: unknown;

	/** Template to Use for the popover */
	get template(): TemplateRef<unknown> {
		return this._template;
	}
	@Input()
	set template(value: TemplateRef<unknown>) {
		this._template = value;
	}

	/** Template context to use for the popover when created using a template */
	get templateContext(): unknown {
		return this._templateContext;
	}
	@Input('template-context')
	set templateContext(value: unknown) {
		this._templateContext = value;
	}

	/**
	 * Popover container close on click
	 * default: false
	 */
	@Input('close-on-click')
	set inputCloseOnClick(v: boolean) {
		this.closeOnClick = v;
	}

	/**
	 * Popover focus trap using cdkTrapFocus
	 * default: false
	 */
	@Input('trap-focus')
	set inputTrapFocus(v: boolean) {
		this.trapFocus = v;
	}

	/**
	 * Popover scrollStrategy
	 * default: reposition
	 */
	@Input('scroll-strategy')
	set inputScrollStrategy(v: LuPopoverScrollStrategy) {
		this.scrollStrategy = v;
	}

	/**
	 * This method takes classes set on the host lu-popover element and applies them on the
	 * popover template that displays in the overlay container.  Otherwise, it's difficult
	 * to style the containing popover from outside the component.
	 * @param classes list of class names
	 */
	@Input('panel-classes')
	set inputPanelClasses(classes: string) {
		this.panelClasses = classes;
	}
	/**
	 * This method takes classes set on the host lu-popover element and applies them on the
	 * popover template that displays in the overlay container. Otherwise, it's difficult
	 * to style the containing popover from outside the component.
	 * @param classes list of class names
	 */
	@Input('content-classes')
	set inputContentClasses(classes: string) {
		this.contentClasses = classes;
	}

	/** Event emitted when the popover is closed. */
	// eslint-disable-next-line @angular-eslint/no-output-native
	@Output() override close = new EventEmitter<void>();
	// eslint-disable-next-line @angular-eslint/no-output-native
	@Output() override open = new EventEmitter<void>();
	@Output() override hovered = new EventEmitter<boolean>();

	@ViewChild(TemplateRef, { static: true })
	set vcTemplateRef(tr: TemplateRef<unknown>) {
		this.templateRef = tr;
	}

	constructor() {
		super();
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
