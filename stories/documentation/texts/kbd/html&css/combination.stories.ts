import { Meta, StoryObj } from '@storybook/angular-vite';
import { KBD_ARG_TYPES, KBD_ARGS, kbdClass, KbdStory } from './kbd.helpers';

export default {
	title: 'Documentation/Texts/Kbd/HTML&CSS/Combination',
	argTypes: KBD_ARG_TYPES,
	render: (args: KbdStory) => ({
		template: `<kbd class="${kbdClass(args)}"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">S</kbd></kbd>`,
	}),
} as Meta<KbdStory>;

export const Combination: StoryObj<KbdStory> = {
	args: KBD_ARGS,
};
