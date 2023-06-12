import { Meta, Story } from '@storybook/angular';

interface TextfieldPasswordStory {}

export default {
	title: 'Documentation/Forms/Textfield/Password',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldPasswordStory): string {
	return `
		<label class="textfield mod-password">
			<input class="textfield-input" type="password" placeholder="placeholder" value="azerty12345#@!%;" />
			<span class="textfield-label">Label</span>
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
		<label class="textfield mod-password">
			<input class="textfield-input" type="text" placeholder="placeholder" value="azerty12345#@!%;" />
			<span class="textfield-label">Label</span>
			<span class="textfield-suffix">
				<a
				  href="#"
				  onClick="event.preventDefault()"
				  role="button"
				  aria-pressed="true"
				  class="textfield-suffix-action"
				>
				  <span aria-hidden="true" class="lucca-icon icon-watch"></span>
				  <span aria-hidden="true" class="lucca-icon icon-unwatch"></span>
				  <span class="u-mask">Show password</span>
				</a>
			  </span>
		</label>
	`;
}

const Template: Story<TextfieldPasswordStory> = (args: TextfieldPasswordStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.textfield {
			float: left;
			margin-right: 1rem;
		}`,
	],
});

export const Password = Template.bind({});
Password.args = {};
