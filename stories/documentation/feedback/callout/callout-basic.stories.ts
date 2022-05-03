import { Meta, Story } from '@storybook/angular';

interface CalloutBasicStory {
	palette: string;
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
	},
} as Meta;

function getTemplate(args: CalloutBasicStory): string {
	const classes = [args.palette].filter(Boolean).join(' ');
	return `
	<div class="callout ${classes}">
		Je suis un callout basique <a href="#">En savoir plus</a>
	</div>

	<div class="callout ${classes}">
		<strong class="callout-title">Je suis Mr Meeseeks !</strong> Regardez-moi !
	</div>
	`
}

const Template: Story<CalloutBasicStory> = (args: CalloutBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { palette: '' };
