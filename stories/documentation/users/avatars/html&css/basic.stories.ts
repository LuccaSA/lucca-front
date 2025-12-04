import { Meta, StoryFn } from '@storybook/angular';

export default {
	title: 'Documentation/Users/Avatar/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return `<div class="avatar">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</div>`;
}

const Template: StoryFn = () => ({
	template: getTemplate(),
});

export const Basic = Template.bind({});
