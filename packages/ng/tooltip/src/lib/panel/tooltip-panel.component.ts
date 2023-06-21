import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Output, TemplateRef, ViewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ALuPopoverPanel, ILuPopoverPanel } from '@lucca-front/ng/popover';
import { luTransformTooltip } from '../animation/index';

@Component({
	selector: 'lu-tooltip-panel',
	templateUrl: './tooltip-panel.component.html',
	styleUrls: ['./tooltip-panel.component.scss'],
	animations: [luTransformTooltip],
	standalone: true,
	imports: [CommonModule, OverlayModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuTooltipPanelComponent extends ALuPopoverPanel implements ILuPopoverPanel {
	@HostBinding('@transformTooltip') animationState = 'enter';

	private _content: string | SafeHtml;
	get content() {
		return this._content;
	}
	set content(c) {
		this._content = c;
		this._changeDetectorRef.markForCheck();
	}

	private _contentAsHtml: boolean;
	get contentAsHtml() {
		return this._contentAsHtml;
	}
	set contentAsHtml(c) {
		this._contentAsHtml = c;
		this._changeDetectorRef.markForCheck();
	}

	//FIXME output event
	// eslint-disable-next-line @angular-eslint/no-output-native
	@Output() override close = new EventEmitter<void>();
	// eslint-disable-next-line @angular-eslint/no-output-native
	@Output() override open = new EventEmitter<void>();
	@Output() override hovered = new EventEmitter<boolean>();
	@ViewChild(TemplateRef, { static: true })
	set vcTemplateRef(tr: TemplateRef<HTMLDivElement>) {
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
