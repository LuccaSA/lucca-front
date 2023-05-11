import { Meta, Story } from '@storybook/angular';

interface CalloutKillableStory {
}

export default {
	title: 'Documentation/Feedback/Callout/Killable',
	argTypes: {
	},
} as Meta;

function getTemplate(args: CalloutKillableStory): string {
	return `
	<div class="callout">
		<div class="callout-content">
			<strong class="callout-content-title">Feedback or informations</strong>
			<div class="callout-content-description">Caesarem fama studio memorabili ut latius abscessere amplam Nebridius equitum.</div>
		</div>
		<button type="button" class="callout-kill"></button>
	</div>
	`;
}

const Template: Story<CalloutKillableStory> = (args: CalloutKillableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Killable = Template.bind({});
Killable.args = { };
