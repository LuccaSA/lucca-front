import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '@lucca-front/ng/breadcrumbs';
import { Meta, StoryFn } from '@storybook/angular';
import { BreadcrumbsLinkDirective } from 'packages/ng/breadcrumbs/breadcrumbs-link.directive';

@Component({
	standalone: true,
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

export const basic = template.bind({});
