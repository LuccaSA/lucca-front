import { FlexibleConnectedPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AfterViewInit, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output, ViewContainerRef } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ALuPopoverTrigger, LuPopoverPosition, LuPopoverScrollStrategy, LuPopoverTarget } from '@lucca-front/ng/popover';
import { LuTooltipPanelComponent } from '../panel/tooltip-panel.component';

@Directive({
	selector: '[luTooltip]',
	standalone: true,
})
export class LuTooltipTriggerDirective extends ALuPopoverTrigger<LuTooltipPanelComponent, LuPopoverTarget> implements AfterViewInit, OnDestroy {
	@Input('luTooltip') set tooltipContent(c: string | SafeHtml) {
		if (this.panel) {
			this.panel.content = c;
		}

		this._tooltipContent = c;
	}
	/** when trigger = hover, delay before the popover panel appears, default 300ms */
	@Input('luTooltipEnterDelay') set inputEnterDelay(d: number) {
		this.enterDelay = d;
	}
	/** when trigger = hover, delay before the popover panel disappears, default 100ms */
	@Input('luTooltipLeaveDelay') set inputLeaveDelay(d: number) {
		this.leaveDelay = d;
	}
	/** disable popover apparition */
	@Input('luTooltipDisabled') set inputDisabled(d: boolean) {
		this.disabled = d;
		if (this._handleTabindex) {
			this._setTabindex(d ? null : 0);
		}
	}

	@Input('luTooltipPosition') set inputPosition(pos: LuPopoverPosition) {
		this.target.position = pos;
	}

	@Input('luTooltipWhenEllipsis') public set inputWhenEllipsis(we: boolean) {
		this.whenEllipsis = we;
	}

	// FIXME output native
	/** Event emitted when the associated popover is opened. */
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output('luTooltipOnOpen') onOpen = new EventEmitter<void>();
	/** Event emitted when the associated popover is closed. */
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output('luTooltipOnClose') onClose = new EventEmitter<void>();

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
	private _handleTabindex = false;
	// @HostBinding('attr.tabindex') tabindex;
	// private set tabindex(i: number = null) {

	// }

	/** accessibility attribute - dont override */
	@HostBinding('attr.id') get _attrId() {
		return this._triggerId;
	}
	/** accessibility attribute - dont override */
	@HostBinding('attr.aria-describedby') get _attrAriaDescribedBy() {
		return this._panelId;
	}

	protected override _portal: ComponentPortal<LuTooltipPanelComponent>;
	protected _tooltipContent: string | SafeHtml = '';

	constructor(protected override _overlay: Overlay, protected override _elementRef: ElementRef<HTMLElement>, protected override _viewContainerRef: ViewContainerRef) {
		super(_overlay, _elementRef, _viewContainerRef);
		this.target = new LuPopoverTarget();
		this.target.elementRef = this._elementRef;
		this._triggerId = this._elementRef.nativeElement.getAttribute('id') || this._triggerId;
		this.triggerEvent = 'hover';
		this.target.position = 'above';
		this.enterDelay = 300;
		this.leaveDelay = 100;

		this._handleTabindex = this._shouldHandleTabindex();

		if (this._handleTabindex) {
			this._setTabindex(0);
		}
	}

	ngAfterViewInit() {
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

	protected override _createOverlay(): OverlayRef {
		if (!this._overlayRef) {
			this._portal = new ComponentPortal(LuTooltipPanelComponent, this._viewContainerRef);
			const config = this._getOverlayConfig();
			this._subscribeToPositions(config.positionStrategy as FlexibleConnectedPositionStrategy);
			this._overlayRef = this._overlay.create(config);
		}

		return this._overlayRef;
	}

	protected override _attachPortalToOverlay(): void {
		const componentRef = this._overlayRef.attach(this._portal);
		this._panel = componentRef.instance;
		this._panel.content = this._tooltipContent;
	}

	protected override _getPanelScrollStrategy(): LuPopoverScrollStrategy {
		return 'close';
	}

	private _shouldHandleTabindex(): boolean {
		const tag = this._elementRef.nativeElement.tagName?.toLowerCase();
		// https://allyjs.io/data-tables/focusable.html
		// i'm choosing to not support area and iframe, dont @ me
		const nativelyFocusableTags = ['a', 'button', 'input', 'select', 'textarea'];
		const isNatevelyFocusableTag = nativelyFocusableTags.includes(tag);

		const hasATabIndex = this._elementRef.nativeElement.getAttribute('tabindex') !== null;

		return !isNatevelyFocusableTag && !hasATabIndex;
	}

	private _setTabindex(i: number = null): void {
		this._elementRef.nativeElement.setAttribute('tabindex', `${i}`);
	}
}
