import { Meta, StoryFn } from '@storybook/angular';

interface IconColorStory {}

export default {
	title: 'Documentation/Texts/Icons/HTML&CSS',
} as Meta;

function getTemplate(args: IconColorStory): string {
	return `<span aria-hidden="true" class="lucca-icon icon-heart"></span>
<span aria-hidden="true" class="lucca-icon icon-heart pr-u-colorTextSubtle"></span>
<span aria-hidden="true" class="lucca-icon icon-heart pr-u-colorInputTextPlaceholder"></span>
<span aria-hidden="true" class="lucca-icon icon-heart pr-u-colorTextProduct"></span>
<span aria-hidden="true" class="lucca-icon icon-heart pr-u-colorTextError"></span>
<span aria-hidden="true" class="lucca-icon icon-heart pr-u-colorTextWarning"></span>
<span aria-hidden="true" class="lucca-icon icon-heart pr-u-colorTextSuccess"></span>
<!-- 20.3 --><span aria-hidden="true" class="lucca-icon icon-heart mod-AI"></span>`;
}

const Template: StoryFn<IconColorStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Color = Template.bind({});
Color.args = {};
