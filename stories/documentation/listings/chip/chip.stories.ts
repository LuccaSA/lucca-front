import { Meta, Story } from '@storybook/angular';

interface ChipBasicStory {
	clickable: boolean;
}

export default {
	title: 'Documentation/Listings/Chip/Basic',
} as Meta;

function getTemplate(args: ChipBasicStory): string {
	const clickable = args.clickable ? `mod-clickable` : '';
	return `
	<div class="chip ${clickable}">
		Ned Stark
		<button type="button" class="chip-kill"></button>
	</div>
	<div class="chip mod-unkillable ${clickable}">
		Connor MacLeod
	</div>
	`;
}

const Template: Story<ChipBasicStory> = (args: ChipBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { clickable: false };
