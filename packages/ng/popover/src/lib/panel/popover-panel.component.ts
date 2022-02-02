import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
	TemplateRef,
	ViewChild,
	ChangeDetectionStrategy,
} from '@angular/core';

import {
	ILuPopoverPanel,
	LuPopoverScrollStrategy,
	ALuPopoverPanel,
} from './popover-panel.model';
import { luTransformPopover } from '../animation/index';

// import { standardPopoverTemplate } from './popover.template';

@Component({
	selector: 'lu-popover',
	templateUrl: './popover-panel.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [luTransformPopover],
	exportAs: 'LuPopoverPanel',
})
export class LuPopoverPanelComponent
	extends ALuPopoverPanel
	implements ILuPopoverPanel, OnDestroy
{
	protected _template: TemplateRef<any>;
	protected _templateContext: any;

	/** Template to Use for the popover */
	get template(): TemplateRef<any> {
		return this._template;
	}
	@Input()
	set template(value: TemplateRef<any>) {
		this._template = value;
	}

	/** Template context to use for the popover when created using a template */
	get templateContext(): any {
		return this._templateContext;
	}
	@Input('template-context')
	set templateContext(value: any) {
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
	@Output() override close = new EventEmitter<void>();
	@Output() override open = new EventEmitter<void>();
	@Output() override hovered = new EventEmitter<boolean>();

	@ViewChild(TemplateRef, { static: true })
	set vcTemplateRef(tr: TemplateRef<any>) {
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
