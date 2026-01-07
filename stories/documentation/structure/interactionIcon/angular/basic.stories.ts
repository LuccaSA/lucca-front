//import { DecorativeIconComponent } from '@lucca-front/ng/';
import { IconsList } from '@/stories/icons-list';
import { InteractionIconComponent } from '@lucca-front/ng/interaction-icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Interaction icon/Angular/Basic',
	argTypes: {
		bubbleDirection: {
			options: ['auto', 'top', 'bottom', 'left', 'right'],
			control: {
				type: 'select',
			},
		},
		palette: {
			options: ['', 'cleemy', 'pagga', 'poplee', 'coreHR', 'cc', 'lucca'],
			control: {
				type: 'select',
			},
		},
		icon: {
			options: IconsList.filter((i) => !i.deprecated).map((i) => i.icon),
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [InteractionIconComponent],
		}),
	],
	render: ({ bubbleDirection, alt, palette, ...args }, { argTypes }) => {
		const bubbleDirectionArg = bubbleDirection === 'auto' ? `` : ` bubbleDirection="${bubbleDirection}"`;
		const altArg = alt === '' ? `` : ` alt="${alt}"`;
		const paletteClass = palette === '' ? `` : ` class="palette-${palette}"`;
		return {
			template: `<lu-interaction-icon${altArg}${paletteClass}${bubbleDirectionArg}${generateInputs(args, argTypes)} />`,
		};
	},
} as Meta;

export const Basic: StoryObj<InteractionIconComponent & { palette: string }> = {
	args: {
		icon: 'trash',
		alt: '',
		bubbleDirection: 'auto',
		palette: '',
	},
};
