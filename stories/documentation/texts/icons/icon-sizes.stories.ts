import { Meta, Story } from '@storybook/angular';

interface IconsSizesStory {}

export default {
	title: 'Documentation/Texts/Icons/Sizes',
} as Meta;

function getTemplate(args: IconsSizesStory): string {
	return `
		<span aria-hidden="true" class="lucca-icon icon-heart size-smaller"></span>
		<span aria-hidden="true" class="lucca-icon icon-heart size-small"></span>
		<span aria-hidden="true" class="lucca-icon icon-heart"></span>
		<span aria-hidden="true" class="lucca-icon icon-heart size-big"></span>
		<span aria-hidden="true" class="lucca-icon icon-heart size-bigger"></span>
		<span aria-hidden="true" class="lucca-icon icon-heart size-biggest"></span>
	`;
}

const Template: Story<IconsSizesStory> = (args: IconsSizesStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Sizes = Template.bind({});
Sizes.args = {};
