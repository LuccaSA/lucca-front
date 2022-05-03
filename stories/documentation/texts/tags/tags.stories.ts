import { Meta, Story } from '@storybook/angular';

interface TagsBasicStory {
	palette: string;
	clickable: boolean;
}

export default {
	title: 'Documentation/Texts/Tags/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'select',
			}
		},
		clickable: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: TagsBasicStory): string {
	const classes = [args.palette].filter(Boolean).join(' ');
	const clickable = args.clickable ? `mod-clickable` : '';
	return `
		<span class="tag ${classes} ${clickable}">Tag</span>
	`
}

const Template: Story<TagsBasicStory> = (args: TagsBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { palette: '', clickable: false };
