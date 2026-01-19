import { Meta, StoryObj } from '@storybook/angular';

interface SkeletonSquareStory {}

export default {
	title: 'Documentation/Loaders/Skeleton',
} as Meta;

function getTemplate(args: SkeletonSquareStory): string {
	return `<div class="skeleton is-loading pr-u-displayFlex pr-u-gap100 pr-u-alignItemsCenter">
	<span class="skeleton-item mod-square mod-XS"></span>
	<span class="skeleton-item mod-square mod-S"></span>
	<span class="skeleton-item mod-square"></span>
	<span class="skeleton-item mod-square mod-L"></span>
	<span class="skeleton-item mod-square mod-XL"></span>
	<span class="skeleton-item mod-square mod-XXL"></span>
</div>`;
}

const Template = (args: SkeletonSquareStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Square: StoryObj<SkeletonSquareStory> = {
	args: {},
	render: Template,
};
