import { IconsList } from '@lucca-front/icons/icons-list';
import { TagComponent } from '@lucca-front/ng/tag';
import { Meta, StoryObj } from '@storybook/angular';
import { HiddenArgType, PaletteAllArgType } from 'stories/helpers/common-arg-types';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Texts/Tags/Angular/Basic',
	component: TagComponent,
	render: (args, context) => {
		return {
			template: `<lu-tag${generateInputs(args, context.argTypes)} />`,
		};
	},
} as Meta;

export const Template: StoryObj<TagComponent> = {
	argTypes: {
		size: {
			options: ['S', 'M', 'L'],
			control: {
				type: 'select',
			},
		},
		palette: PaletteAllArgType,
		outlined: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'AI', truthy: false },
		},
		icon: {
			options: IconsList.map((i) => i.icon),
			control: {
				type: 'select',
			},
		},
		link: HiddenArgType,
	},

	args: {
		label: 'Text',
		palette: null,
		outlined: false,
		icon: null,
		withEllipis: false,
		AI: false,
	},
};
