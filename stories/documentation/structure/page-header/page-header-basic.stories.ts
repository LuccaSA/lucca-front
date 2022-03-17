import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'page-header-basic-stories',
	templateUrl: './page-header-basic.stories.html',
}) class PageHeaderBasicStory {
	@Input() pageHeaderTitle: string = '';
	@Input() pageHeaderDescription: string = '';
	@Input() withBreadcrumbs: boolean = false;
	@Input() withMenu: boolean = false;
}

export default {
	title: 'Documentation/Structure/Page Header',
	component: PageHeaderBasicStory,
	argTypes: {
		withBreadcrumbs: {
			control: {
				type: 'boolean',
			}
		},
		withMenu: {
			control: {
				type: 'boolean',
			}
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [PageHeaderBasicStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<PageHeaderBasicStory> = (args: PageHeaderBasicStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {
	pageHeaderTitle: 'H1. Page title',
	pageHeaderDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo scelerisque, blandit nibh quis, imperdiet justo. Nullam condimentum nulla et neque ultricies bibendum',
	withBreadcrumbs: false,
	withMenu: false,
};
