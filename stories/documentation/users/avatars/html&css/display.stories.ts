import { Meta, StoryFn } from '@storybook/angular';

interface UserAvatarDisplayStory {}

export default {
	title: 'Documentation/Users/Avatar/HTML&CSS/Display',
	argTypes: {},
} as Meta;

function getTemplate(args: UserAvatarDisplayStory): string {
	return `
<span class="avatar">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
<span class="avatar">
	<span class="avatar-picture" style="background-color: rgb(202, 92, 214)">
		<span class="avatar-picture-initials">FM</span>
	</span>
</span>
<span class="avatar mod-placeholder">
	<span class="avatar-picture">
		<span class="avatar-picture-initials">JT</span>
	</span>
</span>
	`;
}

const Template: StoryFn<UserAvatarDisplayStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Display = Template.bind({});
Display.args = {};
