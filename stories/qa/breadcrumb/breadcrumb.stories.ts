import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'breadcrumb-stories',
	templateUrl: './breadcrumb.stories.html',
}) class BreadcrumbStory {}

export default {
  title: 'QA/Breadcrumb',
  component: BreadcrumbStory,
	decorators: [
		moduleMetadata({
			entryComponents: [BreadcrumbStory]
		})
	]
} as Meta;

const template: Story<BreadcrumbStory> = () => ({});

export const basic = template.bind({});
