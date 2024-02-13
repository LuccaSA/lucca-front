import { Meta, StoryFn } from '@storybook/angular';

interface SkeletonCircleStory {}

export default {
	title: 'Documentation/Loaders/Skeleton',
} as Meta;

function getTemplate(args: SkeletonCircleStory): string {
	return `<div class="skeleton is-loading u-displayFlex u-gapXS u-alignItemsCenter">
	<span class="skeleton-item mod-circle mod-XS"></span>
	<span class="skeleton-item mod-circle mod-S"></span>
	<span class="skeleton-item mod-circle"></span>
	<span class="skeleton-item mod-circle mod-L"></span>
	<span class="skeleton-item mod-circle mod-XL"></span>
	<span class="skeleton-item mod-circle mod-XXL"></span>
</div>`;
}

const Template: StoryFn<SkeletonCircleStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Circle = Template.bind({});
Circle.args = {};
