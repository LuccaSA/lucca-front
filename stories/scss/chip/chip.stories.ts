import { Meta, Story } from '@storybook/angular';

interface ChipBasicStory {
}

export default {
	title: 'SCSS/Chip/Basic',
} as Meta;

function getTemplate(args: ChipBasicStory): string {
	return `
	<div class="chip">
		Ned Stark
		<button class="chip-kill"></button>
	</div>
	<div class="chip mod-unkillable">
		Connor MacLeod
	</div>
	`
}

const Template: Story<ChipBasicStory> = (args: ChipBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
