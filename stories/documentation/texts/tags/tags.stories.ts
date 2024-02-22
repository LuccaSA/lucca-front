import { Meta, StoryFn } from '@storybook/angular';

interface TagsBasicStory {
	palette: string;
	clickable: boolean;
	L: boolean;
	outlined: boolean;
}

export default {
	title: 'Documentation/Texts/Tags/Basic',
	argTypes: {
		palette: {
			options: [
				'',
				'palette-product',
				'palette-neutral',
				'palette-success',
				'palette-warning',
				'palette-error',
				'palette-kiwi',
				'palette-lime',
				'palette-cucumber',
				'palette-mint',
				'palette-glacier',
				'palette-lagoon',
				'palette-blueberry',
				'palette-lavender',
				'palette-grape',
				'palette-watermelon',
				'palette-pumpkin',
				'palette-pineapple',
			],
			control: {
				type: 'select',
			},
		},
		outlined: {
			control: {
				type: 'boolean',
			},
		},
		L: {
			control: {
				type: 'boolean',
			},
			description: 'Taille : Medium',
		},
		clickable: {
			control: {
				type: 'boolean',
			},
			description: 'Deprecated 🦕',
		},
	},
} as Meta;

function getTemplate(args: TagsBasicStory): string {
	const classes = [args.palette].filter(Boolean).join(' ');

	const outlined = args.outlined ? `mod-outlined` : '';
	const L = args.L ? `mod-L` : '';
	if (args.clickable) {
		return `<a href="#" class="tag ${classes} ${outlined} ${L}">Tag</a> <span class="tag mod-clickable ${classes} ${outlined} ${L}">Tag</span>`;
	} else {
		return `<span class="tag ${classes} ${outlined} ${L}">Tag</span>`;
	}
}

const Template: StoryFn<TagsBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: flex;
			gap: 0.5rem;
		}
	`,
	],
});

export const Basic = Template.bind({});
Basic.args = { outlined: false, L: false, palette: '', clickable: false };
