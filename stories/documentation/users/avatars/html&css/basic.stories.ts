import { Meta, StoryFn } from '@storybook/angular';

interface UserAvatarBasicStory {}

export default {
	title: 'Documentation/Users/Avatar/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: UserAvatarBasicStory): string {
	return `
<div class="avatar">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</div>
	`;
}

const Template: StoryFn<UserAvatarBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
