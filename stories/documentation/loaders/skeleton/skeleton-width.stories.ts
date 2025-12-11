import { Meta, StoryObj } from '@storybook/angular';

interface SkeletonWidthStory {}

export default {
	title: 'Documentation/Loaders/Skeleton',
} as Meta;

function getTemplate(args: SkeletonWidthStory): string {
	return `<div class="skeleton is-loading">
	<span class="skeleton-item" style="--components-skeleton-text-width: 20%;"></span>
	<span class="skeleton-item pr-u-bodyS" style="--components-skeleton-text-width: 80%;"></span>
	<span class="skeleton-item pr-u-bodyXS" style="--components-skeleton-text-width: 40%;"></span>
</div>`;
}

const Template = (args: SkeletonWidthStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Width: StoryObj<SkeletonWidthStory> = {
	args: {},
	render: Template,
};
