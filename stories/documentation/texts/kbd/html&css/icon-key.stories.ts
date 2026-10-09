import { Meta, StoryObj } from '@storybook/angular-vite';
import { KBD_ARG_TYPES, KBD_ARGS, kbdClass, KbdStory } from './kbd.helpers';

export default {
	title: 'Documentation/Texts/Kbd/HTML&CSS/Icon key',
	argTypes: KBD_ARG_TYPES,
	render: (args: KbdStory) => ({
		template: `<span class="${kbdClass(args)}"><kbd class="kbd"><span aria-hidden="true" class="lucca-icon icon-arrowTop mod-XXS"></span><span class="pr-u-mask">flèche haut</span></kbd></span>`,
	}),
} as Meta<KbdStory>;

export const IconKey: StoryObj<KbdStory> = {
	args: KBD_ARGS,
};
