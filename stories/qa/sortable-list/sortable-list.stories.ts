import { Component } from '@angular/core';
import { SortableListComponent, SortableListItemComponent } from '@lucca-front/ng/sortable-list';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'sortable-list-stories',
	templateUrl: './sortable-list.stories.html',
	imports: [SortableListComponent, SortableListItemComponent],
})
class SortableListStory {}

export default {
	title: 'QA/SortableList',
	component: SortableListStory,
	decorators: [
		moduleMetadata({
			entryComponents: [SortableListStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<SortableListStory> = {
	args: {},
	render: template,
};
