import { Meta, StoryFn } from '@storybook/angular';

interface CalloutBasicStory {
	palette: string;
	s: boolean;
}

export default {
	title: 'Documentation/Feedback/Callout/HTML & CSS/IA',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
			description: 'Taille : Small',
		},
	},
} as Meta;

function getTemplate(args: CalloutBasicStory): string {
	const s = args.s ? ` mod-S` : ``;
	return `<div class="callout mod-IA${s}">
	<div class="callout-content">
		<div class="callout-content-description">Feedback description</div>
	</div>
</div>`;
}

const Template: StoryFn<CalloutBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { s: false };
