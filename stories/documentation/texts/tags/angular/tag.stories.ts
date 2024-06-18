import { TagComponent } from '@lucca-front/ng/tag';
import { Meta, StoryObj } from '@storybook/angular';
import { IconsList } from 'packages/icons/icons-list';
import { HiddenArgType, PaletteAllArgType } from 'stories/helpers/common-arg-types';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Texts/Tags/Angular/Basic',
	component: TagComponent,
	render: (args, context) => {
		return {
			template: `<lu-tag ${generateInputs(args, context.argTypes)}></lu-tag>`,
		};
	},
} as Meta;

export const Template: StoryObj<TagComponent> = {
	argTypes: {
		label: {
			type: 'string',
		},
		size: {
			options: ['M', 'L'],
			control: {
				type: 'radio',
			},
		},
		palette: PaletteAllArgType,
		outlined: {
			control: {
				type: 'boolean',
			},
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
		size: 'M',
		palette: null,
		outlined: false,
		icon: null,
	},
};
