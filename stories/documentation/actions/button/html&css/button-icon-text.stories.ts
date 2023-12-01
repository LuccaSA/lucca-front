import { Meta, StoryFn } from '@storybook/angular';

interface ButtonIconTextStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/IconText',
} as Meta;

function getTemplate(args: ButtonIconTextStory): string {
	return `<button type="button" class="button mod-icon"><span aria-hidden="true" class="lucca-icon icon-heart"></span>Button</button>`;
}

const Template: StoryFn<ButtonIconTextStory> = (args: ButtonIconTextStory) => ({
	props: args,
	template: getTemplate(args),
});

export const IconTextButton = Template.bind({});
IconTextButton.args = {};
