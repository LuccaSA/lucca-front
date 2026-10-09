import { Meta, StoryObj } from '@storybook/angular-vite';
import { KBD_ARG_TYPES, KBD_DECORATORS, KbdStory, renderKbd } from './kbd.helpers';

export default {
	title: 'Documentation/Texts/Kbd/Angular/Single key',
	decorators: KBD_DECORATORS,
	argTypes: {
		...KBD_ARG_TYPES,
		modifiers: { ...KBD_ARG_TYPES['modifiers'], table: { disable: true } },
		key: { ...KBD_ARG_TYPES['key'], name: 'keys' },
	},
	render: renderKbd,
} as Meta<KbdStory>;

export const SingleKey: StoryObj<KbdStory> = {
	args: {
		modifiers: [],
		key: 'Escape',
		otherKey: 'S',
		inDropdown: false,
	},
};
