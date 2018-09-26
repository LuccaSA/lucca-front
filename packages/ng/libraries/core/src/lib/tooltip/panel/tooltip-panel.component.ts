import { Component, OnInit, EventEmitter, Output, Input, HostBinding, ChangeDetectorRef } from '@angular/core';
import { ALuPopoverPanel, ILuPopoverPanel, luTransformPopover } from '../../popover';

@Component({
	selector: 'lu-tooltip-panel',
	templateUrl: './tooltip-panel.component.html',
	styleUrls: ['./tooltip-panel.component.scss'],
	animations: [luTransformPopover],
})
export class LuTooltipPanelComponent extends ALuPopoverPanel implements ILuPopoverPanel, OnInit {

	@HostBinding('@transformPopover') animationState = 'enter';

	@Input() content;

	@Output() close = new EventEmitter<void>();
	@Output() open = new EventEmitter<void>();

	constructor(private _changeDetectorRef: ChangeDetectorRef) {
		super();
	}

	ngOnInit(): void { }

	_emitCloseEvent(): void {
		this.close.emit();
	}

	_emitOpenEvent(): void {
		this.open.emit();
	}

	markForChange() {
		this._changeDetectorRef.markForCheck();
	}
}
