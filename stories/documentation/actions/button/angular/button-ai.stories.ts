import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Actions/Button/Angular/AI',
	decorators: [
		moduleMetadata({
			imports: [ButtonComponent, IconComponent],
		}),
	],
	argTypes: {
		icon: {
			options: ['weatherStars', 'officePenStar', 'bubbleStars'],
			control: {
				type: 'select',
			},
		},
	},
	render: ({ label, icon, altIcon, hiddenLabel }) => {
		const text = hiddenLabel && label ? `<span class="pr-u-mask">${label}</span>` : `${label}`;
		return {
			template: `<button type="button" luButton="AI">
	<lu-icon icon="${icon}" alt="${altIcon}" />
	${text}
</button>`,
		};
	},
} as Meta;

export const Basic: StoryObj<{ label: string; icon: string; altIcon: string; hiddenLabel: boolean }> = {
	args: {
		label: 'Reformuler',
		hiddenLabel: false,
		icon: 'officePenStar',
		altIcon: 'Assistant IA',
	},
};
