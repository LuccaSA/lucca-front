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
	HostListener,
} from '@angular/core';

import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import {
	ConnectedPositionStrategy,
	OriginConnectionPosition,
	Overlay,
	OverlayConnectionPosition,
	OverlayRef,
	OverlayConfig,
	HorizontalConnectionPos,
	VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { Subscription } from 'rxjs/Subscription';

import {
	ILuPopoverTrigger,
} from './popover-trigger.model';
import {
	ILuPopoverPanel,
	LuPopoverPosition,
} from '../panel/popover-panel.model';
import {
	ILuPopoverTarget,
} from '../target/popover-target.model';
import { throwLuPopoverMissingError } from '../popover.errors';

/**
 * This directive is intended to be used in conjunction with an lu-popover tag.  It is
 * responsible for toggling the display of the provided popover instance.
 */
@Directive({
	selector: '[luPopoverTriggerFor]',
	host: {
		'aria-haspopup': 'true',
		'(mousedown)': '_handleMousedown($event)',
	},
	exportAs: 'LuPopoverTrigger',
})
export class LuPopoverTrigger implements AfterViewInit, OnDestroy {
	private _portal: TemplatePortal<any>;
	private _overlayRef: OverlayRef | null = null;
	private _popoverOpen = false;
	private _halt = false;
	private _backdropSubscription: Subscription;
	private _positionSubscription: Subscription;

	private _mouseoverTimer: any;

	// tracking input type is necessary so it's possible to only auto-focus
	// the first item of the list when the popover is opened via the keyboard
	private _openedByMouse: boolean = false;

	/** References the popover instance that the trigger is associated with. */
	@Input('luPopoverTriggerFor') popover: ILuPopoverPanel;

	/** References the popover target instance that the trigger is associated with. */
	@Input('luPopoverTargetAt') targetElement: ILuPopoverTarget;

	/** Event emitted when the associated popover is opened. */
	@Output() onPopoverOpen = new EventEmitter<void>();

	/** Event emitted when the associated popover is closed. */
	@Output() onPopoverClose = new EventEmitter<void>();

	constructor(
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
	) {}

	ngAfterViewInit() {
		this._checkPopover();
		this.popover.close.subscribe(() => this.closePopover());
	}

	ngOnDestroy() {
		this.destroyPopover();
	}

	/** Whether the popover is open. */
	get popoverOpen(): boolean {
		return this._popoverOpen;
	}

	@HostListener('click')
	onClick() {
		if (this.popover.triggerEvent === 'click') {
			this.togglePopover();
		}
	}

	@HostListener('mouseenter')
	onMouseEnter() {
		this._halt = false;
		if (this.popover.triggerEvent === 'hover') {
			this._mouseoverTimer = setTimeout(() => {
				this.openPopover();
			}, this.popover.enterDelay);
		}
	}

	@HostListener('mouseleave')
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
	@HostListener('focus')
	onFocus() {
		if (this.popover.triggerEvent === 'focus') {
			this.openPopover();
		}
	}
	@HostListener('blur')
	onBlur() {
		if (this.popover.triggerEvent === 'focus') {
			this.closePopover();
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

			/** unsubscribe to backdrop click if it was defined */
			if (!!this._backdropSubscription) {
				// if (this.popover.triggerEvent === 'click') {
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
		this._elementRef.nativeElement.focus();
	}

	_handleMousedown(event: MouseEvent): void {
		if (!isFakeMousedownFromScreenReader(event)) {
			this._openedByMouse = true;
		}
	}

	/** The text direction of the containing app. */
	get dir(): Direction {
		// return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
		return 'ltr';
	}

	/** Return if the popover main positionning is vertical */
	get isVerticallyPositionned(): boolean {
		return (
			this.popover.position === 'below' || this.popover.position === 'above'
		);
	}

	/**
	 * This method ensures that the popover closes when the overlay backdrop is clicked.
	 * We do not use first() here because doing so would not catch clicks from within
	 * the popover, and it would fail to unsubscribe properly. Instead, we unsubscribe
	 * explicitly when the popover is closed or destroyed.
	 */
	protected _subscribeToBackdrop(): void {
		if (this._overlayRef) {
			this._backdropSubscription = this._overlayRef
				.backdropClick()
				.subscribe(() => {
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
		if (!this._openedByMouse && this.popover.triggerEvent === 'click') {
			this.focus();
		}
		this._openedByMouse = false;
	}

	/** set state rather than toggle to support triggers sharing a popover */
	private _setIsPopoverOpen(isOpen: boolean): void {
		this._popoverOpen = isOpen;
		this._popoverOpen ? this.popover._emitOpenEvent() : this.popover._emitCloseEvent();
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
			this._portal = new TemplatePortal(
				this.popover.templateRef,
				this._viewContainerRef,
			);
			const config = this._getOverlayConfig();
			this._subscribeToPositions(
				config.positionStrategy as ConnectedPositionStrategy,
			);
			this._overlayRef = this._overlay.create(config);
		}

		return this._overlayRef;
	}

	/**
	 * This method builds the configuration object needed to create the overlay, the OverlayConfig.
	 * @returns OverlayConfig
	 */
	protected _getOverlayConfig(): OverlayConfig {
		const overlayState = new OverlayConfig();
		overlayState.positionStrategy = this._getPosition().withDirection(this.dir);

		/** Display overlay backdrop if trigger event is click */
		if (this.popover.triggerEvent === 'click') {
			overlayState.hasBackdrop = true;
			overlayState.backdropClass = 'cdk-overlay-transparent-backdrop';
		}

		overlayState.direction = this.dir;
		switch (this.popover.scrollStrategy) {
			case 'block':
				overlayState.scrollStrategy = this._overlay.scrollStrategies.block();
				break;

			case 'close':
				overlayState.scrollStrategy = this._overlay.scrollStrategies.close();
				break;

			default:
				overlayState.scrollStrategy = this._overlay.scrollStrategies.reposition();
				break;
		}
		return overlayState;
	}

	/**
	 * Listens to changes in the position of the overlay and sets the correct classes
	 * on the popover based on the new position. This ensures the animation origin is always
	 * correct, even if a fallback position is used for the overlay.
	 */
	private _subscribeToPositions(position: ConnectedPositionStrategy): void {
		this._positionSubscription = position.onPositionChange.subscribe(change => {
			const posX: LuPopoverPosition =
				change.connectionPair.overlayX === 'end' ? 'before' : 'after';
			const posY: LuPopoverPosition =
				change.connectionPair.overlayY === 'bottom' ? 'above' : 'below';

			this.popover.setPositionClassesChanges(posX, posY);
		});
	}

	/**
	 * This method builds the position strategy for the overlay, so the popover is properly connected
	 * to the trigger.
	 * @returns ConnectedPositionStrategy
	 */
	private _getPosition(): ConnectedPositionStrategy {
		const position: OriginConnectionPosition = {
			originX: 'start',
			originY: 'top',
		};

		// Position
		if (this.popover.position === 'above') {
			position.originY = this.popover.overlapTrigger ? 'bottom' : 'top';
		} else if (this.popover.position === 'below') {
			position.originY = this.popover.overlapTrigger ? 'top' : 'bottom';
		} else if (this.popover.position === 'before') {
			position.originX = this.popover.overlapTrigger ? 'end' : 'start';
		} else if (this.popover.position === 'after') {
			position.originX = this.popover.overlapTrigger ? 'start' : 'end';
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

		const overlayPosition: OverlayConnectionPosition = {
			overlayX: 'start',
			overlayY: 'top',
		};

		if (this.popover.overlapTrigger) {
			overlayPosition.overlayX = position.originX;
			overlayPosition.overlayY = position.originY;
		} else if (this.isVerticallyPositionned) {
			overlayPosition.overlayX = position.originX;
			overlayPosition.overlayY =
				this.popover.position === 'above' ? 'bottom' : 'top';
		} else {
			overlayPosition.overlayX =
				this.popover.position === 'before' ? 'end' : 'start';
			overlayPosition.overlayY = position.originY;
		}

		let offsetX = 0;
		let offsetY = 0;

		if (
			this.popover.overlapTrigger &&
			!this.isVerticallyPositionned &&
			this.popover.targetOffsetX &&
			!isNaN(Number(this.popover.targetOffsetX))
		) {
			if (overlayPosition.overlayX === 'end') {
				offsetX = -Number(this.popover.targetOffsetX);
			} else if (overlayPosition.overlayX === 'start') {
				offsetX = Number(this.popover.targetOffsetX);
			}
		}

		if (
			this.isVerticallyPositionned &&
			this.popover.targetOffsetY &&
			!isNaN(Number(this.popover.targetOffsetY))
		) {
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
		let element = this._elementRef;
		if (typeof this.targetElement !== 'undefined') {
			this.popover.containerPositioning = true;
			element = this.targetElement._elementRef;
		}

		/**
		 * TODO: Updates when withFallbackPosition takes individual offsets
		 */

		return this._overlay
			.position()
			.connectedTo(element, position, overlayPosition)
			.withFallbackPosition(
				{
					originX: position.originX,
					originY: this._invertVerticalPos(position.originY),
				},
				{
					overlayX: overlayPosition.overlayX,
					overlayY: this._invertVerticalPos(overlayPosition.overlayY),
				},
			)
			.withFallbackPosition(
				{
					originX: this._invertHorizontalPos(position.originX),
					originY: position.originY,
				},
				{
					overlayX: this._invertHorizontalPos(overlayPosition.overlayX),
					overlayY: overlayPosition.overlayY,
				},
			)
			.withFallbackPosition(
				{
					originX: this._invertHorizontalPos(position.originX),
					originY: this._invertVerticalPos(position.originY),
				},
				{
					overlayX: this._invertHorizontalPos(overlayPosition.overlayX),
					overlayY: this._invertVerticalPos(overlayPosition.overlayY),
				},
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
