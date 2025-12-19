import { Meta, StoryObj } from '@storybook/angular';

interface ClearBasicStory {
	S: boolean;
	product: boolean;
	disabled: boolean;
	inverted: boolean;
	alt: string;
	hidden: boolean;
	link: boolean;
}

export default {
	title: 'Documentation/Texts/Clear/HTML & CSS/Basic',
	argTypes: {
		S: {
			control: {
				type: 'boolean',
			},
		},
		product: {
			if: { arg: 'disabled', truthy: false },
			control: {
				type: 'boolean',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		inverted: {
			if: { arg: 'disabled', truthy: false },
			control: {
				type: 'boolean',
			},
		},
		link: {
			if: { arg: 'disabled', truthy: false },
		},
	},
} as Meta;

function getTemplate(args: ClearBasicStory): string {
	const S = args.S ? ` mod-S` : '';
	const product = args.product ? ` palette-product` : '';
	const inverted = args.inverted ? ` mod-inverted` : '';
	const hidden = args.hidden ? ` hidden` : '';

	if (args.disabled) {
		return `<span class="clear${S}${inverted}${product}"${hidden} role="button" disabled="disabled">
		<span class="pr-u-mask">${args.alt}</span>
	</span>`;
	} else if (args.link) {
		return `<a href="#" (click)="$event.preventDefault()" class="clear${S}${inverted}${product}"${hidden}>
		<span class="pr-u-mask">${args.alt}</span>
	</a>`;
	} else {
		return `<button class="clear${S}${inverted}${product}"${hidden}>
		<span class="pr-u-mask">${args.alt}</span>
	</button>`;
	}
}

const Template = (args: ClearBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ClearBasicStory> = {
  args: {
	S: false,
	disabled: false,
	link: false,
	product: false,
	inverted: false,
	hidden: false,
	alt: 'Clear',
},
  render: Template,
}

