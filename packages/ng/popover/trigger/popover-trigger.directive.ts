import { Overlay } from '@angular/cdk/overlay';
import { AfterViewInit, Directive, ElementRef, EventEmitter, input, OnDestroy, Output, ViewContainerRef } from '@angular/core';
import { syncSignal } from '@lucca-front/ng/core';
import { ILuPopoverPanel } from '../panel/index';
import { ILuPopoverTarget, LuPopoverAlignment, LuPopoverPosition, LuPopoverTarget } from '../target/index';
import { ALuPopoverTrigger, ILuPopoverTrigger, LuPopoverTriggerEvent } from './popover-trigger.model';

@Directive({
	selector: '[luPopover]',
	exportAs: 'LuPopoverTrigger',
	host: {
		'[attr.aria-expanded]': '_attrAriaExpanded',
		'[attr.id]': '_attrId',
		'[attr.aria-controls]': '_attrAriaControls',
		'(click)': 'onClick()',
		'(mouseenter)': 'onMouseEnter()',
		'(mouseleave)': 'onMouseLeave()',
		'(focus)': 'onFocus()',
		'(blur)': 'onBlur()',
	},
})
export class LuPopoverTriggerDirective<TPanel extends ILuPopoverPanel = ILuPopoverPanel, TTarget extends ILuPopoverTarget = ILuPopoverTarget>
	extends ALuPopoverTrigger<TPanel, TTarget>
	implements ILuPopoverTrigger<TPanel, TTarget>, AfterViewInit, OnDestroy
{
	/** References the popover instance that the trigger is associated with. */
	inputPanel = input<TPanel>(undefined, { alias: 'luPopover' });

	/** References the popover target instance that the trigger is associated with. */
	inputTarget = input<TTarget>(undefined, { alias: 'luPopoverTarget' });

	/** References the popover target instance that the trigger is associated with. */
	inputTriggerEvent = input<LuPopoverTriggerEvent>(undefined, { alias: 'luPopoverTrigger' });

	/** Event emitted when the associated popover is opened. */
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output('luPopoverOnOpen') onOpen = new EventEmitter<void>();

	/** Event emitted when the associated popover is closed. */
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output('luPopoverOnClose') onClose = new EventEmitter<void>();

	/** how you want to position the panel relative to the target, allowed values: above, below, before, after */
	inputPosition = input<LuPopoverPosition>(undefined, { alias: 'luPopoverPosition' });

	/** how the panel will be align with the target, allowed values: top, bottom, left, right */
	inputAlignment = input<LuPopoverAlignment>(undefined, { alias: 'luPopoverAlignment' });

	/** when trigger = hover, delay before the popover panel appears */
	inputEnterDelay = input<number>(undefined, { alias: 'luPopoverEnterDelay' });

	/** when trigger = hover, delay before the popover panel disappears */
	inputLeaveDelay = input<number>(undefined, { alias: 'luPopoverLeaveDelay' });

	/** disable popover apparition */
	inputDisabled = input<boolean>(undefined, { alias: 'luPopoverDisabled' });

	/** set to true if you want the panel to appear on top of the target */
	inputOverlap = input<boolean>(undefined, { alias: 'luPopoverOverlap' });

	inputOffsetX = input<number>(undefined, { alias: 'luPopoverOffsetX' });

	inputOffsetY = input<number>(undefined, { alias: 'luPopoverOffsetY' });

	/** accessibility attribute - dont override */
	get _attrAriaExpanded() {
		return this._popoverOpen;
	}
	/** accessibility attribute - dont override */
	get _attrId() {
		return this._triggerId;
	}
	/** accessibility attribute - dont override */
	get _attrAriaControls() {
		return this._panelId;
	}

	constructor(
		protected override _overlay: Overlay,
		protected override _elementRef: ElementRef<HTMLElement>,
		protected override _viewContainerRef: ViewContainerRef,
	) {
		super(_overlay, _elementRef, _viewContainerRef);
		this.target = new LuPopoverTarget() as ILuPopoverTarget as TTarget;
		this.target.elementRef = this._elementRef;
		this._triggerId = this._elementRef.nativeElement.getAttribute('id') || this._triggerId;
		this.#initTarget();

		syncSignal(this.inputPanel, (inputPanel) => (this.panel = inputPanel));
		syncSignal(this.inputTriggerEvent, (inputTriggerEvent) => (this.triggerEvent = inputTriggerEvent));
		syncSignal(this.inputEnterDelay, (inputEnterDelay) => (this.enterDelay = inputEnterDelay));
		syncSignal(this.inputLeaveDelay, (inputLeaveDelay) => (this.leaveDelay = inputLeaveDelay));
		syncSignal(this.inputDisabled, (inputDisabled) => (this.disabled = inputDisabled));
	}

	#initTarget() {
		syncSignal(this.inputTarget, (inputTarget) => (this.target = inputTarget));
		syncSignal(this.inputPosition, (inputPosition) => (this.target.position = inputPosition));
		syncSignal(this.inputAlignment, (inputAlignment) => (this.target.alignment = inputAlignment));
		syncSignal(this.inputOverlap, (inputOverlap) => (this.target.overlap = inputOverlap));
		syncSignal(this.inputOffsetX, (inputOffsetX) => (this.target.offsetX = inputOffsetX));
		syncSignal(this.inputOffsetY, (inputOffsetY) => (this.target.offsetY = inputOffsetY));
	}

	override onClick() {
		super.onClick();
	}

	override onMouseEnter() {
		super.onMouseEnter();
	}

	override onMouseLeave() {
		super.onMouseLeave();
	}

	override onFocus() {
		super.onFocus();
	}

	override onBlur() {
		super.onBlur();
	}

	ngAfterViewInit() {
		this._checkPanel();
		this._checkTarget();
	}

	ngOnDestroy() {
		this._cleanUpSubscriptions();
		if (this._popoverOpen) {
			this.closePopover();
		}
		this.destroyPopover();
	}

	protected _emitOpen(): void {
		this.onOpen.emit();
	}

	protected _emitClose(): void {
		this.onClose.emit();
	}
}
