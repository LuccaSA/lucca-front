import { Meta, Story } from '@storybook/angular';

interface CalloutIconStory {
	s: boolean;
	palette: string;
	icon: string;
}

export default {
	title: 'Documentation/Feedback/Callout/Icon',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
			description: "Taille : Small",
		},
		palette: {
			options: ['', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'select',
			},
		},
		icon: {
			options: ['icon-help', 'icon-success', 'icon-warning', 'icon-error'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: CalloutIconStory): string {
	const s = args.s ? `mod-S` : '';
	const palette = args.palette;
	const icon = args.icon;
	let text: {title: string, description: string};
	switch (args.palette) {
		case 'palette-success':
				text = {title: 'Cool!', description: 'Je suis un callout de succès :)'};
				break;
		case 'palette-warning':
				text = {title: 'Hmmm...', description: 'Je suis un callout d\'alarme :|'};
				break;
		case 'palette-error':
				text = {title: 'Oops!', description: 'Je suis un callout d\'erreur :('};
				break;
		default:
			text = {title: 'Besoin d\'aide ?', description: 'Je suis un callout standard'};
			break;
  };
	return `
	<div class="callout mod-icon ${s} ${palette}">
		<div class="callout-icon">
			<span aria-hidden="true" class="lucca-icon ${icon}"></span>
		</div>
		<strong class="callout-title">${text.title} </strong> ${text.description}
	</div>
	`
}

const Template: Story<CalloutIconStory> = (args: CalloutIconStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Icon = Template.bind({});
Icon.args = { s: false, icon: 'icon-help', palette: '' };
