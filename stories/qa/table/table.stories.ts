import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

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

const template = () => ({});

export const Basic: StoryObj<TableStory> = {
	args: {},
	render: template,
};
