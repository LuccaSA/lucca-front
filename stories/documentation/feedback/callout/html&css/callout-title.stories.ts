import { Meta, StoryObj } from '@storybook/angular';

interface CalloutTitleStory {
	palette: string;
	s: boolean;
}

export default {
	title: 'Documentation/Feedback/Callout/HTML&CSS/Title',
	argTypes: {},
} as Meta;

function getTemplate(args: CalloutTitleStory): string {
	return `<div class="callout">
	<div class="callout-content">
		<p class="callout-content-title">Dépense non prise en charge</p>
		<div class="callout-content-description">
			<p>Vous l’avez déclarée comme usage personnel le 29 août 2023.</p>
		</div>
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
