import { Meta, StoryObj } from '@storybook/angular';

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
		<strong class="callout-content-title">Dépense non prise en charge</strong>
		<div class="callout-content-description">Vous l'avez déclarée comme usage personnel le 29 août 2023.</div>
	</div>
</div>`;
}

const Template = (args: CalloutTitleStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Title: StoryObj<CalloutTitleStory> = {
	args: {},
	render: Template,
};
