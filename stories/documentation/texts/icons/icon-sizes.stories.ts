import { Meta, StoryFn } from '@storybook/angular';

interface IconsSizesStory {}

export default {
	title: 'Documentation/Texts/Icons/Sizes',
} as Meta;

function getTemplate(args: IconsSizesStory): string {
	return `<span aria-hidden="true" class="lucca-icon icon-heart mod-XS"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-S"></span>
<span aria-hidden="true" class="lucca-icon icon-heart"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-L"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-XL"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-XXL"></span>`;
}

const Template: StoryFn<IconsSizesStory> = (args: IconsSizesStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Sizes = Template.bind({});
Sizes.args = {};
