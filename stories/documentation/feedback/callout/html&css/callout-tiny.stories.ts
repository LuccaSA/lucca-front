import { Meta, StoryFn } from '@storybook/angular';

interface CalloutTinyStory {
	s: boolean;
	palette: string;
	icon: string;
}

export default {
	title: 'Documentation/Feedback/Callout/HTML & CSS/Tiny',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
			description: 'Taille : Small',
		},
		palette: {
			options: ['', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'select',
			},
		},
		icon: {
			options: ['icon-signHelp', 'icon-signSuccess', 'icon-signWarning', 'icon-signError'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: CalloutTinyStory): string {
	const s = args.s ? ` mod-S` : '';
	let palette = args.palette;
	const icon = args.icon ? ' ' + args.icon : '';
	palette = ' ' + palette;
	return `<div class="callout mod-tiny${s}${palette}">
	<div class="callout-icon">
		<span aria-hidden="true" class="lucca-icon${icon}"></span>
	</div>
	<div class="callout-content">
		99
	</div>
</div>`;
}

const Template: StoryFn<CalloutTinyStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Tiny = Template.bind({});
Tiny.args = { s: false, icon: 'icon-signHelp', palette: '' };
