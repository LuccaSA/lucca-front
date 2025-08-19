import { Meta, StoryFn } from '@storybook/angular';

interface SkeletonTextsStory {}

export default {
	title: 'Documentation/Loaders/Skeleton',
} as Meta;

function getTemplate(args: SkeletonTextsStory): string {
	return `<div class="skeleton is-loading">
	<span class="skeleton-item"></span>
	<span class="skeleton-item pr-u-bodyS"></span>
	<span class="skeleton-item pr-u-bodyXS"></span>
</div>`;
}

const Template: StoryFn<SkeletonTextsStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Texts = Template.bind({});
Texts.args = {};
