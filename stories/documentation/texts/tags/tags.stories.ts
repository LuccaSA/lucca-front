import { Meta, StoryFn } from '@storybook/angular';

interface TagsBasicStory {
	palette: string;
	clickable: boolean;
	l: boolean;
	outlined: boolean;
}

export default {
	title: 'Documentation/Texts/Tags/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-product', 'palette-neutral', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'select',
			},
			description: 'Deprecated 🦕',
		},
		outlined: {
			control: {
				type: 'boolean',
			},
		},
		l: {
			control: {
				type: 'boolean',
			},
			description: 'Taille : Large',
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
	const clickable = args.clickable ? `mod-clickable` : '';
	const outlined = args.outlined ? `mod-outlined` : '';
	const l = args.l ? `mod-L` : '';
	return `<span class="tag ${classes} ${clickable} ${outlined} ${l}">Tag</span>`;
}

const Template: StoryFn<TagsBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { outlined: false, l: false, palette: '', clickable: false };
