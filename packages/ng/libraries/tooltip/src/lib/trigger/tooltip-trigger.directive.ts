import {
	Directive,
	Input,
	ElementRef,
	ViewContainerRef,
	ComponentFactoryResolver,
	AfterViewInit,
	HostListener,
	Injector,
	OnDestroy,
	Output,
	EventEmitter,
	HostBinding,
} from '@angular/core';
	import { Overlay } from '@angular/cdk/overlay';
	import { ALuPopoverTrigger, LuPopoverPosition, LuPopoverTarget } from '@lucca-front/ng/popover';
	import { LuTooltipPanelComponent } from '../panel/tooltip-panel.component';

@Directive({
	selector: '[luTooltip]',
})
export class LuTooltipTriggerDirective extends ALuPopoverTrigger<LuTooltipPanelComponent, LuPopoverTarget> implements AfterViewInit, OnDestroy {

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

	/** Event emitted when the associated popover is opened. */
	@Output('luTooltipOnOpen') onOpen = new EventEmitter<void>();
	/** Event emitted when the associated popover is closed. */
	@Output('luTooltipOnClose') onClose = new EventEmitter<void>();
	@HostListener('mouseenter')
	onMouseEnter() {
		super.onMouseEnter();
	}

	@HostListener('mouseleave')
	onMouseLeave() {
		super.onMouseLeave();
	}
	@HostListener('focus')
	onFocus(){
		super.onMouseEnter();
	}
	@HostListener('blur')
	onBlur() {
		super.onMouseLeave();
	}
	@HostBinding('attr.tabindex') tabindex = 0;

	/** accessibility attribute - dont override */
	@HostBinding('attr.id') get _attrId() { return this._triggerId; }
	/** accessibility attribute - dont override */
	@HostBinding('attr.aria-describedby') get _attrAriaDescribedBy() { return this._panelId; }

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
		this._triggerId = this._elementRef.nativeElement.getAttribute('id') || this._triggerId;
		this.triggerEvent = 'hover';
		this.target.position = 'above';
		this.enterDelay = 300;
		this.leaveDelay = 100;

		const factory = componentFactoryResolver.resolveComponentFactory(LuTooltipPanelComponent);
		this.panel = factory.create(injector).instance;
	}

	ngAfterViewInit() {
		this._checkTarget();
	}
	ngOnDestroy() {
		this.closePopover();
		this.destroyPopover();
	}
	protected _emitOpen(): void {
		this.onOpen.emit();
	}
	protected _emitClose(): void {
		this.onClose.emit();
	}
}
