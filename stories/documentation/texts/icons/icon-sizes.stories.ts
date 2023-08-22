import { Meta, StoryObj } from '@storybook/angular';

interface IconsSizesStory {}

export default {
	title: 'Documentation/Texts/Icons/Sizes',
} as Meta;

export const Sizes: StoryObj<IconsSizesStory> = {
	render: () => ({
		template: `
		<span aria-hidden="true" class="lucca-icon icon-heart mod-XS"></span>
		<span aria-hidden="true" class="lucca-icon icon-heart mod-S"></span>
		<span aria-hidden="true" class="lucca-icon icon-heart"></span>
		<span aria-hidden="true" class="lucca-icon icon-heart mod-L"></span>
		<span aria-hidden="true" class="lucca-icon icon-heart mod-XL"></span>
		<span aria-hidden="true" class="lucca-icon icon-heart mod-XXL"></span>
	`,
	}),
};
