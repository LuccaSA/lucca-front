import { Component, OnInit, EventEmitter, Output, Input, HostBinding, ChangeDetectorRef } from '@angular/core';
import { ALuPopoverPanel, ILuPopoverPanel, luTransformPopover } from '../../popover/index';

@Component({
	selector: 'lu-tooltip-panel',
	templateUrl: './tooltip-panel.component.html',
	styleUrls: ['./tooltip-panel.component.scss'],
	animations: [luTransformPopover],
})
export class LuTooltipPanelComponent extends ALuPopoverPanel implements ILuPopoverPanel {

	@HostBinding('@transformPopover') animationState = 'enter';
	@HostBinding('class') get classes() {
		if (this.panelClasses['lu-popover-above']) {
			return 'lu-tooltip-above';
		}
		if (this.panelClasses['lu-popover-below']) {
			return 'lu-tooltip-below';
		}
		if (this.panelClasses['lu-popover-before']) {
			return 'lu-tooltip-before';
		}
		if (this.panelClasses['lu-popover-after']) {
			return 'lu-tooltip-after';
		}
		return '';
	}

	@Input() content;

	@Output() close = new EventEmitter<void>();
	@Output() open = new EventEmitter<void>();

	constructor(private _changeDetectorRef: ChangeDetectorRef) {
		super();
	}

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
