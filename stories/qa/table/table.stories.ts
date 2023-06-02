import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'table-stories',
	templateUrl: './table.stories.html',
})
class TableStory {}

export default {
	title: 'QA/Table',
	component: TableStory,
} as Meta;

const template: StoryFn<TableStory> = () => ({});

export const basic = template.bind({});
