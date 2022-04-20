import { Meta, Story } from '@storybook/angular';

interface TextifeldClearableStory {}

export default {
	title: 'Documentation/Forms/Textifeld/Clearable',
	argTypes: {},
} as Meta;

function getTemplate(args: TextifeldClearableStory): string {
	return `
	<label class="textfield mod-clearable">
		<input class="textfield-input" type="text" placeholder="placeholder">
		<span class="textfield-label">Label textfield</span>
		<a href="#" role="button" class="actionIcon textfield-actionClear"><span aria-hidden="true" class="lucca-icon icon-cross"></span></a>
	</label>
	`
}

const Template: Story<TextifeldClearableStory> = (args: TextifeldClearableStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`
		.textfield {
			display: inline-flex;
			margin-right: 1rem;
		}`]
});

export const Clearable = Template.bind({});
Clearable.args = {};
