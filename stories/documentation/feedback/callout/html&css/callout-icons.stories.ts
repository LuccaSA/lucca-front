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

function getTemplate(args: CalloutIconStory): string {
	const s = args.s ? ` mod-S` : '';
	let palette = args.palette;
	const icon = args.icon ? ' ' + args.icon : '';
	let text: { title: string; description: string };
	switch (args.palette) {
		case 'palette-success':
			text = { title: 'Cool!', description: 'Je suis un callout de succès :)' };
			break;
		case 'palette-warning':
			text = { title: 'Hmmm...', description: "Je suis un callout d'alarme :|" };
			break;
		case 'palette-error':
			text = { title: 'Oops!', description: "Je suis un callout d'erreur :(" };
			break;
		default:
			text = { title: "Besoin d'aide ?", description: 'Je suis un callout standard' };
			break;
	}
	palette = ' ' + palette;
	return `<div class="callout${s}${palette}">
	<div class="callout-icon">
		<span aria-hidden="true" class="lucca-icon${icon}"></span>
	</div>
	<div class="callout-content">
		<strong class="callout-content-title">${text.title}</strong>
		<div class="callout-content-description">${text.description}</div>
	</div>
</div>`;
}

const Template: StoryFn<CalloutIconStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Icon = Template.bind({});
Icon.args = { s: false, icon: 'icon-signHelp', palette: '' };
