import {
	AfterViewInit,
	Directive,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	Optional,
	Output,
	ViewContainerRef,
	HostListener,
} from '@angular/core';

import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import {
	ConnectedPositionStrategy,
	OriginConnectionPosition,
	Overlay,
	OverlayConnectionPosition,
	OverlayRef,
	OverlayConfig,
	HorizontalConnectionPos,
	VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { Subscription } from 'rxjs/Subscription';

import {
	ILuPopoverTrigger, ALuPopoverTrigger,
} from './popover-trigger.model';
import {
	ILuPopoverPanel,
	LuPopoverPosition,
} from '../panel/popover-panel.model';
import {
	ILuPopoverTarget,
} from '../target/popover-target.model';
import { throwLuPopoverMissingError } from '../popover.errors';

/**
* This directive is intended to be used in conjunction with an lu-popover tag.  It is
* responsible for toggling the display of the provided popover instance.
*/
@Directive({
	selector: '[luPopoverTriggerFor]',
	host: {
		'aria-haspopup': 'true',
		'(mousedown)': '_handleMousedown($event)',
	},
	exportAs: 'LuPopoverTrigger',
})
export class LuPopoverTriggerDirective<T extends ILuPopoverPanel = ILuPopoverPanel>
extends ALuPopoverTrigger<T>
implements ILuPopoverTrigger<T>, AfterViewInit, OnDestroy {

	/** References the popover instance that the trigger is associated with. */
	@Input('luPopoverTriggerFor') popover: ILuPopoverPanel;

	/** References the popover target instance that the trigger is associated with. */
	@Input('luPopoverTargetAt') targetElement: ILuPopoverTarget;

	/** Event emitted when the associated popover is opened. */
	@Output() onPopoverOpen = new EventEmitter<void>();

	/** Event emitted when the associated popover is closed. */
	@Output() onPopoverClose = new EventEmitter<void>();

	constructor(
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
	) {
		super(_overlay, _elementRef, _viewContainerRef);
	}

	@HostListener('click')
	onClick() {
		super.onClick();
	}

	@HostListener('mouseenter')
	onMouseEnter() {
		super.onMouseEnter();
	}

	@HostListener('mouseleave')
	onMouseLeave() {
		super.onMouseLeave();
	}
	@HostListener('focus')
	onFocus() {
		super.onFocus();
	}
	@HostListener('blur')
	onBlur() {
		super.onBlur();
	}
}
