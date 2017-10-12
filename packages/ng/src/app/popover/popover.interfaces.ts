import { ElementRef, EventEmitter, TemplateRef } from '@angular/core';
import { LuPopoverPositionX, LuPopoverPositionY, LuPopoverTriggerEvent } from './popover.types';

export interface LuPopoverPanel {
	positionX: LuPopoverPositionX;
	positionY: LuPopoverPositionY;
	containerPositioning: boolean;
	overlapTrigger: boolean;
	triggerEvent: LuPopoverTriggerEvent;
	enterDelay: number;
	leaveDelay: number;
	targetOffsetX: number;
	targetOffsetY: number;
	arrowOffsetX: number;
	arrowWidth: number;
	arrowColor: string;
	closeOnClick: boolean;
	closeDisabled: boolean;
	setCurrentStyles: () => void;
	templateRef: TemplateRef<any>;
	close: EventEmitter<void>;
	setPositionClasses: (x: LuPopoverPositionX, y: LuPopoverPositionY) => void;
	_emitCloseEvent: () => void;
}

export interface LuPopoverConfig {
	positionX: LuPopoverPositionX;
	positionY: LuPopoverPositionY;
	overlapTrigger: boolean;
	triggerEvent: LuPopoverTriggerEvent;
	triggerDelay: number;
	targetOffsetX: number;
	targetOffsetY: number;
	arrowOffsetX: number;
	arrowWidth: number;
	arrowColor: string;
	closeOnClick: boolean;
}

export interface LuTarget {
	_elementRef: ElementRef;
}
