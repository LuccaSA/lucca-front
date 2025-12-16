import { Component } from '@angular/core';
import { SkeletonButtonComponent, SkeletonDataTableComponent, SkeletonFieldComponent, SkeletonHeaderComponent, SkeletonIndexTableComponent, SkeletonTableComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryFn } from '@storybook/angular';

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

const template: StoryFn<SkeletonStory> = () => ({});

export const Basic = template.bind({});
