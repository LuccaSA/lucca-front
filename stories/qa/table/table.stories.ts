import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

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

const template: Story<TableStory> = () => ({});

export const basic = template.bind({});
