import { Meta, StoryFn } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/Outlined',
} as Meta;

function getTemplate(): string {
	return '<span class="tag mod-outlined">Text</span>';
}

const Template: StoryFn = () => ({
	template: getTemplate(),
});

export const Outlined = Template.bind({});
