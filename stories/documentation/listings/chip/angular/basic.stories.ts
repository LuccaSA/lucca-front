import { ChipComponent } from '@lucca-front/ng/chip';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface ChipBasicStory {
	content: string;
	unkillable: boolean;
	disabled: boolean;
	paletteProduct: boolean;
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
		paletteProduct: {
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
	const unkillable = args.unkillable ? `unkillable` : ``;
	const paletteProduct = args.paletteProduct ? `palette="product"` : ``;
	const disabled = args.disabled ? `disabled` : ``;
	return `<lu-chip ${disabled} ${unkillable} ${paletteProduct}>
	${args.content}
</lu-chip>
`;
}

const Template: StoryFn<ChipBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	content: 'Lorem',
	unkillable: false,
	disabled: false,
	paletteProduct: false,
};
