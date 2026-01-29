import { Meta, StoryObj } from '@storybook/angular';

interface CalloutIconStory {
	s: boolean;
	palette: string;
	icon: string;
}

export default {
	title: 'Documentation/Feedback/Callout/HTML&CSS/Icon',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
			description: 'Taille : Small',
		},
		palette: {
			options: ['', 'success', 'warning', 'error'],
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
	const palette = args.palette ? ` palette-${args.palette}` : ``;
	const icon = args.icon ? ' icon-' + args.icon : '';
	return `<div class="callout${s}${palette}">
	<div class="callout-icon">
		<span aria-hidden="true" class="lucca-icon${icon}"></span>
	</div>
	<div class="callout-content">
		<div class="callout-content-description">
			<p>Feedback description</p>
		</div>
	</div>
</div>`;
}

const Template = (args: CalloutIconStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Icon: StoryObj<CalloutIconStory> = {
	args: { s: false, icon: 'signHelp', palette: '' },
	render: Template,
};
