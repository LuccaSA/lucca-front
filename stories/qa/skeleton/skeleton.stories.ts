import { Component } from '@angular/core';
import { SkeletonButtonComponent, SkeletonDataTableComponent, SkeletonFieldComponent, SkeletonHeaderComponent, SkeletonIndexTableComponent, SkeletonTableComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'skeleton-stories',
	templateUrl: './skeleton.stories.html',
	imports: [SkeletonButtonComponent, SkeletonFieldComponent, SkeletonHeaderComponent, SkeletonIndexTableComponent, SkeletonDataTableComponent, SkeletonTableComponent],
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
