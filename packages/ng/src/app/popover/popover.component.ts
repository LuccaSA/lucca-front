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
	HostBinding,
} from '@angular/core';

import { ESCAPE } from '@angular/cdk/keycodes';

import { throwLuPopoverInvalidPosition, throwLuPopoverInvalidAlignement } from './popover.errors';
import { IPopoverPanel, PopoverAlignment, PopoverPosition, PopoverTriggerEvent } from './popover.model';
import { transformPopover } from './popover.animations';

import { AnimationEvent } from '@angular/animations';

// import { standardPopoverTemplate } from './popover.template';

@Component({
	selector: 'lu-popover',
	templateUrl: './popover.component.html',
	styleUrls: ['./popover.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	animations: [transformPopover],
	exportAs: 'LuPopover'
})
export class LuPopoverComponent implements IPopoverPanel, OnDestroy {
	// @HostBinding() private role = 'dialog';

	/** Settings for popover, view setters and getters for more detail */
	private _position: PopoverPosition = 'below';
	private _alignment: PopoverAlignment = 'left';
	private _triggerEvent: PopoverTriggerEvent = 'hover';
	private _enterDelay: number = 200;
	private _leaveDelay: number = 200;
	private _overlapTrigger: boolean = false;
	private _targetOffsetX: number = 0;
	private _targetOffsetY: number = 0;
	private _closeOnClick: boolean = false;
	private _focusTrapEnabled: boolean = false;

	/** Config object to be passed into the popover's ngClass */
	private _classList: any = {};

	public containerPositioning: boolean = false;

	/** Closing disabled on popover */
	public closeDisabled: boolean = false;

	/** Config object to be passed into the popover's panel ngStyle */
	public popoverPanelStyles: {};

	/** Config object to be passed into the popover's content ngStyle */
	public popoverContentStyles: {};

	/** Emits the current animation state whenever it changes. */
	_onAnimationStateChange = new EventEmitter<AnimationEvent>();

	protected _template: TemplateRef<any>;
	/** Template to Use for the popover */
	@Input()
	get template(): TemplateRef<any> { return this._template; }
	set template(value: TemplateRef<any>) { this._template = value; }
	/** Position of the popover around the trigger */
	@Input('position')
	get position() { return this._position; }
	set position(value: PopoverPosition) {
		if (value !== 'above' && value !== 'below' && value !== 'after' && value !== 'before') {
			throwLuPopoverInvalidPosition();
		}
		this._position = value;
		this.setPositionClasses(this.position, this.alignment);
	}

	/** Alignment of the popover regarding the trigger */
	@Input('alignment')
	get alignment() { return this._alignment; }
	set alignment(value: PopoverAlignment) {
		if (value !== 'top' && value !== 'bottom' && value !== 'right' && value !== 'left') {
			throwLuPopoverInvalidAlignement();
		}
		this._alignment = value;
		this.setPositionClasses(this.position, this.alignment);
	}

	/** Popover trigger event */
	@Input('trigger-on')
	get triggerEvent(): PopoverTriggerEvent { return this._triggerEvent; }
	set triggerEvent(v: PopoverTriggerEvent) { this._triggerEvent = v; }

	/** Popover enter delay */
	@Input('enter-delay')
	get enterDelay(): number { return this._enterDelay; }
	set enterDelay(v: number) { this._enterDelay = v; }

	/** Popover leave delay */
	@Input('leave-delay')
	get leaveDelay(): number { return this._leaveDelay; }
	set leaveDelay(v: number) { this._leaveDelay = v; }

	/** Popover overlap trigger */
	@Input('overlap-trigger')
	get overlapTrigger(): boolean { return this._overlapTrigger; }
	set overlapTrigger(v: boolean) { this._overlapTrigger = v; }

	/** Popover target offset x */
	@Input('offset-x')
	get targetOffsetX(): number { return this._targetOffsetX; }
	set targetOffsetX(v: number) { this._targetOffsetX = v; }

	/** Popover target offset y */
	@Input('offset-y')
	get targetOffsetY(): number { return this._targetOffsetY; }
	set targetOffsetY(v: number) { this._targetOffsetY = v; }

	/**
	 * Popover container close on click
	 * default: false
	 */
	@Input('close-on-click')
	get closeOnClick(): boolean { return this._closeOnClick; }
	set closeOnClick(v: boolean) { this._closeOnClick = v; }

	/**
	 * Popover focus trap using cdkTrapFocus
	 * default: false
	 */
	@Input('focus-trap-enabled')
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
			this.setPositionClasses(this.position, this.alignment);
		}
	}

	/** Event emitted when the popover is closed. */
	@Output() close = new EventEmitter<void>();

	@ViewChild(TemplateRef) templateRef: TemplateRef<any>;

	constructor(protected _elementRef: ElementRef) {
		this.setPositionClasses(this.position, this.alignment);
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
	/** does nothing but must be overridable */
	onMouseDown($event) {	}

	/**
	 * It's necessary to set position-based classes to ensure the popover panel animation
	 * folds out from the correct direction.
	 */
	setPositionClasses(pos: PopoverPosition, al: PopoverAlignment): void {
		let posX: PopoverPosition;
		let posY: PopoverPosition;

		if (pos === 'above' || pos === 'below') {
			posY = pos;
			posX = al === 'left' ? 'after' : 'before';
		} else {
			posX = pos;
			posY = al === 'top' ? 'below' : 'after';
		}

		this.setPositionClassesChanges(posX, posY);
	}

	setPositionClassesChanges(posX: PopoverPosition, posY: PopoverPosition): void {
		this._classList['lu-popover-before'] = posX === 'before';
		this._classList['lu-popover-after'] = posX === 'after';
		this._classList['lu-popover-above'] = posY === 'above';
		this._classList['lu-popover-below'] = posY === 'below';
	}
}
