import { Meta, StoryObj } from '@storybook/angular';

interface ChipBasicStory {
	product: boolean;
	disabled: boolean;
}

export default {
	title: 'Documentation/Listings/Chip/HTML&CSS/Basic',
	argTypes: {
		product: {
			control: {
				type: 'boolean',
			},
			description: 'Applique la palette product au composant.',
		},
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive le composant.',
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
			<span class="pr-u-mask">delete</span>
		</button>
	</div>
	<div class="chip ${product} ${disabled}">
		Label
	</div>
	`;
}

const Template = (args: ChipBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ChipBasicStory> = {
	args: { product: false, disabled: false },
	render: Template,
};
