import { TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ESCAPE } from '@angular/cdk/keycodes';
import { LuPopoverPosition, LuPopoverAlignment } from '../target/index';

export type LuPopoverScrollStrategy = 'reposition' | 'block' | 'close';

export interface ILuPopoverPanel {
	// position: LuPopoverPosition;
	// alignment: LuPopoverAlignment;
	/** how the panel will handle scroll events on the body, allowed values: reposition, block, close */
	// overlapTrigger: boolean;
	// triggerEvent: LuPopoverTriggerEvent;
	// enterDelay: number;
	// leaveDelay: number;
	// targetOffsetX: number;
	// targetOffsetY: number;
	scrollStrategy: LuPopoverScrollStrategy;
	closeOnClick: boolean;
	closeDisabled: boolean;
	templateRef?: TemplateRef<any>;

	/** will emit when the panel wants to close */
	close: Observable<void>;
	/** will emit when the panel wants to open */
	open: Observable<void>;
	/** will emit when the panel is hovered */
	hovered: Observable<boolean>;

	/** classes to apply to the panel, uses ' ' for separating values */
	panelClasses: string;
	/** class to apply to the panel content, uses ' ' for separating values */
	contentClasses: string;

	keydownEvents$: Observable<KeyboardEvent>;

	setPositionClasses: (pos: LuPopoverPosition, al: LuPopoverAlignment) => void;

	/** method called by the trigger when it opens the popover */
	onOpen(): void;
	/** method called by the trigger when it closes the popover */
	onClose(): void;

	// containerPositioning: boolean; // idont inow what it is
}
/**
 * abstract class for basic implementation of a popover panel
 */
export abstract class ALuPopoverPanel implements ILuPopoverPanel {
	protected _isOpen: boolean;
	get isOpen() { return this._isOpen; }


	protected _closeOnClick = false;
	get closeOnClick() { return this._closeOnClick; }
	set closeOnClick(coc: boolean) { this._closeOnClick = coc; }

	protected _trapFocus = false;
	get trapFocus() { return this._trapFocus; }
	set trapFocus(tf: boolean) { this._trapFocus = tf; }

	protected _scrollStrategy: LuPopoverScrollStrategy = 'reposition';
	get scrollStrategy() { return this._scrollStrategy; }
	set scrollStrategy(ss: LuPopoverScrollStrategy) { this._scrollStrategy = ss; }

	protected _closeDisabled = false;
	get closeDisabled() { return this._closeDisabled; }
	set closeDisabled(cd: boolean) { this._closeDisabled = cd; }

	protected _templateRef: TemplateRef<any>;
	get templateRef() { return this._templateRef; }
	set templateRef(tr: TemplateRef<any>) { this._templateRef = tr; }

	protected _positionClassesMap: any = {};
	protected _panelClasses = '';
	get panelClasses() { return this._panelClasses; }
	set panelClasses(cl: string) {
		this._panelClasses = cl;
	}
	get panelClassesMap() {
		const map = this._panelClasses
			.split(' ')
			.reduce((obj: any, className: string) => {
				obj[className] = true;
				return obj;
			}, {});
		// also add positiopn classes 
		return { ...map, ...this._positionClassesMap };
	}

	protected _contentClasses = '';
	get contentClasses() { return this._contentClasses; }
	set contentClasses(cl: string) {
		this._contentClasses = cl;
	}
	get contentClassesMap() {
		return this._contentClasses
			.split(' ')
			.reduce((obj: any, className: string) => {
				obj[className] = true;
				return obj;
			}, {});
	}
	// /** Config object to be passed into the popover's panel ngStyle */
	// protected _popoverPanelStyles: any = {};
	// public get popoverPanelStyles() { return this._popoverPanelStyles; }
	// public set popoverPanelStyles(pps) { this._popoverPanelStyles = pps; }

	/** Classes to be passed into the popover's overlay */
	protected _overlayPaneClass: string | string[];
	public get overlayPaneClass() { return this._overlayPaneClass; }
	public set overlayPaneClass(opc) { this._overlayPaneClass = opc; }

	// /** Config object to be passed into the popover's content ngStyle */
	// protected _popoverContentStyles: any = {};
	// public get popoverContentStyles() { return this._popoverContentStyles; }
	// public set popoverContentStyles(pcs) { this._popoverContentStyles = pcs; }

	protected _keydownEventsSub: Subscription;
	set keydownEvents$(evt$: Observable<KeyboardEvent>) {
		if (!this._keydownEventsSub) {
			this._keydownEventsSub = evt$.subscribe(e => this._handleKeydown(e));
		}
	}

	close: Observable<void>;
	open: Observable<void>;
	hovered: Observable<boolean>;
	abstract _emitCloseEvent(): void;
	abstract _emitOpenEvent(): void;
	abstract _emitHoveredEvent(hovered: boolean): void;

	constructor() {
		// this.setPositionClasses(this.position, this.alignment);
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

		this._positionClassesMap['lu-popover-before'] = posX === 'before';
		this._positionClassesMap['lu-popover-after'] = posX === 'after';
		this._positionClassesMap['lu-popover-above'] = posY === 'above';
		this._positionClassesMap['lu-popover-below'] = posY === 'below';
	}

	onClick() {
		if (this.closeOnClick) {
			this._emitCloseEvent();
		}
	}

	onOpen() {
		this._isOpen = true;
	}
	onClose() {
		this._isOpen = false;
	}
	/**
	 * TODO: Refactor when @angular/cdk includes feature I mentioned on github see link below.
	 * https://github.com/angular/material2/pull/5493#issuecomment-313085323
	 */
	/** Disables close of popover when leaving trigger element and mouse over the popover */
	onMouseOver() {
		this._emitHoveredEvent(true);
		// if (this.triggerEvent === 'hover') {
		// 	this.closeDisabled = true;
		// }
	}
	/** Enables close of popover when mouse leaving popover element */
	onMouseLeave() {
		this._emitHoveredEvent(false);
		// if (this.triggerEvent === 'hover') {
		// 	this.closeDisabled = false;
		// 	this.onClose();
		// }
	}
	/** does nothing but must be overridable */
	onMouseDown($event) {}

	_handleKeydown(event: KeyboardEvent) {
		switch (event.keyCode) {
			case ESCAPE:
				this._emitCloseEvent();
				return;
		}
	}
}
