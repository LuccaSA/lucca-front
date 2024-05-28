import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'sortable-list-stories',
	templateUrl: './sortable-list.stories.html',
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

const template: StoryFn<SortableListStory> = () => ({});

export const basic = template.bind({});
