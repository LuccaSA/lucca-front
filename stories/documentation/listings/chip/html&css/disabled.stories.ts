import { Meta, StoryFn } from '@storybook/angular';

interface ChipDisabledStory {}

export default {
	title: 'Documentation/Listings/Chip/HTML&CSS/Disabled',
	argTypes: {},
} as Meta;

function getTemplate(args: ChipDisabledStory): string {
	return `<div class="chip is-disabled">
	Label
	<button type="button" class="chip-kill">
		<span class="pr-u-mask">delete</span>
	</button>
</div>`;
}

const Template: StoryFn<ChipDisabledStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Disabled = Template.bind({});
Disabled.args = {};
