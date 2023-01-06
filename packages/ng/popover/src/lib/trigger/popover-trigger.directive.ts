import { Overlay } from '@angular/cdk/overlay';
import { AfterViewInit, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output, ViewContainerRef } from '@angular/core';
import { ILuPopoverPanel } from '../panel/index';
import { ILuPopoverTarget, LuPopoverAlignment, LuPopoverPosition, LuPopoverTarget } from '../target/index';
import { ALuPopoverTrigger, ILuPopoverTrigger, LuPopoverTriggerEvent } from './popover-trigger.model';

/**
 * This directive is intended to be used in conjunction with an lu-popover tag.  It is
 * responsible for toggling the display of the provided popover instance.
 */
@Directive({
	selector: '[luPopover]',
	exportAs: 'LuPopoverTrigger',
	standalone: true,
	providers: [Overlay],
})
export class LuPopoverTriggerDirective<TPanel extends ILuPopoverPanel = ILuPopoverPanel, TTarget extends ILuPopoverTarget = ILuPopoverTarget>
	extends ALuPopoverTrigger<TPanel, TTarget>
	implements ILuPopoverTrigger<TPanel, TTarget>, AfterViewInit, OnDestroy
{
	/** References the popover instance that the trigger is associated with. */
	@Input('luPopover') set inputPanel(p: TPanel) {
		this.panel = p;
	}

	/** References the popover target instance that the trigger is associated with. */
	@Input('luPopoverTarget') set inputTarget(t: TTarget) {
		this.target = t;
	}

	/** References the popover target instance that the trigger is associated with. */
	@Input('luPopoverTrigger') set inputTriggerEvent(te: LuPopoverTriggerEvent) {
		this.triggerEvent = te;
	}

	/** Event emitted when the associated popover is opened. */
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output('luPopoverOnOpen') onOpen = new EventEmitter<void>();

	/** Event emitted when the associated popover is closed. */
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output('luPopoverOnClose') onClose = new EventEmitter<void>();

	/** how you want to position the panel relative to the target, allowed values: above, below, before, after */
	@Input('luPopoverPosition') set inputPosition(pos: LuPopoverPosition) {
		this.target.position = pos;
	}
	/** how the panel will be align with the target, allowed values: top, bottom, left, right */
	@Input('luPopoverAlignment') set inputAlignment(al: LuPopoverAlignment) {
		this.target.alignment = al;
	}

	/** when trigger = hover, delay before the popover panel appears */
	@Input('luPopoverEnterDelay') set inputEnterDelay(d: number) {
		this.enterDelay = d;
	}
	/** when trigger = hover, delay before the popover panel disappears */
	@Input('luPopoverLeaveDelay') set inputLeaveDelay(d: number) {
		this.leaveDelay = d;
	}

	/** disable popover apparition */
	@Input('luPopoverDisabled') set inputDisabled(d: boolean) {
		this.disabled = d;
	}

	/** set to true if you want the panel to appear on top of the target */
	@Input('luPopoverOverlap') set inputOverlap(ov: boolean) {
		this.target.overlap = ov;
	}

	@Input('luPopoverOffsetX') set inputOffsetX(ox: number) {
		this.target.offsetX = ox;
	}
	@Input('luPopoverOffsetY') set inputOffsetY(oy: number) {
		this.target.offsetY = oy;
	}

	/** accessibility attribute - dont override */
	@HostBinding('attr.aria-expanded') get _attrAriaExpanded() {
		return this._popoverOpen;
	}
	/** accessibility attribute - dont override */
	@HostBinding('attr.id') get _attrId() {
		return this._triggerId;
	}
	/** accessibility attribute - dont override */
	@HostBinding('attr.aria-controls') get _attrAriaControls() {
		return this._panelId;
	}

	constructor(protected override _overlay: Overlay, protected override _elementRef: ElementRef<HTMLElement>, protected override _viewContainerRef: ViewContainerRef) {
		super(_overlay, _elementRef, _viewContainerRef);
		this.target = new LuPopoverTarget() as ILuPopoverTarget as TTarget;
		this.target.elementRef = this._elementRef;
		this._triggerId = this._elementRef.nativeElement.getAttribute('id') || this._triggerId;
	}

	@HostListener('click')
	override onClick() {
		super.onClick();
	}

	@HostListener('mouseenter')
	override onMouseEnter() {
		super.onMouseEnter();
	}

	@HostListener('mouseleave')
	override onMouseLeave() {
		super.onMouseLeave();
	}
	@HostListener('focus')
	override onFocus() {
		super.onFocus();
	}
	@HostListener('blur')
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
