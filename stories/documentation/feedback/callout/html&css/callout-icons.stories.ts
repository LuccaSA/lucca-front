import { Meta, StoryFn } from '@storybook/angular';

interface CalloutIconStory {
	s: boolean;
	palette: string;
	icon: string;
}

export default {
	title: 'Documentation/Feedback/Callout/HTML & CSS/Icon',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
			description: 'Taille : Small',
		},
		palette: {
			options: ['', 'success', 'warning', 'error', 'AI'],
			control: {
				type: 'select',
			},
		},
		icon: {
			options: ['signHelp', 'signSuccess', 'signWarning', 'signError', 'weatherStars', 'officePenStar'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: CalloutIconStory): string {
	const s = args.s ? ` mod-S` : '';
	let palette = args.palette ? ` palette-${args.palette}` : ``;
	const icon = args.icon ? ' icon-' + args.icon : '';
	return `<div class="callout${s}${palette}">
	<div class="callout-icon">
		<span aria-hidden="true" class="lucca-icon${icon}"></span>
	</div>
	<div class="callout-content">
		<div class="callout-content-description">Feedback description</div>
	</div>
</div>`;
}

const Template: StoryFn<CalloutIconStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Icon = Template.bind({});
Icon.args = { s: false, icon: 'signHelp', palette: '' };
