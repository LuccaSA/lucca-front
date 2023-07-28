import { Meta, Story } from '@storybook/angular';

interface IconsColorStory {}

export default {
	title: 'Documentation/Texts/Icons/Color',
} as Meta;

function getTemplate(args: IconsColorStory): string {
	return `<span aria-hidden="true" class="lucca-icon icon-heart u-textPrimary"></span>
<span aria-hidden="true" class="lucca-icon icon-heart u-textSecondary"></span>
<span aria-hidden="true" class="lucca-icon icon-heart u-textError"></span>
<span aria-hidden="true" class="lucca-icon icon-heart u-textWarning"></span>
<span aria-hidden="true" class="lucca-icon icon-heart u-textSuccess"></span>
<span aria-hidden="true" class="lucca-icon icon-heart u-textLight"></span>
<span aria-hidden="true" class="lucca-icon icon-heart u-textPlaceholder"></span>`;
}

const Template: Story<IconsColorStory> = (args: IconsColorStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Color = Template.bind({});
Color.args = {};
