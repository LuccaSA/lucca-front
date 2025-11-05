import { ChipComponent } from '@lucca-front/ng/chip';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface ChipBasicStory {
	content: string;
	unkillable: boolean;
	disabled: boolean;
	product: boolean;
	withEllipsis: boolean;
}

export default {
	title: 'Documentation/Listings/Chip/Angular/Basic',
	argTypes: {
		content: {
			control: {
				type: 'text',
			},
		},
		unkillable: {
			control: {
				type: 'boolean',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		product: {
			control: {
				type: 'boolean',
			},
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
	const ellipsis = args.withEllipsis ? ` withEllipsis` : ``;
	return `<lu-chip${disabled}${unkillable}${product}${ellipsis}>${args.content}</lu-chip>
`;
}

const Template: StoryFn<ChipBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	content: 'Label',
	unkillable: false,
	disabled: false,
	product: false,
	withEllipsis: false,
};
