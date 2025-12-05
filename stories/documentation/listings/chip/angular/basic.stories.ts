import { ChipComponent } from '@lucca-front/ng/chip';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface ChipBasicStory {
	unkillable: boolean;
	disabled: boolean;
	product: boolean;
}

export default {
	title: 'Documentation/Listings/Chip/Angular/Basic',
	argTypes: {
		unkillable: {
			control: {
				type: 'boolean',
			},
			description: 'Rend le chip non supprimable.',
		},
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive le composant.',
		},
		product: {
			control: {
				type: 'boolean',
			},
			description: 'Applique la palette product au composant.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [ChipComponent],
		}),
	],
} as Meta;

function getTemplate(args: ChipBasicStory): string {
	const unkillable = args.unkillable ? ` unkillable` : ``;
	const product = args.product ? ` palette="product"` : ``;
	const disabled = args.disabled ? ` disabled` : ``;
	return `<lu-chip${disabled}${unkillable}${product}>
	Label
</lu-chip>
`;
}

const Template: StoryFn<ChipBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	unkillable: false,
	disabled: false,
	product: false,
};
