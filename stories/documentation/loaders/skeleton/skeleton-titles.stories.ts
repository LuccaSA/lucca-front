import { Meta, StoryFn } from '@storybook/angular';

interface SkeletonTitlesStory {}

export default {
	title: 'Documentation/Loaders/Skeleton',
} as Meta;

function getTemplate(args: SkeletonTitlesStory): string {
	return `<div class="skeleton is-loading">
	<h1 class="skeleton-item"></h1>
	<h2 class="skeleton-item"></h2>
	<h3 class="skeleton-item"></h3>
	<h4 class="skeleton-item"></h4>
</div>`;
}

const Template: StoryFn<SkeletonTitlesStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Titles = Template.bind({});
Titles.args = {};
