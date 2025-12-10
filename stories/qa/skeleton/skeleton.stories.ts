import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

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

const template = () => ({});

export const Basic: StoryObj<SkeletonStory> = {
	args: {},
	render: template,
};
