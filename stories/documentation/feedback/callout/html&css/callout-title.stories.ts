import { Meta, StoryFn } from '@storybook/angular';

interface CalloutTitleStory {
	palette: string;
	s: boolean;
}

export default {
	title: 'Documentation/Feedback/Callout/HTML & CSS/Title',
	argTypes: {},
} as Meta;

function getTemplate(args: CalloutTitleStory): string {
	return `<div class="callout">
	<div class="callout-content">
		<strong class="callout-content-title">Lorem ipsum dolor</strong>
		<div class="callout-content-description">Caesarem fama studio memorabili ut latius abscessere amplam Nebridius equitum. <a href="#">En savoir plus</a></div>
	</div>
</div>`;
}

const Template: StoryFn<CalloutTitleStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Title = Template.bind({});
Title.args = {};
