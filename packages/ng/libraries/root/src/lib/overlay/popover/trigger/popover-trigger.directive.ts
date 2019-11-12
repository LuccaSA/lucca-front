import {
	AfterViewInit,
	Directive,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
	ViewContainerRef,
	HostListener,
	HostBinding,
} from '@angular/core';

import {
	Overlay,
} from '@angular/cdk/overlay';


import {
	ILuPopoverTrigger, ALuPopoverTrigger, LuPopoverTriggerEvent,
} from './popover-trigger.model';
import {
	ILuPopoverPanel,
} from '../panel/index';
import {
	ILuPopoverTarget, LuPopoverPosition, LuPopoverAlignment, LuPopoverTarget,
} from '../target/index';

/**
* This directive is intended to be used in conjunction with an lu-popover tag.  It is
* responsible for toggling the display of the provided popover instance.
*/
@Directive({
	selector: '[luPopover]',
	// host: {
	// 	'aria-haspopup': 'true',
	// 	'(mousedown)': '_handleMousedown($event)',
	// },
	exportAs: 'LuPopoverTrigger',
})
export class LuPopoverTriggerDirective<TPanel extends ILuPopoverPanel = ILuPopoverPanel, TTarget extends ILuPopoverTarget = ILuPopoverTarget>
extends ALuPopoverTrigger<TPanel, TTarget>
implements ILuPopoverTrigger<TPanel, TTarget>, AfterViewInit, OnDestroy {

	/** References the popover instance that the trigger is associated with. */
	@Input('luPopover') set inputPanel(p: TPanel) { this.panel = p; }

	/** References the popover target instance that the trigger is associated with. */
	@Input('luPopoverTarget') set inputTarget(t: TTarget) { this.target = t; }

	/** References the popover target instance that the trigger is associated with. */
	@Input('luPopoverTrigger') set inoutTriggerEvent(te: LuPopoverTriggerEvent) { this.triggerEvent = te; }

	/** Event emitted when the associated popover is opened. */
	@Output() onPopoverOpen = new EventEmitter<void>();

	/** Event emitted when the associated popover is closed. */
	@Output() onPopoverClose = new EventEmitter<void>();

	/** how you want to position the panel relative to the target, allowed values: above, below, before, after */
	@Input('luPopoverPosition') set inputPosition(pos: LuPopoverPosition) { this.target.position = pos; }
	/** how the panel will be align with the target, allowed values: top, bottom, left, right */
	@Input('luPopoverAlignment') set inputAlignment(al: LuPopoverAlignment) { this.target.alignment = al; }

	/** when trigger = hover, delay before the popover panel appears */
	@Input('luPopoverEnterDelay') set inputEnterDelay(d: number) { this.enterDelay = d; }
	/** when trigger = hover, delay before the popover panel disappears */
	@Input('luPopoverLeaveDelay') set inputLeaveDelay(d: number) { this.leaveDelay = d; }

	/** disable popover apparition */
	@Input('luPopoverDisabled') set inputDisabled(d: boolean) { this.disabled = d; }

	/** set to true if you want the panel to appear on top of the target */
	@Input('luPopoverOverlap') set inputOverlap(ov: boolean) { this.target.overlap = ov; }

	@Input('luPopoverOffsetX') set inputOffsetX(ox: number) { this.target.offsetX = ox; }
	@Input('luPopoverOffsetY') set inputOffsetY(oy: number) { this.target.offsetY = oy; }

	@HostBinding('attr.aria-haspopup') hasPopup = true;

	constructor(
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
	) {
		super(_overlay, _elementRef, _viewContainerRef);
		this.target = new LuPopoverTarget() as ILuPopoverTarget as TTarget;
		this.target.elementRef = this._elementRef;
	}

	@HostListener('click')
	onClick() {
		super.onClick();
	}

	@HostListener('mouseenter')
	onMouseEnter() {
		super.onMouseEnter();
	}

	@HostListener('mouseleave')
	onMouseLeave() {
		super.onMouseLeave();
	}
	@HostListener('focus')
	onFocus() {
		super.onFocus();
	}
	@HostListener('blur')
	onBlur() {
		super.onBlur();
	}

	ngAfterViewInit() {
		this._checkPanel();
		this._checkTarget();
	}
	ngOnDestroy() {
		this.closePopover();
		this.destroyPopover();
	}
}
