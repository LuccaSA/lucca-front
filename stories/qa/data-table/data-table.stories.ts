import { Component } from '@angular/core';
import { StatusBadgeComponent } from '@lucca-front/ng/statusBadge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'data-table-stories',
	templateUrl: './data-table.stories.html',
	imports: [StatusBadgeComponent, TagComponent, LuUserPictureComponent],
	styles: [
		`
			.dataTable:has(.mod-stickyColumn),
			.mod-columnsOverflow {
				white-space: nowrap;
			}
		`,
	],
})
class DataTableStory {}

export default {
	title: 'QA/DataTable',
	component: DataTableStory,
} as Meta;

const template: StoryFn<DataTableStory> = () => ({});

export const basic = template.bind({});
