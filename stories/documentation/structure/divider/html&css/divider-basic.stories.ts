import { Meta, StoryObj } from '@storybook/angular';

interface DividerBasicStory {
	size: string;
	content: string;
	role: boolean;
	icon: boolean;
	button: boolean;
	vertical: boolean;
}

export default {
	title: 'Documentation/Structure/Divider/HTML&CSS',
	argTypes: {
		content: {
			control: {
				type: 'text',
			},
		},
		size: {
			options: ['', 'S', 'M'],
			control: {
				type: 'select',
			},
		},
		role: {
			control: {
				type: 'boolean',
			},
			description: 'Permet de restituer Divider comme un séparateur natif (hr). Son éventuel contenu textuel ne sera alors plus restitué.',
		},
		button: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'icon', truthy: false },
		},
		icon: {
			control: {
				type: 'boolean',
			},
		},
		vertical: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: DividerBasicStory): string {
	const modVertical = args.vertical ? 'mod-vertical' : '';
	const modSize = args.size ? `mod-${args.size}` : '';

	if (args.button) {
		return `<div ${args.role ? 'role="separator"' : ''} class="divider ${modVertical} ${modSize}"><button class="button">${args.content}</button></div>`;
	} else if (args.icon) {
		return `<div ${args.role ? 'role="separator"' : ''} class="divider ${modVertical} ${modSize}"><span class="lucca-icon icon-heart" aria-hidden="true"></span></div>`;
	} else {
		if (args.content.length === 0 && args.role) {
			return `<hr class="divider ${modVertical} ${modSize}" />`;
		} else {
			return `<div ${args.role ? 'role="separator"' : ''} class="divider ${modVertical} ${modSize}">${args.content}</div>`;
		}
	}
}

const Template = (args: DividerBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host:has(.mod-vertical) {
			min-block-size: var(--pr-t-spacings-500);
			display: flex;
			justify-content: center;
		}
		`,
	],
});

export const Basic: StoryObj<DividerBasicStory> = {
	args: {
		content: 'Text',
		size: '',
		role: false,
		icon: false,
		button: false,
		vertical: false,
	},
	render: Template,
};
