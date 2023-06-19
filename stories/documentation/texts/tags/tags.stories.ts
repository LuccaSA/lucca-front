import { Meta, Story } from '@storybook/angular';

interface TagsBasicStory {
	palette: string;
	clickable: boolean;
	s: boolean;
	outlined: boolean;
}

export default {
	title: 'Documentation/Texts/Tags/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-primary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
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
		s: {
			control: {
				type: 'boolean',
			},
			description: "Taille : Small",
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
	const s = args.s ? `mod-S` : '';
	return `
		<span class="tag ${classes} ${clickable} ${outlined} ${s}">Tag</span>
	`;
}

const Template: Story<TagsBasicStory> = (args: TagsBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { outlined: false, s: false, palette: '', clickable: false, };
