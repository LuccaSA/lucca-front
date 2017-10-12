import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
	TemplateRef,
	ViewChild,
	ViewEncapsulation,
	ElementRef,
	ChangeDetectionStrategy,
} from '@angular/core';

import { ESCAPE } from '@angular/cdk/keycodes';

import { LuPopoverPositionX, LuPopoverPositionY, LuPopoverTriggerEvent } from './popover.types';
import { throwLuPopoverInvalidPositionX, throwLuPopoverInvalidPositionY } from './popover.errors';
import { LuPopoverPanel } from './popover.interfaces';
import { transformPopover } from './popover.animations';

import { AnimationEvent } from '@angular/animations';



@Component({
	selector: 'lu-popover',
	templateUrl: './popover.component.html',
	styleUrls: ['./popover.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		'role': 'dialog'
	},
	animations: [
		transformPopover
	],
	exportAs: 'LuPopover'
})
export class LuPopoverComponent implements LuPopoverPanel, OnDestroy {

	/** Settings for popover, view setters and getters for more detail */
	private _positionX: LuPopoverPositionX = 'after';
	private _positionY: LuPopoverPositionY = 'below';
	private _triggerEvent: LuPopoverTriggerEvent = 'hover';
	private _enterDelay: number = 200;
	private _leaveDelay: number = 200;
	private _overlapTrigger: boolean = true;
	private _targetOffsetX: number = 0;
	private _targetOffsetY: number = 10;
	private _arrowOffsetX: number = 30;
	private _arrowWidth: number = 20;
	private _arrowColor: string = 'white';
	private _closeOnClick: boolean = true;
	private _focusTrapEnabled: boolean = true;

	/** Config object to be passed into the popover's ngClass */
	private _classList: any = {};

	public containerPositioning: boolean = false;

	/** Closing disabled on popover */
	public closeDisabled: boolean = false;

	/** Config object to be passed into the popover's panel ngStyle */
	public popoverPanelStyles: {};

	/** Config object to be passed into the popover's arrow ngStyle */
	public popoverArrowStyles: {};

	/** Config object to be passed into the popover's content ngStyle */
	public popoverContentStyles: {};

	/** Emits the current animation state whenever it changes. */
	_onAnimationStateChange = new EventEmitter<AnimationEvent>();


	/** Position of the popover in the X axis. */
	@Input('LuPopoverPositionX')
	get positionX() { return this._positionX; }
	set positionX(value: LuPopoverPositionX) {
		if (value !== 'before' && value !== 'after') {
			throwLuPopoverInvalidPositionX();
		}
		this._positionX = value;
		this.setPositionClasses();
	}

	/** Position of the popover in the Y axis. */
	@Input('LuPopoverPositionY')
	get positionY() { return this._positionY; }
	set positionY(value: LuPopoverPositionY) {
		if (value !== 'above' && value !== 'below') {
			throwLuPopoverInvalidPositionY();
		}
		this._positionY = value;
		this.setPositionClasses();
	}

	/** Popover trigger event */
	@Input('LuPopoverTriggerOn')
	get triggerEvent(): LuPopoverTriggerEvent { return this._triggerEvent; }
	set triggerEvent(v: LuPopoverTriggerEvent) { this._triggerEvent = v; }

	/** Popover enter delay */
	@Input('LuPopoverEnterDelay')
	get enterDelay(): number { return this._enterDelay; }
	set enterDelay(v: number) { this._enterDelay = v; }

	/** Popover leave delay */
	@Input('LuPopoverLeaveDelay')
	get leaveDelay(): number { return this._leaveDelay; }
	set leaveDelay(v: number) { this._leaveDelay = v; }

	/** Popover overlap trigger */
	@Input('LuPopoverOverlapTrigger')
	get overlapTrigger(): boolean { return this._overlapTrigger; }
	set overlapTrigger(v: boolean) { this._overlapTrigger = v; }

	/** Popover target offset x */
	@Input('LuPopoverOffsetX')
	get targetOffsetX(): number { return this._targetOffsetX; }
	set targetOffsetX(v: number) { this._targetOffsetX = v; }

	/** Popover target offset y */
	@Input('LuPopoverOffsetY')
	get targetOffsetY(): number { return this._targetOffsetY; }
	set targetOffsetY(v: number) { this._targetOffsetY = v; }

	/** Popover arrow offset x */
	@Input('LuPopoverArrowOffsetX')
	get arrowOffsetX(): number { return this._arrowOffsetX; }
	set arrowOffsetX(v: number) { this._arrowOffsetX = v; }

	/** Popover arrow width */
	@Input('LuPopoverArrowWidth')
	get arrowWidth(): number { return this._arrowWidth; }
	set arrowWidth(v: number) { this._arrowWidth = v; }

	/** Popover arrow color */
	@Input('LuPopoverArrowColor')
	get arrowColor(): string { return this._arrowColor; }
	set arrowColor(v: string) { this._arrowColor = v; }

	/**
	 * Popover container close on click
	 * default: true
	 */
	@Input('LuPopoverCloseOnClick')
	get closeOnClick(): boolean { return this._closeOnClick; }
	set closeOnClick(v: boolean) { this._closeOnClick = v; }


	/**
	 * Popover focus trap using cdkTrapFocus
	 * default: true
	 */
	@Input('LuFocusTrapEnabled')
	get focusTrapEnabled(): boolean { return this._focusTrapEnabled; }
	set focusTrapEnabled(v: boolean) { this._focusTrapEnabled = v; }


	/**
	 * This method takes classes set on the host lu-popover element and applies them on the
	 * popover template that displays in the overlay container.  Otherwise, it's difficult
	 * to style the containing popover from outside the component.
	 * @param classes list of class names
	 */
	@Input('class')
	get classList(): string { return this._classList; }
	set classList(classes: string) {
		if (classes && classes.length) {
			this._classList = classes.split(' ').reduce((obj: any, className: string) => {
				obj[className] = true;
				return obj;
			}, {});
			this._elementRef.nativeElement.className = '';
			this.setPositionClasses();
		}
	}

	/** Event emitted when the popover is closed. */
	@Output() close = new EventEmitter<void>();

	@ViewChild(TemplateRef) templateRef: TemplateRef<any>;

	constructor(private _elementRef: ElementRef) {
		this.setPositionClasses();
	}

	ngOnDestroy() {
		this._emitCloseEvent();
		this.close.complete();
	}


	/** Handle a keyboard event from the popover, delegating to the appropriate action. */
	_handleKeydown(event: KeyboardEvent) {
		switch (event.keyCode) {
			case ESCAPE:
				this._emitCloseEvent();
				return;
		}
	}

	/**
	 * This emits a close event to which the trigger is subscribed. When emitted, the
	 * trigger will close the popover.
	 */
	_emitCloseEvent(): void {
		this.close.emit();
	}

	/** Close popover on click if closeOnClick is true */
	onClick() {
		if (this.closeOnClick) {
			this._emitCloseEvent();
		}
	}

	/**
	 * TODO: Refactor when @angular/cdk includes feature I mentioned on github see link below.
	 * https://github.com/angular/material2/pull/5493#issuecomment-313085323
	 */
	/** Disables close of popover when leaving trigger element and mouse over the popover */
	onMouseOver() {
		if (this.triggerEvent === 'hover') {
			this.closeDisabled = true;
		}
	}
	/** Enables close of popover when mouse leaving popover element */
	onMouseLeave() {
		if (this.triggerEvent === 'hover') {
			this.closeDisabled = false;
			this._emitCloseEvent();
		}
	}

	// TODO: Refactor how styles are set and updated on the component, use best practices.
	// TODO: If arrow left and right positioning is requested, see if flex direction can be used to work with order.
	/** Sets the current styles for the popover to allow for dynamically changing settings */
	setCurrentStyles() {

		// TODO: See if arrow position can be calculated automatically and allow override.
		// TODO: See if flex order is a better alternative to position arrow top or bottom.
		this.popoverArrowStyles = {
			'right': this.positionX === 'before' ? (this.arrowOffsetX - this.arrowWidth) + 'px' : '',
			'left': this.positionX === 'after' ? (this.arrowOffsetX - this.arrowWidth) + 'px' : '',
			'width': this.arrowWidth + 'px',
			'height': this.arrowWidth + 'px',
			'background-color': this.arrowColor,
			// 'border-top': this.positionY === 'below' ?
			// 	this.arrowWidth + 'px solid ' + this.arrowColor : '0px solid transparent',
			// 'border-right': 'undefined' === undefined ?
			// 	this.arrowWidth + 'px solid ' + this.arrowColor :
			// 	this.arrowWidth + 'px solid transparent',
			// 'border-bottom': this.positionY === 'above' ?
			// 	this.arrowWidth + 'px solid ' + this.arrowColor :
			// 	this.arrowWidth + 'px solid transparent',
			// 'border-left': 'undefined' === undefined ?
			// 	this.arrowWidth + 'px solid ' + this.arrowColor :
			// 	this.arrowWidth + 'px solid transparent',
		};
	}

	/**
	 * It's necessary to set position-based classes to ensure the popover panel animation
	 * folds out from the correct direction.
	 */
	setPositionClasses(posX = this.positionX, posY = this.positionY): void {
		this._classList['lu-popover-before'] = posX === 'before';
		this._classList['lu-popover-after'] = posX === 'after';
		this._classList['lu-popover-above'] = posY === 'above';
		this._classList['lu-popover-below'] = posY === 'below';
	}
}
