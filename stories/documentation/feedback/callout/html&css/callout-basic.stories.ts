import { Meta, StoryObj } from '@storybook/angular';

interface CalloutBasicStory {
	palette: string;
	s: boolean;
}

export default {
	title: 'Documentation/Feedback/Callout/HTML & CSS/Basic',
	argTypes: {
		palette: {
			options: ['', 'product', 'neutral', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
		},
		s: {
			control: {
				type: 'boolean',
			},
			description: 'Taille : Small',
		},
	},
} as Meta;

function getTemplate(args: CalloutBasicStory): string {
	const palette = args.palette ? ` palette-${args.palette}` : ``;
	const s = args.s ? ` mod-S` : ``;
	return `<div class="callout${palette}${s}">
	<div class="callout-content">
		<p class="callout-content-description">Feedback description</p>
	</div>
</div>`;
}

const Template = (args: CalloutBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<CalloutBasicStory> = {
	args: { palette: '', s: false },
	render: Template,
};
