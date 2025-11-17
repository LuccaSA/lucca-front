import { Component } from '@angular/core';
import { TableOfContentComponent, TableOfContentLinkDirective } from '@lucca-front/ng/table-of-content';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'table-of-content-stories',
	templateUrl: './table-of-content.stories.html',
	imports: [TableOfContentComponent, TableOfContentLinkDirective],
})
class TableOfContentStory {}

export default {
	title: 'QA/Table Of Content',
	component: TableOfContentStory,
} as Meta;

const template: StoryFn<TableOfContentStory> = () => ({});

export const basic = template.bind({});
