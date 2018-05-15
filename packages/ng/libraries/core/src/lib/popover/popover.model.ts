import { ElementRef, EventEmitter, TemplateRef } from '@angular/core';

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
	templateRef: TemplateRef<any>;
	close: EventEmitter<void>;
	setPositionClasses: (pos: LuPopoverPosition, al: LuPopoverAlignment) => void;
	setPositionClassesChanges: (
		posX: LuPopoverPosition,
		posY: LuPopoverPosition,
	) => void;
	_emitCloseEvent: () => void;
}

export interface ILuPopoverTarget {
	_elementRef: ElementRef;
}
