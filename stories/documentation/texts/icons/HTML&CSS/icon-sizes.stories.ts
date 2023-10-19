import { Meta, StoryFn } from '@storybook/angular';

interface IconSizeStory {}

export default {
	title: 'Documentation/Texts/Icons/HTML&CSS',
} as Meta;

function getTemplate(args: IconSizeStory): string {
	return `<span aria-hidden="true" class="lucca-icon icon-heart mod-XS"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-S"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-M"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-L"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-XL"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-XXL"></span>`;
}

const Template: StoryFn<IconSizeStory> = (args: IconSizeStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Size = Template.bind({});
Size.args = {};
