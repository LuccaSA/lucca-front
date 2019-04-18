import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
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
	close: Observable<void>;
	open: Observable<void>;
	hovered: Observable<boolean>;
	// popoverPanelStyles: any;
	// overlayPaneClass: string | string[];
	keydownEvents$: Observable<KeyboardEvent>;

	setPositionClasses: (pos: LuPopoverPosition, al: LuPopoverAlignment) => void;

	_emitCloseEvent(): void;
	_emitOpenEvent(): void;
	onOpen(): void;
	onClose(): void;

	// containerPositioning: boolean; // idont inow what it is
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
	protected _isOpen: boolean;
	get isOpen() { return this._isOpen; }


	protected _closeOnClick = false;
	get closeOnClick() { return this._closeOnClick; }
	set closeOnClick(coc: boolean) { this._closeOnClick = coc; }

	protected _focusTrapEnabled = false;
	get focusTrapEnabled() { return this._focusTrapEnabled; }
	set focusTrapEnabled(fte: boolean) { this._focusTrapEnabled = fte; }

	protected _scrollStrategy: LuPopoverScrollStrategy = 'reposition';
	get scrollStrategy() { return this._scrollStrategy; }
	set scrollStrategy(ss: LuPopoverScrollStrategy) { this._scrollStrategy = ss; }

	protected _closeDisabled = false;
	get closeDisabled() { return this._closeDisabled; }
	set closeDisabled(cd: boolean) { this._closeDisabled = cd; }

	protected _templateRef: TemplateRef<any>;
	get templateRef() { return this._templateRef; }
	set templateRef(tr: TemplateRef<any>) { this._templateRef = tr; }

	protected _positionClasses: any = {};
	protected _panelClasses: any = {};
	get panelClasses() { return { ...this._panelClasses, ...this._positionClasses }; }
	set panelClasses(cl) {
		this._panelClasses = { ...cl };
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

	protected _keydownEventsSub;
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

		this._positionClasses['lu-popover-before'] = posX === 'before';
		this._positionClasses['lu-popover-after'] = posX === 'after';
		this._positionClasses['lu-popover-above'] = posY === 'above';
		this._positionClasses['lu-popover-below'] = posY === 'below';
	}

	onClick() {
		if (this.closeOnClick) {
			this.onClose();
		}
	}

	onOpen() {
		this._isOpen = true;
		this._emitOpenEvent();
	}
	onClose() {
		this._isOpen = false;
		this._emitCloseEvent();
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
				this.onClose();
				return;
		}
	}
}
