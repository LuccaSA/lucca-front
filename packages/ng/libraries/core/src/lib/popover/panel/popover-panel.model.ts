import { TemplateRef, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import {
	throwLuPopoverInvalidPosition,
	throwLuPopoverInvalidAlignement,
} from '../popover.errors';
import { ESCAPE } from '@angular/cdk/keycodes';

export type LuPopoverPosition = 'above' | 'below' | 'before' | 'after';
export type LuPopoverAlignment = 'top' | 'bottom' | 'left' | 'right';
export type LuPopoverScrollStrategy = 'reposition' | 'block' | 'close';

export type LuPopoverTriggerEvent = 'click' | 'hover' | 'none' | 'focus';

export interface ILuPopoverPanel {
	position: LuPopoverPosition;
	alignment: LuPopoverAlignment;
	scrollStrategy: LuPopoverScrollStrategy;
	containerPositioning: boolean;
	overlapTrigger: boolean;
	triggerEvent: LuPopoverTriggerEvent;
	enterDelay: number;
	leaveDelay: number;
	targetOffsetX: number;
	targetOffsetY: number;
	closeOnClick: boolean;
	closeDisabled: boolean;
	templateRef?: TemplateRef<any>;
	close: Observable<void>;
	open: Observable<void>;
	popoverPanelStyles: any;
	setPositionClasses: (pos: LuPopoverPosition, al: LuPopoverAlignment) => void;
	setPositionClassesChanges: (
		posX: LuPopoverPosition,
		posY: LuPopoverPosition,
	) => void;
	_emitCloseEvent(): void;
	_emitOpenEvent(): void;
	onOpen(): void;
	onClose(): void;

	keydownEvents$: Observable<KeyboardEvent>;
}
/**
 * abstract class for basic implementation of a popover panel
 * it is highly recommended to use this template
 * <ng-template>
	<div class="lu-popover-panel" role="dialog" [class.lu-popover-overlap]="overlapTrigger" [ngClass]="_classList" [ngStyle]="popoverPanelStyles"
	 (keydown)="_handleKeydown($event)" (click)="onClick()" (mouseover)="onMouseOver()" (mouseleave)="onMouseLeave()" (mousedown)="onMouseDown($event)"
	 [@transformPopover]="'enter'">
		<div class="lu-popover-content" [ngStyle]="popoverContentStyles" cdkTrapFocus="focusTrapEnabled">
			### PUT HERE THE CONTENT OF THE POPOVER ###
		</div>
	</div>
</ng-template>
 */
export abstract class ALuPopoverPanel implements ILuPopoverPanel {
	protected _position: LuPopoverPosition = 'below';
	get position(): LuPopoverPosition { return this._position; }
	set position(position: LuPopoverPosition) {
		if (
			position !== 'above' &&
			position !== 'below' &&
			position !== 'after' &&
			position !== 'before'
		) {
			throwLuPopoverInvalidPosition();
		}
		this._position = position;
		this.setPositionClasses(this._position, this._alignment);
	}

	protected _alignment: LuPopoverAlignment = 'left';
	get alignment(): LuPopoverAlignment { return this._alignment; }
	set alignment(alignment: LuPopoverAlignment) {
		if (
			alignment !== 'top' &&
			alignment !== 'bottom' &&
			alignment !== 'right' &&
			alignment !== 'left'
		) {
			throwLuPopoverInvalidAlignement();
		}
		this._alignment = alignment;
		this.setPositionClasses(this._position, this._alignment);
	}

	protected _triggerEvent: LuPopoverTriggerEvent = 'hover';
	get triggerEvent() { return this._triggerEvent; }
	set triggerEvent(te: LuPopoverTriggerEvent) { this._triggerEvent = te; }

	protected _enterDelay = 200;
	get enterDelay() { return this._enterDelay; }
	set enterDelay(ed: number) { this._enterDelay = ed; }

	protected _leaveDelay = 200;
	get leaveDelay() { return this._leaveDelay; }
	set leaveDelay(ld: number) { this._leaveDelay = ld; }

	protected _overlapTrigger = false;
	get overlapTrigger() { return this._overlapTrigger; }
	set overlapTrigger(ot: boolean) { this._overlapTrigger = ot; }

	protected _targetOffsetX = 0;
	get targetOffsetX() { return this._targetOffsetX; }
	set targetOffsetX(tox: number) { this._targetOffsetX = tox; }

	protected _targetOffsetY = 0;
	get targetOffsetY() { return this._targetOffsetY; }
	set targetOffsetY(toy: number) { this._targetOffsetY = toy; }

	protected _closeOnClick = false;
	get closeOnClick() { return this._closeOnClick; }
	set closeOnClick(coc: boolean) { this._closeOnClick = coc; }

	protected _focusTrapEnabled = false;
	get focusTrapEnabled() { return this._focusTrapEnabled; }
	set focusTrapEnabled(fte: boolean) { this._focusTrapEnabled = fte; }

	protected _scrollStrategy: LuPopoverScrollStrategy = 'reposition';
	get scrollStrategy() { return this._scrollStrategy; }
	set scrollStrategy(ss: LuPopoverScrollStrategy) { this._scrollStrategy = ss; }

	protected _containerPositioning = false;
	get containerPositioning() { return this._containerPositioning; }
	set containerPositioning(cp: boolean) { this._containerPositioning = cp; }

	protected _closeDisabled = false;
	get closeDisabled() { return this._closeDisabled; }
	set closeDisabled(cd: boolean) { this._closeDisabled = cd; }

	protected _templateRef: TemplateRef<any>;
	get templateRef() { return this._templateRef; }
	set templateRef(tr: TemplateRef<any>) { this._templateRef = tr; }

	protected _classList: any = {};
	get classList() { return this._classList; }
	set classList(cl) {
		this._classList = cl;
		this.setPositionClasses(this.position, this.alignment);
	}

	/** Config object to be passed into the popover's panel ngStyle */
	protected _popoverPanelStyles: any = {};
	public get popoverPanelStyles() { return this._popoverPanelStyles; }
	public set popoverPanelStyles(pps) { this._popoverPanelStyles = pps; }

	/** Config object to be passed into the popover's content ngStyle */
	protected _popoverContentStyles: any = {};
	public get popoverContentStyles() { return this._popoverContentStyles; }
	public set popoverContentStyles(pcs) { this._popoverContentStyles = pcs; }

	protected _keydownEventsSub;
	set keydownEvents$(evt$: Observable<KeyboardEvent>) {
		if (!this._keydownEventsSub) {
			this._keydownEventsSub = evt$.subscribe(e => this._handleKeydown(e));
		}
	}

	close: Observable<void>;
	open: Observable<void>;
	abstract _emitCloseEvent(): void;
	abstract _emitOpenEvent(): void;

	constructor() {
		this.setPositionClasses(this.position, this.alignment);
	}
	setPositionClasses(pos: LuPopoverPosition, al: LuPopoverAlignment): void {
		let posX: LuPopoverPosition;
		let posY: LuPopoverPosition;

		if (pos === 'above' || pos === 'below') {
			posY = pos;
			posX = al === 'left' ? 'after' : 'before';
		} else {
			posX = pos;
			posY = al === 'top' ? 'below' : 'after';
		}

		this.setPositionClassesChanges(posX, posY);
	}

	setPositionClassesChanges(
		posX: LuPopoverPosition,
		posY: LuPopoverPosition,
	): void {
		this._classList['lu-popover-before'] = posX === 'before';
		this._classList['lu-popover-after'] = posX === 'after';
		this._classList['lu-popover-above'] = posY === 'above';
		this._classList['lu-popover-below'] = posY === 'below';
	}
	onClick() {
		if (this.closeOnClick) {
			this.onClose();
		}
	}

	onOpen() {
		this._emitOpenEvent();
	}
	onClose() {
		this._emitCloseEvent();
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
			this.onClose();
		}
	}
	/** does nothing but must be overridable */
	onMouseDown($event) {}

	_handleKeydown(event: KeyboardEvent) {
		switch (event.keyCode) {
			case ESCAPE:
				this.onClose();
				return;
		}
	}
}
