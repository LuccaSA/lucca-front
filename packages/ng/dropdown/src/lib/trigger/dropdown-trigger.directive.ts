import { ILuDropdownPanel } from '../panel/index';
import { AfterViewInit, OnDestroy, Input, HostBinding, ElementRef, ViewContainerRef, HostListener, Directive, Output, EventEmitter } from '@angular/core';
import { ALuPopoverTrigger, ILuPopoverTarget, ILuPopoverTrigger, LuPopoverTarget, LuPopoverPosition, LuPopoverAlignment } from '@lucca-front/ng/popover';
import { Overlay } from '@angular/cdk/overlay';

/**
* This directive is intended to be used in conjunction with an lu-dropdown tag.  It is
* responsible for toggling the display of the provided dropdown instance.
*/
@Directive({
	selector: '[luDropdown]',
	exportAs: 'LuDropdownTrigger',
})
export class LuDropdownTriggerDirective<TPanel extends ILuDropdownPanel = ILuDropdownPanel>
extends ALuPopoverTrigger<TPanel, ILuPopoverTarget>
implements ILuPopoverTrigger<TPanel, ILuPopoverTarget>, AfterViewInit, OnDestroy {
	/** References the popover instance that the trigger is associated with. */
	@Input('luDropdown') set inputPanel(p: TPanel) { this.panel = p; }

	/** how you want to position the panel relative to the target, allowed values: above, below, before, after */
	@Input('luDropdownPosition') set inputPosition(pos: LuPopoverPosition) { this.target.position = pos; }
	/** how the panel will be align with the target, allowed values: top, bottom, left, right */
	@Input('luDropdownAlignment') set inputAlignment(al: LuPopoverAlignment) { this.target.alignment = al; }
	/** disable popover apparition */
	@Input('luDropdownDisabled') set inputDisabled(d: boolean) { this.disabled = d; }
	/** set to true if you want the panel to appear on top of the target */
	@Input('luDropdownOverlap') set inputOverlap(ov: boolean) { this.target.overlap = ov; }

	/** Event emitted when the associated popover is opened. */
	@Output('luDropdownOnOpen') onOpen = new EventEmitter<void>();
	/** Event emitted when the associated popover is closed. */
	@Output('luDropdownOnClose') onClose = new EventEmitter<void>();

	/** accessibility attribute - dont override */
	@HostBinding('attr.aria-expanded') get _attrAriaExpanded() { return this._popoverOpen; }
	/** accessibility attribute - dont override */
	@HostBinding('attr.id') get _attrId() { return this._triggerId; }
	/** accessibility attribute - dont override */
	@HostBinding('attr.aria-controls') get _attrAriaControls() { return this._panelId; }

	constructor(
		protected override _overlay: Overlay,
		protected override _elementRef: ElementRef,
		protected override _viewContainerRef: ViewContainerRef,
	) {
		super(_overlay, _elementRef, _viewContainerRef);
		this.target = new LuPopoverTarget() as ILuPopoverTarget;
		this.target.elementRef = this._elementRef;
		this._triggerId = this._elementRef.nativeElement.getAttribute('id') || this._triggerId;
		this.triggerEvent = 'click';
		this.target.position = 'below';
		this.target.alignment = 'right';

	}

	@HostListener('click')
	override onClick() {
		super.onClick();
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
