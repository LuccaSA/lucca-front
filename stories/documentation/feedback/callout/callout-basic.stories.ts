import { Meta, Story } from '@storybook/angular';

interface CalloutBasicStory {
	palette: string;
	small: boolean;
}

export default {
	title: 'Documentation/Feedback/Callout/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'select',
			}
		},
		small: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: CalloutBasicStory): string {
	const classes = [args.palette].filter(Boolean).join(' ');
	const small = args.small ? `mod-small` : '';
	return `
	<div class="callout ${classes} ${small}">
		<strong class="callout-title">Je suis Mr Meeseeks !</strong>
		Je suis un callout basique <a href="#">En savoir plus</a>
	</div>
	`
}

const Template: Story<CalloutBasicStory> = (args: CalloutBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { palette: '', small: false };
