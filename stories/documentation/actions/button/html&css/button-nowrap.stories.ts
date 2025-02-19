import { Meta, StoryFn } from '@storybook/angular';

interface ButtonNowrapStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Nowrap',
} as Meta;

function getTemplate(args: ButtonNowrapStory): string {
	return `<button type="button" class="button mod-nowrap">Button Button Button Button</button>`;
}

const Template: StoryFn<ButtonNowrapStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const BlockButton = Template.bind({});
BlockButton.args = {};
