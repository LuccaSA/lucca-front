import { TagComponent } from '@lucca-front/ng/tag';
import { Meta, StoryObj } from '@storybook/angular';
import { IconsList } from 'packages/icons/icons-list';
import { PaletteAllArgType } from 'stories/helpers/common-arg-types';

export default {
	title: 'Documentation/Texts/Tags/Angular/Basic',
	component: TagComponent,
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
		href: {
			type: 'string',
		},
		icon: {
			options: IconsList.map((i) => i.icon),
			control: {
				type: 'select',
			},
		},
	},

	args: {
		label: 'Text',
		size: 'M',
		palette: 'none',
		outlined: false,
		href: '',
		icon: null,
	},
};
