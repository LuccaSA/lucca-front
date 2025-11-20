import { Meta, StoryFn } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/Clickable',
} as Meta;

function getTemplate(): string {
	return '<a href="#" class="tag">Text</a>';
}

const Template: StoryFn = () => ({
	template: getTemplate(),
});

export const Clickable = Template.bind({});
