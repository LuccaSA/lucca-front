import { Meta, StoryFn } from '@storybook/angular';

interface SkeletonWidthStory {}

export default {
	title: 'Documentation/Skeleton',
} as Meta;

function getTemplate(args: SkeletonWidthStory): string {
	return `<div class="skeleton is-loading">
	<span class="skeleton-item u-textXXL" style="--components-skeleton-text-width: 50%;"></span>
	<span class="skeleton-item u-textXL" style="--components-skeleton-text-width: 33%;"></span>
	<span class="skeleton-item u-textL" style="--components-skeleton-text-width: 66%;"></span>
	<span class="skeleton-item" style="--components-skeleton-text-width: 20%;"></span>
	<span class="skeleton-item u-textS" style="--components-skeleton-text-width: 80%;"></span>
	<span class="skeleton-item u-textXS" style="--components-skeleton-text-width: 40%;"></span>
</div>`;
}

const Template: StoryFn<SkeletonWidthStory> = (args: SkeletonWidthStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Width = Template.bind({});
Width.args = {};
