import {
	ElementRef,
	Directive,
	Input,
	Inject,
	InjectionToken,
	OnDestroy,
	ViewContainerRef
} from '@angular/core';
import {
	LuPopoverComponent
} from './popover.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
	Overlay,
	OverlayConnectionPosition,
	OverlayRef,
	OverlayState,
	OriginConnectionPosition,
	ScrollStrategy
} from '@angular/cdk/overlay';

export type PopoverPosition = 'left' | 'right' | 'above' | 'below' | 'before' | 'after';
export const LU_POPOVER_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('lu-popover-scroll-strategy');

@Directive({
	selector: '[lu-popover]',
	exportAs: 'luPopover'
})
export class LuPopover implements OnDestroy {
	_overlayRef: OverlayRef | null;
	_popoverInstance: LuPopoverComponent | null;

	private _position: PopoverPosition = 'below';
	private _disabled: boolean = false;
	private _popoverClass: string | string[] | Set<string> | {[key: string]: any};
	private _message: string;

	@Input('luPopoverPosition')
	get position(): PopoverPosition { return this._position; }
	set position(value: PopoverPosition) {
		if (value !== this._position) {
			this._position = value;

			if(this._popoverInstance) {
				this._disposePopover();
			}
		}
	}

	@Input('luPopoverShowDelay') showDelay = 0;
	@Input('luPopoverHideDelay') hideDelay = 0;
	@Input('LuPopoverClass')
	get popoverClass() { return this._popoverClass; }
	set popoverClass(v) { this._popoverClass = v; }

	@Input('luPopover')
	get message() { return this._message; }
	set message(value: string) {
		this._message = value;
		this._setPopoverMessage(this._message);
	}

	constructor(
		private _overlay: Overlay,
		private _viewContainerRef: ViewContainerRef,
		private _elementRef: ElementRef,
		private _scrollDispatcher: ScrollDispatcher,
		@Inject(LU_POPOVER_SCROLL_STRATEGY) private _scrollStrategy
	){}

	hide (delay: number = this.hideDelay): void {
		if(this._popoverInstance) {
			this._popoverInstance.hide(delay);
		}
	}

	show (delay: number = this.showDelay): void {
		if(!this._popoverInstance) {
			this._createPopover();
		}

		this._popoverInstance!.show(this._position, delay);
		this._setPopoverClass(this._popoverClass);
		this._setPopoverMessage(this._message); // Template ?
	}

	toggle(): void {
		this._isPopoverVisible() ? this.hide(): this.show();
	}

	ngOnDestroy() {
		if(this._popoverInstance) {
			this._disposePopover();
		}
	}

	private _disposePopover(): void {
		if (this._overlayRef) {
			this._overlayRef.dispose();
			this._overlayRef = null;
		}

		this._popoverInstance = null;
	}

	private _createPopover(): void {
		let overlayRef = this._createOverlay();
		let portal = new ComponentPortal(LuPopoverComponent, this._viewContainerRef);

		this._popoverInstance = overlayRef.attach(portal).instance;

		this._popoverInstance!.afterHidden().subscribe(() => {
			if(this._popoverInstance) {
				this._disposePopover;
			}
		});
	}

	private _createOverlay(): OverlayRef {
		let origin = this._getOrigin();
		let position = this._getOverlayPosition();

		let strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
		strategy.withScrollableContainers(this._scrollDispatcher.getScrollContainers(this._elementRef));
		strategy.onPositionChange.subscribe(change => {
			if (change.scrollableViewProperties.isOverlayClipped &&
					this._popoverInstance && this._popoverInstance.isVisible()) {
						this.hide(0);
					}
		});

		let config = new OverlayState();

		config.positionStrategy = strategy;
		config.scrollStrategy = this._scrollStrategy();

		this._overlayRef = this._overlay.create(config);

		return this._overlayRef;
	}

	private _getOrigin(): OriginConnectionPosition {
		if (this.position == 'above' || this.position == 'below') {
			return {originX: 'center', originY: this.position == 'above' ? 'top' : 'bottom'};
		}
		if (this.position == 'left' || this.position == 'before') {
			return {originX: 'start', originY: 'center'}
		}
		if (this.position == 'right' || this.position == 'after') {
			return {originX: 'end', originY: 'center'}
		}
	}

	private _getOverlayPosition(): OverlayConnectionPosition {
		if (this.position == 'above') {
			return {overlayX: 'center', overlayY: 'bottom'}
		}
		if (this.position == 'below') {
			return {overlayX: 'center', overlayY: 'top'}
		}

		if (this.position == 'left' || this.position == 'before') {
			return {overlayX: 'end', overlayY: 'center'}
		}
		if (this.position == 'right' || this.position == 'after') {
			return {overlayX: 'start', overlayY: 'center'}
		}
	}

	private _isPopoverVisible(): boolean {
		return !!this._popoverInstance && this._popoverInstance.isVisible();
	}

	private _setPopoverClass(popoverClass: string|string[]|Set<string>|{[key: string]: any}) {
			if(this._popoverInstance) {
				this._popoverInstance.popoverClass = popoverClass;
			}
	}

	private _setPopoverMessage(message: string) {
		if(this._popoverInstance) {
			this._popoverInstance.message = message;
		}
	}
};
