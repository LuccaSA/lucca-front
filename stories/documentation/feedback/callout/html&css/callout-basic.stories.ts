import { Meta, StoryFn } from '@storybook/angular';

interface CalloutBasicStory {
	palette: string;
	s: boolean;
}

export default {
	title: 'Documentation/Feedback/Callout/HTML & CSS/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-product', 'palette-neutral', 'palette-success', 'palette-warning', 'palette-error'],
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
	let classes = [args.palette].filter(Boolean).join(' ');
	classes = classes ? ' ' + classes : classes;
	const s = args.s ? ` mod-S` : '';
	return `<div class="callout${classes}${s}">
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
Basic.args = { palette: '', s: false };
