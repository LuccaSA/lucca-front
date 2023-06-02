import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'table-stories',
	templateUrl: './table.stories.html',
}) class TableStory {}

export default {
  title: 'QA/Table',
  component: TableStory,
	decorators: [
		moduleMetadata({
			entryComponents: [TableStory]
		})
	]
} as Meta;

const template: StoryFn<TableStory> = () => ({});

export const basic = template.bind({});
