import { Meta, StoryFn } from '@storybook/angular';

interface ChipBasicStory {
	product: boolean;
	disabled: boolean;
}

export default {
	title: 'Documentation/Listings/Chip/Basic',
	argTypes: {
		product: {
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
	const product = args.product ? `palette-product` : '';
	const disabled = args.disabled ? `is-disabled` : '';
	return `
	<div class="chip ${product} ${disabled}">
		Label
		<button type="button" class="chip-kill">
			<span class="u-mask">delete</span>
		</button>
	</div>
	<div class="chip ${product} ${disabled}">
		Label
	</div>
	`;
}

const Template: StoryFn<ChipBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { product: false, disabled: false };
