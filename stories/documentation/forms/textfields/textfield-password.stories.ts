import { Meta, Story } from '@storybook/angular';

interface TextifeldPasswordStory {
}

export default {
	title: 'Documentation/Forms/Textifeld/Password',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TextifeldPasswordStory): string {
	return `
	<label class="textfield mod-password">
		<input class="textfield-input" type="password" placeholder="placeholder" value="azerty12345#@!%;" />
		<span class="textfield-label">Password label</span>
		<span class="textfield-suffix">
			<a
				href="#"
				onClick="event.preventDefault()"
				role="button"
				aria-pressed="false"
				class="textfield-suffix-action"
			>
				<span aria-hidden="true" class="lucca-icon icon-watch"></span>
				<span aria-hidden="true" class="lucca-icon icon-unwatch"></span>
				<span class="u-mask">Show password</span>
			</a>
			</span>
	</label>
	`
}

const Template: Story<TextifeldPasswordStory> = (args: TextifeldPasswordStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Password = Template.bind({});
Password.args = { };
