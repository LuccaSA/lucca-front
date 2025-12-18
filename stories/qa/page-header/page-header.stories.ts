import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'page-header-stories',
	templateUrl: './page-header.stories.html',
})
class PageHeaderStory {}

export default {
	title: 'QA/Page-Header',
	component: PageHeaderStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<PageHeaderStory> = {
	args: {},
	render: template,
};
