import {
	Directive,
	Input,
	OnInit,
	ElementRef,
	ViewContainerRef,
	ComponentFactoryResolver,
	AfterViewInit,
	HostListener } from '@angular/core';
import { ALuPopoverTrigger } from '../popover';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { LuTooltipPanelComponent } from './panel/tooltip-panel.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Directive({
	selector: '[luTooltip]',
})
export class LuTooltipDirective extends ALuPopoverTrigger<LuTooltipPanelComponent> implements OnInit, AfterViewInit {

	@Input('luTooltip') tooltipContent;
	@Input() enterDelay = 300;
	@Input() leaveDelay = 100;

	@HostListener('mouseenter')
	onMouseEnter() {
		this._halt = false;
		if (this._mouseoverTimer) {
			clearTimeout(this._mouseoverTimer);
			this._mouseoverTimer = null;
		}
		this._mouseoverTimer = setTimeout(() => {
			this.openPopover();
		}, this.enterDelay);
	}

	@HostListener('mouseleave')
	onMouseLeave() {
		if (this._mouseoverTimer) {
			clearTimeout(this._mouseoverTimer);
			this._mouseoverTimer = null;
		}
		if (this._popoverOpen) {
			this._mouseoverTimer = setTimeout(() => {
				if (!this.popover.closeDisabled) {
					this.closePopover();
				}
			}, this.leaveDelay);
		} else {
			this._halt = true;
		}
	}

	constructor(
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
		protected _componentFactoryResolver: ComponentFactoryResolver) {
		super(_overlay, _elementRef, _viewContainerRef);
	}

	ngAfterViewInit() {
	}
	ngOnInit(): void {
	}

	_getOverlayConfig(): OverlayConfig {
		const overlayState = new OverlayConfig();
		overlayState.positionStrategy = this._overlay.position()
			.connectedTo(this._elementRef, {
				originX: 'center',
				originY: 'top',
			}, {
				overlayX: 'center',
				overlayY: 'bottom',
			});

		overlayState.hasBackdrop = false;
		overlayState.direction = this.dir;
		overlayState.scrollStrategy = this._overlay.scrollStrategies.close();
		return overlayState;
	}

	_createOverlay(): OverlayRef {
		if (!this._overlayRef) {
			this._portal = new ComponentPortal(
				LuTooltipPanelComponent,
				this._viewContainerRef,
			);
			const config = this._getOverlayConfig();
			this._overlayRef = this._overlay.create(config);
		}
		return this._overlayRef;
	}

	_createTooltip() {
		this._createOverlay();
		this.popover = this._overlayRef.attach(this._portal).instance;
		this.popover.content = this.tooltipContent;
		this.popover.markForChange();
		this.popover.close.subscribe(() => {
			this.closePopover();
		});
	}

	openPopover() {
		if (!this._popoverOpen && !this._halt && !this._disabled) {
			this._createTooltip();
			this._setIsPopoverOpen(true);
		}
	}
}
