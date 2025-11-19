import { Meta, StoryFn } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/Basic',
} as Meta;

function getTemplate(): string {
	return '<span class="tag">Text</span>';
}

const Template: StoryFn = () => ({
	template: getTemplate(),
});

export const Basic = Template.bind({});
