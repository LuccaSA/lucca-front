import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'sortable-list-stories',
	templateUrl: './sortable-list.stories.html',
}) class SortableListStory {}

export default {
  title: 'QA/SortableList',
  component: SortableListStory,
	decorators: [
		moduleMetadata({
			entryComponents: [SortableListStory]
		})
	]
} as Meta;

const template: Story<SortableListStory> = () => ({});

export const basic = template.bind({});
