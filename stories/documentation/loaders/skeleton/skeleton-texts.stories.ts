import { Meta, StoryFn } from '@storybook/angular';

interface SkeletonTextsStory {}

export default {
	title: 'Documentation/Loaders/Skeleton',
} as Meta;

function getTemplate(args: SkeletonTextsStory): string {
	return `<div class="skeleton is-loading">
	<span class="skeleton-item u-textXXL"></span>
	<span class="skeleton-item u-textXL"></span>
	<span class="skeleton-item u-textL"></span>
	<span class="skeleton-item"></span>
	<span class="skeleton-item u-textS"></span>
	<span class="skeleton-item u-textXS"></span>
</div>`;
}

const Template: StoryFn<SkeletonTextsStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Texts = Template.bind({});
Texts.args = {};
