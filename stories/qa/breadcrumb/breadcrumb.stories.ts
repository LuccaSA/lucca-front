import { Component } from '@angular/core';
import { BreadcrumbsComponent, BreadcrumbsLinkDirective } from '@lucca-front/ng/breadcrumbs';
import { Meta, StoryObj } from '@storybook/angular';

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

const template = () => ({});

export const Basic: StoryObj<BreadcrumbStory> = {
	args: {},
	render: template,
};
