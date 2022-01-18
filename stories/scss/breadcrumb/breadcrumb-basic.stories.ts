import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'breadcrumb-basic-stories',
	templateUrl: './breadcrumb-basic.stories.html',
}) class BreadcrumbBasicStory {
	@Input() breadcrumbs: string;
	@Input() link: string;
	@Input() currentPage: string;
	@Input() mod: string = '';
}

export default {
	title: 'SCSS/Breadcrumb/Basic',
	component: BreadcrumbBasicStory,
	argTypes: {
		mod: {
			control: {
				type: 'radio',
				options: ['', ' mod-compact']
			}
		}
	},
	decorators: [
		moduleMetadata({
			entryComponents: [BreadcrumbBasicStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<BreadcrumbBasicStory> = (args: BreadcrumbBasicStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = { breadcrumbs: 'Breadcrumbs', mod: '', link: 'Link', currentPage: 'Current page' };
