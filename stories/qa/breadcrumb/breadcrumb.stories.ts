import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'breadcrumb-stories',
	templateUrl: './breadcrumb.stories.html',
})
class BreadcrumbStory {}

export default {
	title: 'QA/Breadcrumb',
	component: BreadcrumbStory,
} as Meta;

const template: StoryFn<BreadcrumbStory> = () => ({});

export const basic = template.bind({});
