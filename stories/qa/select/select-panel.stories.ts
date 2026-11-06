import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LuSelectPanelLayoutComponent } from '@lucca-front/ng/core-select';
import { ListboxComponent, OptionComponent, Treeitem } from '@lucca-front/ng/listbox';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { Meta } from '@storybook/angular-vite';

@Component({
	selector: 'select-panel-stories',
	templateUrl: './select-panel.stories.html',
	imports: [LuSelectPanelLayoutComponent, ListboxComponent, OptionComponent, Treeitem, LuUserPictureComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SelectPanelStory {}

export default {
	title: 'QA/Select/Panel',
	component: SelectPanelStory,
} as Meta;

export const Basic = {};
