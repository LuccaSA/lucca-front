import { Meta, Story } from '@storybook/angular';

interface LabelBasicStory {
	palette: string;
}

export default {
	title: 'Documentation/Texts/Label/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'radio',
			}
		},
	},
} as Meta;

function getTemplate(args: LabelBasicStory): string {
	const classes = [args.palette].filter(Boolean).join(' ');
	return `
		<span class="label ${classes}">Label</span>
		<span class="label ${classes} mod-number">7</span>
	`
}

const Template: Story<LabelBasicStory> = (args: LabelBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { palette: '' };
