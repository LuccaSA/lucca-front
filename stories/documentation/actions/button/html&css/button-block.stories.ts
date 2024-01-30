import { Meta, StoryFn } from '@storybook/angular';

interface ButtonBlockStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Block',
} as Meta;

function getTemplate(args: ButtonBlockStory): string {
	return `<button type="button" class="button mod-block">Button</button>`;
}


const Template: StoryFn<ButtonBlockStory> = (args: ButtonBlockStory) => ({
	props: args,
	template: getTemplate(args),
});

export const BlockButton = Template.bind({});
BlockButton.args = {};
