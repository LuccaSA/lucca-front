import { ElementRef, EventEmitter, TemplateRef } from '@angular/core';
import { LuPopoverAlignment, LuPopoverTriggerEvent, LuPopoverPosition } from './popover.types';

export interface LuPopoverPanel {
	position: LuPopoverPosition;
	alignment: LuPopoverAlignment;
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
	setPositionClasses: () => void;
	setPositionClassesChanges: (posX: LuPopoverPosition, posY: LuPopoverPosition) => void;
	_emitCloseEvent: () => void;
}

export interface LuTarget {
	_elementRef: ElementRef;
}
