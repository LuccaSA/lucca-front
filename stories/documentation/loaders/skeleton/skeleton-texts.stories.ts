import { Meta, StoryObj } from '@storybook/angular';

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

const Template = (args: SkeletonTextsStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Texts: StoryObj<SkeletonTextsStory> = {
	args: {},
	render: Template,
};
