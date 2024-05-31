/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/no-input-rename */

import { FlexibleConnectedPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, inject, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { ALuPopoverTrigger, LuPopoverScrollStrategy, LuPopoverTarget } from '@lucca-front/ng/popover';
import { ILuUser } from '@lucca-front/ng/user';
import { LuUserPopoverPanelComponent } from '../panel/user-popover-panel.component';
import { Observable } from 'rxjs';
import { USER_POPOVER_IS_ACTIVATED } from '../../user-popover.providers';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * This directive is intended to be used in conjunction with an lu-dropdown tag.  It is
 * responsible for toggling the display of the provided dropdown instance.
 */
@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[luUserPopover]',
	standalone: true,
	exportAs: 'LuUserPopoverDirective',
})
export class LuUserPopoverDirective extends ALuPopoverTrigger<LuUserPopoverPanelComponent, LuPopoverTarget> implements AfterViewInit, OnDestroy {
	@Input('luUserPopover')
	public set user(c: ILuUser) {
		if (this.panel) {
			this.panel.user = c;
		}
		this._user = c;
	}

	/** when trigger = hover, delay before the popover panel appears, default 300ms */
	@Input('luUserPopoverEnterDelay')
	public set inputEnterDelay(d: number) {
		this.enterDelay = d;
	}

	/** when trigger = hover, delay before the popover panel disappears, default 100ms */
	@Input('luUserPopoverLeaveDelay')
	public set inputLeaveDelay(d: number) {
		this.leaveDelay = d;
	}

	// TODO : put this back when uniform alignment and position
	// /** how you want to position the panel relative to the target, allowed values: above, below, before, after */
	// @Input('luEmployeeCardPosition') public set inputPosition(pos: LuPopoverPosition) {
	// 	this.target.position = pos;
	// }
	// /** how the panel will be aligned with the target, allowed values: top, bottom, left, right */
	// @Input('luEmployeeCardAlignment') public set inputAlignment(al: LuPopoverAlignment) {
	// 	this.target.alignment = al;
	// }
	/** disable popover apparition */
	@Input('luUserPopoverDisabled')
	public set inputDisabled(d: boolean) {
		this.disabled = d;
	}

	/** accessibility attribute - dont override */
	@HostBinding('attr.aria-expanded')
	public get _attrAriaExpanded() {
		return this._popoverOpen;
	}

	/** accessibility attribute - dont override */
	@HostBinding('attr.id')
	public get _attrId() {
		return this._triggerId;
	}

	/** accessibility attribute - dont override */
	@HostBinding('attr.aria-controls')
	public get _attrAriaControls() {
		return this._panelId;
	}

	private _handleTabindex = false;
	// @HostBinding('attr.tabindex') tabindex;
	// private set tabindex(i: number = null) {

	// }

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	protected override _portal: ComponentPortal<LuUserPopoverPanelComponent>;
	protected _user: ILuUser = { id: 0, firstName: '', lastName: '' };

	public constructor(
		protected override _overlay: Overlay,
		protected override _elementRef: ElementRef<HTMLElement>,
		protected override _viewContainerRef: ViewContainerRef,
	) {
		super(_overlay, _elementRef, _viewContainerRef);
		this.target = new LuPopoverTarget();
		this.target.elementRef = this._elementRef;
		this._triggerId = this._elementRef.nativeElement.getAttribute('id') || this._triggerId;
		this.target.position = 'above';
		this.target.alignment = 'left';
		this.triggerEvent = 'none';
		this.enterDelay = 300;
		this.leaveDelay = 100;

		inject(USER_POPOVER_IS_ACTIVATED)
			.pipe(takeUntilDestroyed())
			.subscribe((isActivated) => {
				this.triggerEvent = isActivated ? 'hover' : 'none';
			});

		this._handleTabindex = this._shouldHandleTabindex();

		if (this._handleTabindex) {
			this._setTabindex(0);
		}
	}

	@HostListener('mouseenter')
	public override onMouseEnter() {
		super.onMouseEnter();
	}

	@HostListener('mouseleave')
	public override onMouseLeave() {
		super.onMouseLeave();
	}

	@HostListener('focus')
	public override onFocus() {
		super.onFocus();
	}

	@HostListener('blur')
	public override onBlur() {
		super.onBlur();
	}

	public ngAfterViewInit() {
		this._checkTarget();
	}

	public ngOnDestroy() {
		this._cleanUpSubscriptions();
		if (this._popoverOpen) {
			this.closePopover();
		}
		this.destroyPopover();
	}

	protected override _createOverlay(): OverlayRef {
		if (!this._overlayRef) {
			this._portal = new ComponentPortal(LuUserPopoverPanelComponent, this._viewContainerRef);
			const config = this._getOverlayConfig();
			this._subscribeToPositions(config.positionStrategy as FlexibleConnectedPositionStrategy);
			this._overlayRef = this._overlay.create(config);
		}

		return this._overlayRef;
	}

	protected override _attachPortalToOverlay(): void {
		const componentRef = this._overlayRef.attach(this._portal);
		this._panel = componentRef.instance;
		this._panel.user = this._user;
		this._panel.overlayRef = this._overlayRef;
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

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	private _setTabindex(i: number = null): void {
		this._elementRef.nativeElement.setAttribute('tabindex', `${i}`);
	}

	// Mandatory but useless
	onClose: Observable<void>;
	onOpen: Observable<void>;

	protected override _emitOpen(): void {}

	protected override _emitClose(): void {}
}
