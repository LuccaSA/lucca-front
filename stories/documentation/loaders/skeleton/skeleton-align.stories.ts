import { Meta, StoryObj } from '@storybook/angular';

interface SkeletonAlignStory {}

export default {
	title: 'Documentation/Loaders/Skeleton',
} as Meta;

function getTemplate(args: SkeletonAlignStory): string {
	return `<div class="skeleton is-loading">
	<span class="skeleton-item" style="--components-skeleton-text-width: 50%;"></span>
	<span class="skeleton-item mod-alignCenter" style="--components-skeleton-text-width: 50%;"></span>
	<span class="skeleton-item mod-alignRight" style="--components-skeleton-text-width: 50%;"></span>
</div>`;
}

const Template = (args: SkeletonAlignStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Align: StoryObj<SkeletonAlignStory> = {
	args: {},
	render: Template,
};
