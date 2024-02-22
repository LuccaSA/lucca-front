import { Meta, StoryFn } from '@storybook/angular';

interface IconColorStory {}

export default {
	title: 'Documentation/Texts/Icons/HTML&CSS',
} as Meta;

function getTemplate(args: IconColorStory): string {
	return `<span aria-hidden="true" class="lucca-icon icon-heart"></span>
<span aria-hidden="true" class="lucca-icon icon-heart u-textLight"></span>
<span aria-hidden="true" class="lucca-icon icon-heart u-textPlaceholder"></span>
<span aria-hidden="true" class="lucca-icon icon-heart u-textProduct"></span>
<span aria-hidden="true" class="lucca-icon icon-heart u-textError"></span>
<span aria-hidden="true" class="lucca-icon icon-heart u-textWarning"></span>
<span aria-hidden="true" class="lucca-icon icon-heart u-textSuccess"></span>`;
}

const Template: StoryFn<IconColorStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Color = Template.bind({});
Color.args = {};
