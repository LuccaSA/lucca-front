import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import {
	FlexibleConnectedPositionStrategy, HorizontalConnectionPos, OriginConnectionPosition, Overlay, OverlayConfig, OverlayConnectionPosition, OverlayRef, VerticalConnectionPos
} from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
	ElementRef,
	ViewContainerRef
} from '@angular/core';
import { generateId } from '@lucca-front/ng/core';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { debounce, distinctUntilChanged, map } from 'rxjs/operators';
import {
	ILuPopoverPanel
} from '../panel/index';
import {
	ILuPopoverTarget
} from '../target/index';
import { throwLuPopoverMissingPanelError, throwLuPopoverMissingTargetError } from './popover-trigger.error';

export type LuPopoverTriggerEvent = 'click' | 'hover' | 'none' | 'focus';

/**
 * component that will decide when to show the popover and attach it to the target
 */
export declare interface ILuPopoverTrigger<TPanel extends ILuPopoverPanel = ILuPopoverPanel, TTarget extends ILuPopoverTarget = ILuPopoverTarget> {
	/** the popover panel to display */
	panel: TPanel;
	/** the popover target to attach the panel */
	target: TTarget;

	/** when to display the popover */
	triggerEvent: LuPopoverTriggerEvent;
	/** delay before popover apparition when trigger is 'hover' */
	enterDelay: number;
	/** delay before popover disparition when trigger is 'hover' */
	leaveDelay: number;

	/** disable popover apparition */
	disabled: boolean;
	/** Event emitted when the associated popover is opened. */
	onOpen: Observable<void>;
	/** Event emitted when the associated popover is closed. */
	onClose: Observable<void>;

	openPopover();
	closePopover();
	togglePopover();
	destroyPopover();
}

// tslint:disable-next-line: max-line-length
export abstract class ALuPopoverTrigger<TPanel extends ILuPopoverPanel = ILuPopoverPanel, TTarget extends ILuPopoverTarget = ILuPopoverTarget>
implements ILuPopoverTrigger<TPanel, TTarget> {
	protected _portal: TemplatePortal<any> | ComponentPortal<any>;
	protected _overlayRef: OverlayRef | null = null;
	protected _popoverOpen = false;
	// protected _halt = false;
	protected _backdropSubscription: Subscription;
	protected _positionSubscription: Subscription;

	protected _mouseoverTimer: any;

	protected _hovered$ = new Subject();
	protected _hoveredSubscription: Subscription;
	protected _panelEventsSubscriptions: Subscription;

	// tracking input type is necessary so it's possible to only auto-focus
	// the first item of the list when the popover is opened via the keyboard
	protected _openedByMouse = false;

	protected _panel: TPanel;
	/** References the popover instance that the trigger is associated with. */
	get panel() { return this._panel; }
	set panel(p: TPanel) { this._panel = p; }

	protected _target: TTarget;
	/** References the popover target instance that the trigger is associated with. */
	get target() { return this._target; }
	set target(t: TTarget) { this._target = t; }

	protected _triggerEvent: LuPopoverTriggerEvent = 'click';
	get triggerEvent() { return this._triggerEvent; }
	set triggerEvent(te: LuPopoverTriggerEvent) {
		this._triggerEvent = te;
		if (te === 'hover' || te === 'focus') {
			if (this._hoveredSubscription) {
				this._hoveredSubscription.unsubscribe();
			}
			this._hoveredSubscription = this._hovered$.pipe(
				debounce(h => h ? timer(this.enterDelay) : timer(this.leaveDelay))
			).subscribe(h => h ? this.openPopover() : this.closePopover());
		}
	}
	protected _enterDelay = 50;
	get enterDelay() { return this._enterDelay; }
	set enterDelay(d: number) { this._enterDelay = d; }
	protected _leaveDelay = 50;
	get leaveDelay() { return this._leaveDelay; }
	set leaveDelay(d: number) { this._leaveDelay = d; }

	protected _disabled = false;
	get disabled() { return this._disabled; }
	set disabled(d: boolean) { this._disabled = d; }

	protected _triggerId: string;
	protected _panelId: string;


	/** Event emitted when the associated popover is opened. */
	abstract onOpen: Observable<void>;
	/** Event emitted when the associated popover is closed. */
	abstract onClose: Observable<void>;

	protected abstract _emitOpen(): void;
	protected abstract _emitClose(): void;

	constructor(
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
	) {
		this._triggerId = `popoverTrigger_${generateId()}`;
		this._panelId = `popoverPanel_${generateId()}`;
	}

	onClick() {
		if (this.triggerEvent === 'click') {
			this.togglePopover();
		}
	}

	onMouseEnter() {
		if (this.triggerEvent === 'hover' || this.triggerEvent === 'focus') {
			this._hovered$.next(true);
		}
	}

	onMouseLeave() {
		if (this.triggerEvent === 'hover' || this.triggerEvent === 'focus') {
			this._hovered$.next(false);
		}
	}
	onFocus() {
		if (this.triggerEvent === 'hover' || this.triggerEvent === 'focus') {
			this.openPopover();
		}
	}
	onBlur() {
		if (this.triggerEvent === 'hover' || this.triggerEvent === 'focus') {
			this.closePopover();
		}
	}

	/** Toggles the popover between the open and closed states. */
	togglePopover(): void {
		return this._popoverOpen ? this.closePopover() : this.openPopover();
	}

	/** Opens the popover. */
	openPopover(): void {
		if (!this._popoverOpen && !this._disabled) {
			this._createOverlay();
			this._overlayRef.attach(this._portal);

			/** Only subscribe to backdrop if trigger event is click */
			if (this.triggerEvent === 'click') {
				this._subscribeToBackdrop();
			}

			/** Only subscribe to mouse enter/leave of the panel if trigger = hover */

			this._initPopover();
			this._emitOpen();
		}
	}

	/** Closes the popover. */
	closePopover(): void {
		if (this._overlayRef && this._overlayRef.hasAttached()) {
			this._overlayRef.detach();

			/** unsubscribe to backdrop click if it was defined */
			if (!!this._backdropSubscription) {
				// if (this.popover.triggerEvent === 'click') {
				this._backdropSubscription.unsubscribe();
			}

			this._resetPopover();
			this._emitClose();
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
		const position = this.target.position;
		return (
			position === 'below' || position === 'above'
		);
	}

	/**
	 * This method ensures that the popover
	 */
	protected _subscribeToPanelEvents(): void {
		if (this._overlayRef) {
			this._panelEventsSubscriptions = new Subscription();
			if (this.triggerEvent === 'hover' || this.triggerEvent === 'focus') {

				this._panelEventsSubscriptions.add(
					this.panel.hovered
					.subscribe((hovered) => {
						this._hovered$.next(hovered);
					}),
				);
			}
			this._panelEventsSubscriptions.add(
				this.panel.close
				.subscribe(() => {
					this.closePopover();
				}),
			);
			this._panelEventsSubscriptions.add(
				this.panel.open
				.subscribe(() => {
					this.openPopover();
				}),
			);
		}
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
					this.closePopover();
				});
		}
	}

	/**
	 * This method sets the popover state to open and focuses the first item if
	 * the popover was opened via the keyboard.
	 */
	protected _initPopover(): void {
		this._setIsPopoverOpen(true);
		this.panel.panelId = this._panelId;
		this.panel.triggerId = this._triggerId;
		this.panel.keydownEvents$ = this._overlayRef.keydownEvents();
		this._subscribeToPanelEvents();
	}

	/**
	 * This method resets the popover when it's closed, most importantly restoring
	 * focus to the popover trigger if the popover was opened via the keyboard.
	 */
	protected _resetPopover(): void {
		this._setIsPopoverOpen(false);

		// Focus only needs to be reset to the host element if the popover was opened
		// by the keyboard and manually shifted to the first popover item.
		if (!this._openedByMouse && this.triggerEvent === 'click') {
			this.focus();
		}
		this._openedByMouse = false;
	}

	/** set state rather than toggle to support triggers sharing a popover */
	protected _setIsPopoverOpen(isOpen: boolean): void {
		this._popoverOpen = isOpen;
		// tell the panel it's opening/closing
		isOpen ? this.panel.onOpen() : this.panel.onClose();
	}

	/**
	 *  This method checks that a valid instance of MdPopover has been passed into
	 *  mdPopoverTriggerFor. If not, an exception is thrown.
	 */
	protected _checkPanel() {
		if (!this.panel) {
			throwLuPopoverMissingPanelError();
		}
	}
	protected _checkTarget() {
		if (!this.target) {
			throwLuPopoverMissingTargetError();
		}
	}

	/**
	 *  This method creates the overlay from the provided popover's template and saves its
	 *  OverlayRef so that it can be attached to the DOM when openPopover is called.
	 */
	protected _createOverlay(): OverlayRef {
		if (!this._overlayRef) {
			this._portal = new TemplatePortal(
				this.panel.templateRef,
				this._viewContainerRef,
			);
			const config = this._getOverlayConfig();
			this._subscribeToPositions(
				config.positionStrategy as FlexibleConnectedPositionStrategy,
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
		overlayState.positionStrategy = this._getPosition();
		/** Display overlay backdrop if trigger event is click */
		if (this.triggerEvent === 'click') {
			overlayState.hasBackdrop = true;
			overlayState.backdropClass = 'cdk-overlay-transparent-backdrop';
		}

		overlayState.direction = this.dir;
		const scrollStrategy = this.panel.scrollStrategy;
		switch (scrollStrategy) {
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
	protected _subscribeToPositions(position: FlexibleConnectedPositionStrategy): void {
		this._positionSubscription = position.positionChanges.pipe(
			map(c => c.connectionPair),
			distinctUntilChanged(),
		)
		.subscribe(connectionPair => {
			this.panel.setPositionClasses(connectionPair.overlayX, connectionPair.overlayY);
		});
	}

	/**
	 * This method builds the position strategy for the overlay, so the popover is properly connected
	 * to the trigger.
	 * @returns FlexibleConnectedPositionStrategy
	 */
	protected _getPosition(): FlexibleConnectedPositionStrategy {
		/**
		 * For overriding position element, when LuPopoverTargetAt has a valid element reference.
		 * Useful for sticking popover to parent element and offsetting arrow to trigger element.
		 * If undefined defaults to the trigger element reference.
		 */
		const element = this.target.elementRef;
		// if (typeof this.targetElement !== 'undefined' && this.popover) {
		// 	this.popover.containerPositioning = true;
		// 	element = this.targetElement._elementRef;
		// }

		const connectionPosition: OriginConnectionPosition = {
			originX: 'start',
			originY: 'top',
		};

		// Position
		const position = this.target.position;
		const overlap = this.target.overlap;
		if (position === 'above') {
			connectionPosition.originY = overlap ? 'bottom' : 'top';
		} else if (position === 'below') {
			connectionPosition.originY = overlap ? 'top' : 'bottom';
		} else if (position === 'before') {
			connectionPosition.originX = overlap ? 'end' : 'start';
		} else if (position === 'after') {
			connectionPosition.originX = overlap ? 'start' : 'end';
		}

		// Alignment
		const alignment = this.target.alignment;
		if (this.isVerticallyPositionned) {
			if (alignment === 'left') {
				connectionPosition.originX = 'start';
			} else if (alignment === 'right') {
				connectionPosition.originX = 'end';
			} else {
				connectionPosition.originX = 'center';
			}
		} else {
			if (alignment === 'top') {
				connectionPosition.originY = 'top';
			} else if (alignment === 'bottom') {
				connectionPosition.originY = 'bottom';
			} else {
				connectionPosition.originY = 'center';
			}
		}

		const overlayPosition: OverlayConnectionPosition = {
			overlayX: 'start',
			overlayY: 'top',
		};

		if (overlap) {
			overlayPosition.overlayX = connectionPosition.originX;
			overlayPosition.overlayY = connectionPosition.originY;
		} else if (this.isVerticallyPositionned) {
			overlayPosition.overlayX = connectionPosition.originX;
			overlayPosition.overlayY =
				position === 'above' ? 'bottom' : 'top';
		} else {
			overlayPosition.overlayX =
				position === 'before' ? 'end' : 'start';
			overlayPosition.overlayY = connectionPosition.originY;
		}

		return this._overlay
			.position()
			.flexibleConnectedTo(element)
			.withPositions([
				{
					originX: connectionPosition.originX,
					originY: connectionPosition.originY,
					overlayX: overlayPosition.overlayX,
					overlayY: overlayPosition.overlayY
				},
				{
					originX: connectionPosition.originX,
					originY: this._invertVerticalPos(connectionPosition.originY),
					overlayX: overlayPosition.overlayX,
					overlayY: this._invertVerticalPos(overlayPosition.overlayY),
				},
				{
					originX: this._invertHorizontalPos(connectionPosition.originX),
					originY: connectionPosition.originY,
					overlayX: this._invertHorizontalPos(overlayPosition.overlayX),
					overlayY: overlayPosition.overlayY,
				},
				{
					originX: this._invertHorizontalPos(connectionPosition.originX),
					originY: this._invertVerticalPos(connectionPosition.originY),
					overlayX: this._invertHorizontalPos(overlayPosition.overlayX),
					overlayY: this._invertVerticalPos(overlayPosition.overlayY),
				},
			])
			.withDefaultOffsetX(this.target.offsetX)
			.withDefaultOffsetY(this.target.offsetY);
	}

	protected _invertVerticalPos(y: VerticalConnectionPos) {
		if (y === 'top') {
			y = 'bottom';
		} else if (y === 'bottom') {
			y = 'top';
		}
		return y;
	}

	protected _invertHorizontalPos(x: HorizontalConnectionPos) {
		if (x === 'end') {
			x = 'start';
		} else if (x === 'start') {
			x = 'end';
		}

		return x;
	}

	protected _cleanUpSubscriptions(): void {
		if (this._backdropSubscription) {
			this._backdropSubscription.unsubscribe();
		}
		if (this._positionSubscription) {
			this._positionSubscription.unsubscribe();
		}
		if (this._hoveredSubscription) {
			this._hoveredSubscription.unsubscribe();
		}
		if (this._panelEventsSubscriptions) {
			this._panelEventsSubscriptions.unsubscribe();
		}
	}
}
