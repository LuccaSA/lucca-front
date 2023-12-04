import { Meta, StoryFn } from '@storybook/angular';

interface ButtonIconStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Only icon',
} as Meta;

function getTemplate(args: ButtonIconStory): string {
	return `<button type="button" class="button mod-onlyIcon"><span aria-hidden="true" class="lucca-icon icon-heart"></span></button>`;
}

const Template: StoryFn<ButtonIconStory> = (args: ButtonIconStory) => ({
	props: args,
	template: getTemplate(args),
});

export const IconButton = Template.bind({});
IconButton.args = {};
