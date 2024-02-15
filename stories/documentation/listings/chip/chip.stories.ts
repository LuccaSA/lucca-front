import { Meta, StoryFn } from '@storybook/angular';

interface ChipBasicStory {
	primary: boolean;
	disabled: boolean;
}

export default {
	title: 'Documentation/Listings/Chip/Basic',
	argTypes: {
		primary: {
			control: {
				type: 'boolean',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: ChipBasicStory): string {
	const primary = args.primary ? `palette-primary` : '';
	const disabled = args.disabled ? `is-disabled` : '';
	return `
	<div class="chip ${primary} ${disabled}">
		Label
		<button type="button" class="chip-kill">
			<span class="u-mask">delete</span>
		</button>
	</div>
	<div class="chip ${primary} ${disabled}">
		Label
	</div>
	`;
}

const Template: StoryFn<ChipBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { primary: false, disabled: false };
