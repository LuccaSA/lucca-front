import { Meta, StoryObj } from '@storybook/angular';

interface SkeletonDarkStory {}

export default {
	title: 'Documentation/Loaders/Skeleton',
} as Meta;

function getTemplate(args: SkeletonDarkStory): string {
	return `<div class="skeleton mod-dark is-loading">
	<h1 class="skeleton-item"></h1>
	<span class="skeleton-item"></span>
</div>`;
}

const Template = (args: SkeletonDarkStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Dark: StoryObj<SkeletonDarkStory> = {
	args: {},
	render: Template,
};
