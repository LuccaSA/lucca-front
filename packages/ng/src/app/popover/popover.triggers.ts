import {
	AfterViewInit,
	Directive,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	Optional,
	Output,
	ViewContainerRef,
} from '@angular/core';


import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
	ConnectedPositionStrategy,
	OriginConnectionPosition,
	Overlay,
	OverlayConnectionPosition,
	OverlayRef,
	OverlayConfig,
	HorizontalConnectionPos,
	VerticalConnectionPos
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { Subscription } from 'rxjs/Subscription';

import { LuPopoverPanel, LuTarget } from './popover.interfaces';
import { LuPopoverAlignment, LuPopoverPosition, LuPopoverTriggerEvent } from './popover.types'
import { throwLuPopoverMissingError } from './popover.errors';



/**
 * This directive is intended to be used in conjunction with an lu-popover tag.  It is
 * responsible for toggling the display of the provided popover instance.
 */
@Directive({
	selector: '[LuPopoverTriggerFor]',
	host: {
		'aria-haspopup': 'true',
		'(mouseenter)': 'onMouseEnter()',
		'(mousedown)': '_handleMousedown($event)',
		'(mouseleave)': 'onMouseLeave()',
		'(click)': 'onClick()',
	},
	exportAs: 'LuPopoverTrigger'
})
export class LuPopoverTrigger implements AfterViewInit, OnDestroy {
	private _portal: TemplatePortal<any>;
	private _overlayRef: OverlayRef | null = null;
	private _popoverOpen: boolean = false;
	private _halt: boolean = false;
	private _backdropSubscription: Subscription;
	private _positionSubscription: Subscription;

	private _mouseoverTimer: any;

	// tracking input type is necessary so it's possible to only auto-focus
	// the first item of the list when the popover is opened via the keyboard
	private _openedByMouse: boolean = false;

	/** References the popover instance that the trigger is associated with. */
	@Input('LuPopoverTriggerFor') popover: LuPopoverPanel;

	/** References the popover target instance that the trigger is associated with. */
	@Input('LuPopoverTargetAt') targetElement: LuTarget;

	/** Position of the popover around the trigger */
	@Input('position') position: LuPopoverPosition;

	/** Alignment of the popover regarding the trigger */
	@Input('alignment') alignment: LuPopoverAlignment;

	/** Popover trigger event */
	@Input('trigger-on') triggerEvent: LuPopoverTriggerEvent;

	/** Popover delay */
	@Input('enter-delay') enterDelay: number;

	/** Popover delay */
	@Input('leave-delay') leaveDelay: number;

	/** Popover overlap trigger */
	@Input('overlap-trigger') overlapTrigger: boolean;

	/** Popover target offset x */
	@Input('offset-x') targetOffsetX: number;

	/** Popover target offset y */
	@Input('offset-y') targetOffsetY: number;

	/** Popover container close on click */
	@Input('close-on-click') closeOnClick: boolean;


	/** Event emitted when the associated popover is opened. */
	@Output() onPopoverOpen = new EventEmitter<void>();

	/** Event emitted when the associated popover is closed. */
	@Output() onPopoverClose = new EventEmitter<void>();


	constructor(private _overlay: Overlay, private _element: ElementRef,
		private _viewContainerRef: ViewContainerRef,
		@Optional() private _dir: Directionality) { }

	ngAfterViewInit() {
		this._checkPopover();
		this._setCurrentConfig();
		this.popover.close.subscribe(() => this.closePopover());
	}

	ngOnDestroy() { this.destroyPopover(); }


	private _setCurrentConfig() {
		if (this.position === 'above' || this.position === 'below' || this.position === 'after' ||
		this.position === 'before') {
			this.popover.position = this.position;
		}

		if (this.alignment === 'top' || this.alignment === 'bottom' || this.alignment === 'left' ||
			this.alignment === 'right') {
			this.popover.alignment = this.alignment;
		}

		if (this.triggerEvent) {
			this.popover.triggerEvent = this.triggerEvent;
		}

		if (this.enterDelay) {
			this.popover.enterDelay = this.enterDelay;
		}

		if (this.leaveDelay) {
			this.popover.leaveDelay = this.leaveDelay;
		}

		if (this.overlapTrigger === true || this.overlapTrigger === false) {
			this.popover.overlapTrigger = this.overlapTrigger;
		}

		if (this.targetOffsetX) {
			this.popover.targetOffsetX = this.targetOffsetX;
		}

		if (this.targetOffsetY) {
			this.popover.targetOffsetY = this.targetOffsetY;
		}

		if (this.closeOnClick === true || this.closeOnClick === false) {
			this.popover.closeOnClick = this.closeOnClick;
		}
	}


	/** Whether the popover is open. */
	get popoverOpen(): boolean { return this._popoverOpen; }

	onClick() {
		if (this.popover.triggerEvent === 'click') {
			this._setCurrentConfig();
			this.togglePopover();
		}
	}

	onMouseEnter() {
		this._halt = false;
		if (this.popover.triggerEvent === 'hover') {
			this._mouseoverTimer = setTimeout(() => {
				this.openPopover();
			}, this.popover.enterDelay);
		}
	}

	onMouseLeave() {
		if (this.popover.triggerEvent === 'hover') {
			if (this._mouseoverTimer) {
				clearTimeout(this._mouseoverTimer);
				this._mouseoverTimer = null;
			}
			if (this._popoverOpen) {
				setTimeout(() => {
					if (!this.popover.closeDisabled) {
						this.closePopover();
					}
				}, this.popover.leaveDelay);
			} else {
				this._halt = true;
			}
		}
	}

	/** Toggles the popover between the open and closed states. */
	togglePopover(): void {
		return this._popoverOpen ? this.closePopover() : this.openPopover();
	}

	/** Opens the popover. */
	openPopover(): void {
		if (!this._popoverOpen && !this._halt) {
			this._createOverlay().attach(this._portal);

			/** Only subscribe to backdrop if trigger event is click */
			if (this.popover.triggerEvent === 'click') {
				this._subscribeToBackdrop();
			}

			this._initPopover();
		}
	}

	/** Closes the popover. */
	closePopover(): void {
		if (this._overlayRef) {
			this._overlayRef.detach();

			/** Only unsubscribe to backdrop if trigger event is click */
			if (this.popover.triggerEvent === 'click') {
				this._backdropSubscription.unsubscribe();
			}

			this._resetPopover();
		}
	}

	/** Removes the popover from the DOM. */
	destroyPopover(): void {
		if (this._overlayRef) {
			this._overlayRef.dispose();
			this._overlayRef = null;
			this._cleanUpSubscriptions();
		}
	}

	/** Focuses the popover trigger. */
	focus() {
		this._element.nativeElement.focus();
	}

	_handleMousedown(event: MouseEvent): void {
		if (!isFakeMousedownFromScreenReader(event)) {
			this._openedByMouse = true;
		}
	}

	/** The text direction of the containing app. */
	get dir(): Direction {
		return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
	}

	/** Return if the popover main positionning is vertical */
	get isVerticallyPositionned(): boolean {
		return (this.popover.position === 'below' || this.popover.position === 'above');
	}

	/**
	* This method ensures that the popover closes when the overlay backdrop is clicked.
	* We do not use first() here because doing so would not catch clicks from within
	* the popover, and it would fail to unsubscribe properly. Instead, we unsubscribe
	* explicitly when the popover is closed or destroyed.
	*/
	private _subscribeToBackdrop(): void {
		if (this._overlayRef) {
			this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
				this.popover._emitCloseEvent();
			});
		}
	}

	/**
	* This method sets the popover state to open and focuses the first item if
	* the popover was opened via the keyboard.
	*/
	private _initPopover(): void {
		this._setIsPopoverOpen(true);
	}

	/**
	* This method resets the popover when it's closed, most importantly restoring
	* focus to the popover trigger if the popover was opened via the keyboard.
	*/
	private _resetPopover(): void {
		this._setIsPopoverOpen(false);

		// Focus only needs to be reset to the host element if the popover was opened
		// by the keyboard and manually shifted to the first popover item.
		if (!this._openedByMouse) {
			this.focus();
		}
		this._openedByMouse = false;
	}

	/** set state rather than toggle to support triggers sharing a popover */
	private _setIsPopoverOpen(isOpen: boolean): void {
		this._popoverOpen = isOpen;
		this._popoverOpen ? this.onPopoverOpen.emit() : this.onPopoverClose.emit();
	}

	/**
	*  This method checks that a valid instance of MdPopover has been passed into
	*  mdPopoverTriggerFor. If not, an exception is thrown.
	*/
	private _checkPopover() {
		if (!this.popover) {
			throwLuPopoverMissingError();
		}
	}

	/**
	*  This method creates the overlay from the provided popover's template and saves its
	*  OverlayRef so that it can be attached to the DOM when openPopover is called.
	*/
	private _createOverlay(): OverlayRef {
		if (!this._overlayRef) {
			this._portal = new TemplatePortal(this.popover.templateRef, this._viewContainerRef);
			const config = this._getOverlayConfig();
			this._subscribeToPositions(config.positionStrategy as ConnectedPositionStrategy);
			this._overlayRef = this._overlay.create(config);
		}

		return this._overlayRef;
	}

	/**
	* This method builds the configuration object needed to create the overlay, the OverlayConfig.
	* @returns OverlayConfig
	*/
	private _getOverlayConfig(): OverlayConfig {
		const overlayState = new OverlayConfig();
		overlayState.positionStrategy = this._getPosition()
			.withDirection(this.dir);

		/** Display overlay backdrop if trigger event is click */
		if (this.popover.triggerEvent === 'click') {
			overlayState.hasBackdrop = true;
			overlayState.backdropClass = 'cdk-overlay-transparent-backdrop';
		}

		overlayState.direction = this.dir;
		overlayState.scrollStrategy = this._overlay.scrollStrategies.reposition();
		return overlayState;
	}

	/**
	* Listens to changes in the position of the overlay and sets the correct classes
	* on the popover based on the new position. This ensures the animation origin is always
	* correct, even if a fallback position is used for the overlay.
	*/
	private _subscribeToPositions(position: ConnectedPositionStrategy): void {
		this._positionSubscription = position.onPositionChange.subscribe(change => {
			const posX: LuPopoverPosition = change.connectionPair.overlayX === 'end' ? 'before' : 'after';
			let posY: LuPopoverPosition = change.connectionPair.overlayY === 'bottom' ? 'above' : 'below';


			if (this.popover.overlapTrigger) {
				posY = posY === 'below' ? 'above' : 'below';
			}

			this.popover.setPositionClassesChanges(posX, posY);
		});
	}

	/**
	* This method builds the position strategy for the overlay, so the popover is properly connected
	* to the trigger.
	* @returns ConnectedPositionStrategy
	*/
	private _getPosition(): ConnectedPositionStrategy {
		const position: OriginConnectionPosition = {originX: 'start', originY: 'top'};

		// Position
		if (this.popover.position === 'above') {
			position.originY = 'top';
		} else if (this.popover.position === 'below') {
			position.originY = 'bottom';
		} else if (this.popover.position === 'before') {
			position.originX = 'start';
		} else if (this.popover.position === 'after') {
			position.originX = 'end';
		}

		// Alignment
		if (this.isVerticallyPositionned) {
			if (this.popover.alignment === 'left') {
				position.originX = 'start';
			} else if (this.popover.alignment === 'right') {
				position.originX = 'end';
			} else {
				position.originX = 'center';
			}
		} else {
			if (this.popover.alignment === 'top') {
				position.originY = 'top';
			} else if (this.popover.alignment === 'bottom') {
				position.originY = 'bottom';
			} else {
				position.originY = 'center';
			}
		}

		const overlayPosition: OverlayConnectionPosition = { overlayX: 'start', overlayY: 'top' };

		if (this.popover.overlapTrigger) {
			overlayPosition.overlayX = position.originX;
			overlayPosition.overlayY = position.originY;
		} else if (this.isVerticallyPositionned) {
			overlayPosition.overlayX = position.originX;
			overlayPosition.overlayY = this.popover.position === 'above' ? 'bottom' : 'top';
		} else {
			overlayPosition.overlayX = this.popover.position === 'before' ? 'end' : 'start';
			overlayPosition.overlayY = position.originY;
		}

		let offsetX = 0;
		let offsetY = 0;

		if (!this.isVerticallyPositionned && this.popover.targetOffsetX && !isNaN(Number(this.popover.targetOffsetX))) {
			if (overlayPosition.overlayX === 'end') {
				offsetX = -Number(this.popover.targetOffsetX);
			} else if (overlayPosition.overlayX === 'start') {
				offsetX = Number(this.popover.targetOffsetX);
			}
		}

		if (this.isVerticallyPositionned && this.popover.targetOffsetY && !isNaN(Number(this.popover.targetOffsetY))) {
			if (overlayPosition.overlayY === 'top') {
				offsetY = Number(this.popover.targetOffsetY);
			} else if (overlayPosition.overlayY === 'bottom') {
				offsetY = -Number(this.popover.targetOffsetY);
			}
		}

		/**
		 * For overriding position element, when LuPopoverTargetAt has a valid element reference.
		 * Useful for sticking popover to parent element and offsetting arrow to trigger element.
		 * If undefined defaults to the trigger element reference.
		 */
		let element = this._element;
		if (typeof this.targetElement !== 'undefined') {
			this.popover.containerPositioning = true;
			element = this.targetElement._elementRef;
		}

		/**
		 * TODO: Updates when withFallbackPosition takes individual offsets
		 */

		return this._overlay.position()
			.connectedTo(element, position, overlayPosition)
			.withFallbackPosition(
				{ originX: position.originX, originY: this._invertVerticalPos( position.originY )},
				{ overlayX: overlayPosition.overlayX, overlayY: this._invertVerticalPos(overlayPosition.overlayY)},
			)
			.withFallbackPosition(
				{ originX: this._invertHorizontalPos(position.originX), originY: position.originY },
				{ overlayX: this._invertHorizontalPos(overlayPosition.overlayX), overlayY: overlayPosition.overlayY }
			)
			.withFallbackPosition(
				{ originX: this._invertHorizontalPos(position.originX), originY: this._invertVerticalPos(position.originY) },
				{ overlayX: this._invertHorizontalPos(overlayPosition.overlayX), overlayY: this._invertVerticalPos(overlayPosition.overlayY) },
			)
			.withOffsetX(offsetX)
			.withOffsetY(offsetY);
	}

	private _invertVerticalPos(y: VerticalConnectionPos) {
		if (y === 'top') {
			y = 'bottom';
		} else if (y === 'bottom') {
			y = 'top';
		}
		return y;
	}

	private _invertHorizontalPos(x: HorizontalConnectionPos) {
		if (x === 'end') {
			x = 'start';
		} else if (x === 'start') {
			x = 'end';
		}

		return x;
	}

	private _cleanUpSubscriptions(): void {
		if (this._backdropSubscription) {
			this._backdropSubscription.unsubscribe();
		}
		if (this._positionSubscription) {
			this._positionSubscription.unsubscribe();
		}
	}
}
