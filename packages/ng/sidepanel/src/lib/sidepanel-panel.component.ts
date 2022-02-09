/* eslint-disable max-len */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Inject } from '@angular/core';
import { ALuModalPanelComponent } from '@lucca-front/ng/modal';
import { ALuSidepanelRef } from './sidepanel-ref.model';
import { LuSidepanelIntl } from './sidepanel.intl';
import { ILuSidepanelContent } from './sidepanel.model';
import { ILuSidepanelLabel } from './sidepanel.translate';

@Component({
	selector: 'lu-sidepanel-panel',
	templateUrl: './sidepanel-panel.component.html',
	styleUrls: ['./sidepanel-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuSidepanelPanelComponent<T extends ILuSidepanelContent = ILuSidepanelContent> extends ALuModalPanelComponent<T> {
	@HostBinding('class.lu-sidepanel-panel') public class = true;

	constructor(_ref: ALuSidepanelRef<LuSidepanelPanelComponent<T>>, _cdr: ChangeDetectorRef, @Inject(LuSidepanelIntl) intl: ILuSidepanelLabel) {
		super(_ref, _cdr, intl);
	}
}

@Component({
	selector: 'lu-sidepanel-panel-default',
	templateUrl: './sidepanel-panel.component.html',
	styleUrls: ['./sidepanel-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LuSidepanelPanelComponentDefaultCD<T extends ILuSidepanelContent = ILuSidepanelContent> extends ALuModalPanelComponent<T> {
	@HostBinding('class.lu-sidepanel-panel') public class = true;
	constructor(_ref: ALuSidepanelRef<LuSidepanelPanelComponent<T>>, _cdr: ChangeDetectorRef, @Inject(LuSidepanelIntl) intl: ILuSidepanelLabel) {
		super(_ref, _cdr, intl);
	}
}
