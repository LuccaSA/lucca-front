import { Meta, Story } from '@storybook/angular';

interface TextifeldFilterStory {}

export default {
	title: 'Documentation/Forms/Textifeld/Filter',
	argTypes: {},
} as Meta;

function getTemplate(args: TextifeldFilterStory): string {
	return `
	<div class="filters">
	  <label class="textfield mod-filter">
	  	<input class="textfield-input" type="text" placeholder="placeholder">
	  	<span class="textfield-label">Label textfield</span>
	  </label>
	</div>
	`
}

const Template: Story<TextifeldFilterStory> = (args: TextifeldFilterStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`
		.textfield {
			display: inline-flex;
			margin-right: 1rem;
		}`]
});

export const Filter = Template.bind({});
Filter.args = {};
