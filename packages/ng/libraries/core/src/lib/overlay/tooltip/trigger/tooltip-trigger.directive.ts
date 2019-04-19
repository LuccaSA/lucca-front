import {
	Directive,
	Input,
	ElementRef,
	ViewContainerRef,
	ComponentFactoryResolver,
	AfterViewInit,
	HostListener,
	Injector,
} from '@angular/core';
	import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
	// import { ComponentPortal } from '@angular/cdk/portal';
	import { ALuPopoverTrigger, LuPopoverPosition, LuPopoverTarget } from '../../popover/index';
	import { LuTooltipPanelComponent } from '../panel/tooltip-panel.component';

@Directive({
	selector: '[luTooltip]',
})
export class LuTooltipTriggerDirective extends ALuPopoverTrigger<LuTooltipPanelComponent, LuPopoverTarget> implements AfterViewInit {

	@Input('luTooltip') set tooltipContent(c) {
		this.panel.content = c;
	}
	/** when trigger = hover, delay before the popover panel appears, default 300ms */
	@Input('luTooltipEnterDelay') set inputEnterDelay(d: number) { this.enterDelay = d; }
	/** when trigger = hover, delay before the popover panel disappears, default 100ms */
	@Input('luTooltipLeaveDelay') set inputLeaveDelay(d: number) { this.leaveDelay = d; }
	/** disable popover apparition */
	@Input('luTooltipDisabled') set inputDisabled(d: boolean) { this.disabled = d; }

	@Input('luTooltipPosition') set inputPosition(pos: LuPopoverPosition) { this.target.position = pos; }

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
		componentFactoryResolver: ComponentFactoryResolver,
		injector: Injector,
	) {
		super(_overlay, _elementRef, _viewContainerRef);
		this.target = new LuPopoverTarget();
		this.target.elementRef = this._elementRef;
		this.triggerEvent = 'hover';
		this.target.position = 'above';
		this.enterDelay = 300;
		this.leaveDelay = 100;

		const factory = componentFactoryResolver.resolveComponentFactory(LuTooltipPanelComponent);
		this.panel = factory.create(injector).instance;
		// const componentRef = this._viewContainerRef.createComponent(factory);
		// this.panel = componentRef.instance;
	}

	ngAfterViewInit() {
		this._checkTarget();
	}

	// protected _getOverlayConfig(): OverlayConfig {
	// 	const overlayState = new OverlayConfig();
	// 	overlayState.positionStrategy = this._getPosition().withDirection(this.dir);
	// 	overlayState.scrollStrategy = this._overlay.scrollStrategies.close();
	// 	return overlayState;
	// }

	// protected _createOverlay(): OverlayRef {
	// 	if (!this._overlayRef) {
	// 		this._portal = new ComponentPortal(
	// 			LuTooltipPanelComponent,
	// 			this._viewContainerRef,
	// 		);
	// 		const config = this._getOverlayConfig();
	// 		this._subscribeToPositions(
	// 			config.positionStrategy as ConnectedPositionStrategy,
	// 		);
	// 		this._overlayRef = this._overlay.create(config);
	// 	}
	// 	return this._overlayRef;
	// }

	// _createTooltip() {
	// 	this._createOverlay();
	// 	this.panel = this._overlayRef.attach(this._portal).instance;
	// 	this.panel.content = this.tooltipContent;
	// 	this.panel.markForChange();
	// 	this.panel.close.subscribe(() => {
	// 		this.closePopover();
	// 	});
	// }

	// protected _initPopover() {
	// 	// this.panel = this._overlayRef.attach(this._portal).instance;
	// 	this.panel.content = this.tooltipContent;
	// 	// this.panel.markForChange();
	// 	this.panel.close.subscribe(() => {
	// 		this.closePopover();
	// 	});
	// }

	// openPopover() {
	// 	if (!this._popoverOpen && !this._disabled) {
	// 		this._createOverlay();
	// 		this._initPopover();
	// 		this._setIsPopoverOpen(true);
	// 	}
	// }
}
