import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'table-of-content-stories',
	templateUrl: './table-of-content.stories.html',
}) class TableOfContentStory {}

export default {
  title: 'QA/TableOfContent',
  component: TableOfContentStory,
	decorators: [
		moduleMetadata({
			entryComponents: [TableOfContentStory]
		})
	]
} as Meta;

const template: Story<TableOfContentStory> = () => ({});

export const all = template.bind({});
