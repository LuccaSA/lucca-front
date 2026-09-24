import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LuSelectPanelLayoutComponent } from '@lucca-front/ng/core-select';
import { IconComponent } from '@lucca-front/ng/icon';
import { ListboxComponent, OptionComponent } from '@lucca-front/ng/listbox';
import { Meta } from '@storybook/angular-vite';

@Component({
	selector: 'filter-pill-panel-stories',
	templateUrl: './filter-pill-panel.stories.html',
	imports: [LuSelectPanelLayoutComponent, ListboxComponent, OptionComponent, IconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FilterPillPanelStory {}

export default {
	title: 'QA/FilterPill/Panel',
	component: FilterPillPanelStory,
} as Meta;

export const Basic = {};
