import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'skeleton-stories',
	templateUrl: './skeleton-shapes.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SkeletonShapesStory {}

export default {
	title: 'QA/Skeleton Shapes',
	component: SkeletonShapesStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<SkeletonShapesStory> = {
	args: {},
	render: template,
};
