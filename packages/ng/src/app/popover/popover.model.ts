import { ElementRef, EventEmitter, TemplateRef } from '@angular/core';

export type PopoverPosition = 'above' | 'below' | 'before' | 'after';
export type PopoverAlignment = 'top' | 'bottom' | 'left' | 'right';

export type PopoverTriggerEvent = 'click' | 'hover' | 'none';

export interface IPopoverPanel {
	position: PopoverPosition;
	alignment: PopoverAlignment;
	containerPositioning: boolean;
	overlapTrigger: boolean;
	triggerEvent: PopoverTriggerEvent;
	enterDelay: number;
	leaveDelay: number;
	targetOffsetX: number;
	targetOffsetY: number;
	closeOnClick: boolean;
	closeDisabled: boolean;
	templateRef: TemplateRef<any>;
	close: EventEmitter<void>;
	setPositionClasses: (pos: PopoverPosition, al: PopoverAlignment) => void;
	setPositionClassesChanges: (posX: PopoverPosition, posY: PopoverPosition) => void;
	_emitCloseEvent: () => void;
}

export interface IPopoverTarget {
	_elementRef: ElementRef;
}

