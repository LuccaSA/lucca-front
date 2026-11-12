import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LuSelectPanelLayoutComponent } from '@lucca-front/ng/core-select';
import { ListboxComponent, OptionComponent, Treeitem } from '@lucca-front/ng/listbox';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { Meta } from '@storybook/angular-vite';
import { CDN_URL } from '@lucca-front/ng/core';

@Component({
	selector: 'select-panel-stories',
	templateUrl: './select-panel.stories.html',
	imports: [LuSelectPanelLayoutComponent, ListboxComponent, OptionComponent, Treeitem, LuUserPictureComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SelectPanelStory {
	protected readonly cdnUrl = CDN_URL;
}

export default {
	title: 'QA/Select/Panel',
	component: SelectPanelStory,
} as Meta;

export const Basic = {};
