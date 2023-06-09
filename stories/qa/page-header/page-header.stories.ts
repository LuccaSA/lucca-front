import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'page-header-stories',
	templateUrl: './page-header.stories.html',
})
class PageHeaderStory {}

export default {
	title: 'QA/Page-Header',
	component: PageHeaderStory,
	decorators: [
		moduleMetadata({
			entryComponents: [PageHeaderStory],
		}),
	],
} as Meta;

const template: Story<PageHeaderStory> = () => ({});

export const basic = template.bind({});
