import { Meta, Story } from '@storybook/angular';

interface TagsBasicStory {
	palette: string;
	clickable: boolean;
	outlined: boolean;
}

export default {
	title: 'Documentation/Texts/Tags/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'select',
			},
		},
		clickable: {
			control: {
				type: 'boolean',
			},
		},
		outlined: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: TagsBasicStory): string {
	const classes = [args.palette].filter(Boolean).join(' ');
	const clickable = args.clickable ? `mod-clickable` : '';
	const outlined = args.outlined ? `mod-outlined` : '';
	return `
		<span class="tag ${classes} ${clickable} ${outlined}">Tag</span>
	`;
}

const Template: Story<TagsBasicStory> = (args: TagsBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { palette: '', clickable: false, outlined: false };
