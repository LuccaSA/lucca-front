import { Meta, StoryObj } from '@storybook/angular-vite';
import { KBD_ARG_TYPES, KBD_DECORATORS, KbdStory, OTHER, renderKbd } from './kbd.helpers';

export default {
	title: 'Documentation/Texts/Kbd/Angular/Combination',
	decorators: KBD_DECORATORS,
	argTypes: KBD_ARG_TYPES,
	render: renderKbd,
} as Meta<KbdStory>;

export const Combination: StoryObj<KbdStory> = {
	args: {
		modifiers: ['Control'],
		key: OTHER,
		otherKey: 'S',
		inDropdown: false,
	},
};
