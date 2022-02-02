import {
	Component,
	EventEmitter,
	Output,
	HostBinding,
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	ViewChild,
	TemplateRef,
} from '@angular/core';
import { ALuPopoverPanel, ILuPopoverPanel } from '@lucca-front/ng/popover';
import { luTransformTooltip } from '../animation/index';

@Component({
	selector: 'lu-tooltip-panel',
	templateUrl: './tooltip-panel.component.html',
	styleUrls: ['./tooltip-panel.component.scss'],
	animations: [luTransformTooltip],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuTooltipPanelComponent
	extends ALuPopoverPanel
	implements ILuPopoverPanel
{
	@HostBinding('@transformTooltip') animationState = 'enter';

	private _content;
	get content() {
		return this._content;
	}
	set content(c) {
		this._content = c;
		this._changeDetectorRef.markForCheck();
	}

	@Output() override close = new EventEmitter<void>();
	@Output() override open = new EventEmitter<void>();
	@Output() override hovered = new EventEmitter<boolean>();
	@ViewChild(TemplateRef, { static: true })
	set vcTemplateRef(tr: TemplateRef<any>) {
		this.templateRef = tr;
	}
	constructor(private _changeDetectorRef: ChangeDetectorRef) {
		super();
		this.scrollStrategy = 'close';
	}

	_emitCloseEvent(): void {
		this.close.emit();
	}

	_emitOpenEvent(): void {
		this.open.emit();
	}
	_emitHoveredEvent(hovered: boolean): void {
		this.hovered.emit(hovered);
	}
}
