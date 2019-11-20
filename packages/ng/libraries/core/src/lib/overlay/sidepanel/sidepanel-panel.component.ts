import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ALuModalPanelComponent } from '../modal/index';
import { ALuSidepanelRef } from './sidepanel-ref.model';
import { LuSidepanelIntl } from './sidepanel.intl';
import { ILuSidepanelContent } from './sidepanel.model';
import { ILuSidepanelLabel } from './sidepanel.translate';


@Component({
	selector: 'lu-sidepanel-panel',
	templateUrl: './sidepanel-panel.component.html',
	styleUrls: ['./sidepanel-panel.component.scss'],
	host: {'class': 'lu-sidepanel-panel'},
})
export class LuSidepanelPanelComponent<T extends ILuSidepanelContent = ILuSidepanelContent> extends ALuModalPanelComponent<T> {
	constructor(
		_ref: ALuSidepanelRef<LuSidepanelPanelComponent>,
		_cdr: ChangeDetectorRef,
		@Inject(LuSidepanelIntl) intl: ILuSidepanelLabel,
	) {
		super(_ref, _cdr, intl);
	}
}
