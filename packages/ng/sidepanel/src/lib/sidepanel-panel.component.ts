import {
	Component,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Inject,
} from '@angular/core';
import { ILuSidepanelContent } from './sidepanel.model';
import { ALuSidepanelRef } from './sidepanel-ref.model';
import { LuSidepanelIntl } from './sidepanel.intl';
import { ILuSidepanelLabel } from './sidepanel.translate';
import { ALuModalPanelComponent } from '@lucca-front/ng/modal';

@Component({
	selector: 'lu-sidepanel-panel',
	templateUrl: './sidepanel-panel.component.html',
	styleUrls: ['./sidepanel-panel.component.scss'],
	host: { class: 'lu-sidepanel-panel' },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuSidepanelPanelComponent<
	T extends ILuSidepanelContent = ILuSidepanelContent,
> extends ALuModalPanelComponent<T> {
	constructor(
		_ref: ALuSidepanelRef<LuSidepanelPanelComponent>,
		_cdr: ChangeDetectorRef,
		@Inject(LuSidepanelIntl) intl: ILuSidepanelLabel,
	) {
		super(_ref, _cdr, intl);
	}
}

@Component({
	selector: 'lu-sidepanel-panel-default',
	templateUrl: './sidepanel-panel.component.html',
	styleUrls: ['./sidepanel-panel.component.scss'],
	host: { class: 'lu-sidepanel-panel' },
	changeDetection: ChangeDetectionStrategy.Default,
})
export class LuSidepanelPanelComponentDefaultCD<
	T extends ILuSidepanelContent = ILuSidepanelContent,
> extends ALuModalPanelComponent<T> {
	constructor(
		_ref: ALuSidepanelRef<LuSidepanelPanelComponent>,
		_cdr: ChangeDetectorRef,
		@Inject(LuSidepanelIntl) intl: ILuSidepanelLabel,
	) {
		super(_ref, _cdr, intl);
	}
}
