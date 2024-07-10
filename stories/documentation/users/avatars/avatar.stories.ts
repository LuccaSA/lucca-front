import { Meta, StoryFn } from '@storybook/angular';

interface AvatarStory {}

export default {
	title: 'Documentation/Users/Avatar',
	argTypes: {},
} as Meta;

function getTemplate(args: AvatarStory): string {
	return `
		<div class="avatar">
			<img class="avatar-content" alt="" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" loading="lazy">
		</div>
	`;
}

const Template: StoryFn<AvatarStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
