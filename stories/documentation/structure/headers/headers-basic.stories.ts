import { Meta, Story } from '@storybook/angular';

interface HeadersBasicStory {
}

export default {
	title: 'Documentation/Structure/Headers/Basic',
} as Meta;

function getTemplate(args: HeadersBasicStory): string {
	return `
	<div class="header">
		<div class="header-contentLeft">
	  	<div class="textfield mod-search">
	  		<input class="textfield-input" type="text" placeholder="Rechercher">
	  	</div>
		</div>
		<div class="header-contentRight">
			<button class="button palette-primary">button</button>
		</div>
	</div>
	`
}

const Template: Story<HeadersBasicStory> = (args: HeadersBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
