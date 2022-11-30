/* eslint-disable max-len */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { ALuModalPanelComponent } from '@lucca-front/ng/modal';
import { ALuSidepanelRef } from './sidepanel-ref.model';
import { ILuSidepanelContent } from './sidepanel.model';
import { LU_SIDEPANEL_TRANSLATIONS } from './sidepanel.translate';

@Component({
	selector: 'lu-sidepanel-panel',
	templateUrl: './sidepanel-panel.component.html',
	styleUrls: ['./sidepanel-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuSidepanelPanelComponent<T extends ILuSidepanelContent = ILuSidepanelContent> extends ALuModalPanelComponent<T> {
	@HostBinding('class.lu-sidepanel-panel') public class = true;
	public override intl = getIntl(LU_SIDEPANEL_TRANSLATIONS);

	constructor(_ref: ALuSidepanelRef<T>, _cdr: ChangeDetectorRef) {
		super(_ref, _cdr);
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
	public override intl = getIntl(LU_SIDEPANEL_TRANSLATIONS);
	constructor(_ref: ALuSidepanelRef<T>, _cdr: ChangeDetectorRef) {
		super(_ref, _cdr);
	}
}
