import { Meta, StoryFn } from '@storybook/angular';

interface StatusBadgeBasicStory {
	palette: string;
	l: boolean;
}

export default {
	title: 'Documentation/Texts/StatusBadge/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-product', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'select',
			},
		},
		l: {
			control: {
				type: 'boolean',
			},
			description: '[v16.2] Taille : Large',
		},
	},
} as Meta;

function getTemplate(args: StatusBadgeBasicStory): string {
	const l = args.l ? `mod-L` : '';
	return `<div class="statusBadge ${l} ${args.palette}">Status</div>`;
}

const Template: StoryFn<StatusBadgeBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { palette: '', l: false };
