import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'data-table-stories',
	templateUrl: './data-table.stories.html',
})
class DataTableStory {}

export default {
	title: 'QA/DataTable',
	component: DataTableStory,
} as Meta;

const template: StoryFn<DataTableStory> = () => ({});

export const basic = template.bind({});
