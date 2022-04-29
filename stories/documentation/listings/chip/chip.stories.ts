import { Meta, Story } from '@storybook/angular';

interface ChipBasicStory {}

export default {
	title: 'Documentation/Listings/Chip/Basic',
} as Meta;

function getTemplate(args: ChipBasicStory): string {
	return `
	<div class="chip">
		Ned Stark
		<button type="button" class="chip-kill">
			<span class="u-mask">Supprimer</span>
		</button>
	</div>
	<div class="chip mod-unkillable">
		Connor MacLeod
	</div>
	<a href="#" class="chip mod-clickable mod-unkillable">
		Tywin Lannister
	</a>
	`;
}

const Template: Story<ChipBasicStory> = (args: ChipBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
