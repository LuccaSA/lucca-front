import { Meta, StoryObj } from '@storybook/angular-vite';
import { KBD_ARG_TYPES, KBD_ARGS, kbdClass, KbdStory } from './kbd.helpers';

export default {
	title: 'Documentation/Texts/Kbd/HTML&CSS/Single key',
	argTypes: KBD_ARG_TYPES,
	render: (args: KbdStory) => ({
		template: `<span class="${kbdClass(args)}"><kbd class="kbd">Échap</kbd></span>`,
	}),
} as Meta<KbdStory>;

export const SingleKey: StoryObj<KbdStory> = {
	args: KBD_ARGS,
};
