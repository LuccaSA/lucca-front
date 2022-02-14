import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'skeleton-stories',
	templateUrl: './skeleton.stories.html',
}) class SkeletonStory {}

export default {
  title: 'QA/Skeleton',
  component: SkeletonStory,
	decorators: [
		moduleMetadata({
			entryComponents: [SkeletonStory]
		})
	]
} as Meta;

const template: Story<SkeletonStory> = () => ({});

export const basic = template.bind({});
