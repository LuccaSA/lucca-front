import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'skeleton-stories',
	templateUrl: './skeleton.stories.html',
})
class SkeletonStory {}

export default {
	title: 'QA/Skeleton',
	component: SkeletonStory,
} as Meta;

const template: StoryFn<SkeletonStory> = () => ({});

export const basic = template.bind({});
