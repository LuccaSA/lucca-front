import { Meta, Story } from '@storybook/angular';

interface CalloutKillableStory {
	palette: string;
}

export default {
	title: 'Documentation/Feedback/Callout/Killable',
	argTypes: {
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'select',
			}
		},
	},
} as Meta;

function getTemplate(args: CalloutKillableStory): string {
	const classes = [args.palette].filter(Boolean).join(' ');
	return `
	<div class="callout ${classes}">
		<button type="button" class="callout-kill"></button>
		Je suis un callout supprimable
	</div>
	`
}

const Template: Story<CalloutKillableStory> = (args: CalloutKillableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Killable = Template.bind({});
Killable.args = { palette: '' };
