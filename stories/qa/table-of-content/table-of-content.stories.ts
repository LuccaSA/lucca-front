import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'table-of-content-stories',
	templateUrl: './table-of-content.stories.html',
})
class TableOfContentStory {}

export default {
	title: 'QA/Table Of Content',
	component: TableOfContentStory,
} as Meta;

const template: StoryFn<TableOfContentStory> = () => ({});

export const basic = template.bind({});
