import { Component } from '@angular/core';
import { BreadcrumbsComponent, BreadcrumbsLinkDirective } from '@lucca-front/ng/breadcrumbs';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'breadcrumb-stories',
	templateUrl: './breadcrumb.stories.html',
	imports: [BreadcrumbsComponent, BreadcrumbsLinkDirective],
})
class BreadcrumbStory {}

export default {
	title: 'QA/Breadcrumb',
	component: BreadcrumbStory,
} as Meta;

const template: StoryFn<BreadcrumbStory> = () => ({});

export const Basic = template.bind({});
