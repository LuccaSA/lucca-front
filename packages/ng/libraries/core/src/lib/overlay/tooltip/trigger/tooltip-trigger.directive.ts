import {
	Directive,
	Input,
	ElementRef,
	ViewContainerRef,
	ComponentFactoryResolver,
	AfterViewInit,
	HostListener,
} from '@angular/core';
	import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
	import { ComponentPortal } from '@angular/cdk/portal';
	import { ALuPopoverTrigger, LuPopoverPosition, LuPopoverTarget } from '../../popover/index';
	import { LuTooltipPanelComponent } from '../panel/tooltip-panel.component';

@Directive({
	selector: '[luTooltip]',
})
export class LuTooltipTriggerDirective extends ALuPopoverTrigger<LuTooltipPanelComponent, LuPopoverTarget> implements AfterViewInit {

	@Input('luTooltip') tooltipContent;
	// @Input() enterDelay = 300;
	// @Input() leaveDelay = 100;
	// @Input('luTooltipPosition') position: LuPopoverPosition = 'above';

	@HostListener('mouseenter')
	onMouseEnter() {
		super.onMouseEnter();
	}

	@HostListener('mouseleave')
	onMouseLeave() {
		super.onMouseLeave();
	}

	constructor(
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
		protected _componentFactoryResolver: ComponentFactoryResolver,
	) {
		super(_overlay, _elementRef, _viewContainerRef);
		this.target = new LuPopoverTarget();
		this.target.elementRef = this._elementRef;
		this.triggerEvent = 'hover';
		this.target.position = 'above';
	}

	ngAfterViewInit() {
		this._checkTarget();
	}

	protected _getOverlayConfig(): OverlayConfig {
		const overlayState = new OverlayConfig();
		overlayState.positionStrategy = this._getPosition().withDirection(this.dir);
		overlayState.scrollStrategy = this._overlay.scrollStrategies.close();
		return overlayState;
	}

	protected _createOverlay(): OverlayRef {
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

	// _createTooltip() {
	// 	this._createOverlay();
	// 	this.panel = this._overlayRef.attach(this._portal).instance;
	// 	this.panel.content = this.tooltipContent;
	// 	this.panel.markForChange();
	// 	this.panel.close.subscribe(() => {
	// 		this.closePopover();
	// 	});
	// }

	protected _initPopover() {
		this.panel = this._overlayRef.attach(this._portal).instance;
		this.panel.content = this.tooltipContent;
		this.panel.markForChange();
		this.panel.close.subscribe(() => {
			this.closePopover();
		});
	}

	openPopover() {
		if (!this._popoverOpen && !this._halt && !this._disabled) {
			const overlay = this._createOverlay();
			this._initPopover();
			this._setIsPopoverOpen(true);
		}
	}
}
