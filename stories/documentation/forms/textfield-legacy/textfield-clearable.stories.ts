import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldClearableStory {}

export default {
	title: 'Documentation/Forms/Textfield Legacy/Clearable',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldClearableStory): string {
	return `<label class="textfield mod-clearable">
	<input class="textfield-input" type="text" placeholder="Placeholder">
	<span class="textfield-label">Label</span>
	<div class="clear textfield-clear" role="button" tabindex="0">
	  <span aria-hidden="true" class="lucca-icon icon-signClose"></span>
		<span class="pr-u-mask">Clear</span>
	</div>
</label>`;
}

const Template: StoryFn<TextfieldClearableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.textfield {
			display: inline-flex;
			margin-inline-end: 1rem;
		}`,
	],
});

export const Clearable = Template.bind({});
Clearable.args = {};
