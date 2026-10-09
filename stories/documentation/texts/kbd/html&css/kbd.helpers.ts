import { ArgTypes } from '@storybook/angular-vite';

/**
 * Shared by the HTML&CSS kbd stories, kept out of a `.stories.ts` file where every named export would be a story
 */

export interface KbdStory {
	pill: boolean;
	skeuo: boolean;
}

export const KBD_ARG_TYPES: ArgTypes<KbdStory> = {
	pill: {
		control: 'boolean',
		description: 'Touches rondes : `mod-pill`.',
	},
	skeuo: {
		control: 'boolean',
		description: 'Touches réalistes, au dessus légèrement creusé : `mod-skeuo`.',
	},
};

export const KBD_ARGS: KbdStory = { pill: false, skeuo: false };

/**
 * Classes of the wrapper, which carries the modifiers: a `span` around a single key, a `kbd` around a combination
 */
export function kbdClass({ pill, skeuo }: KbdStory): string {
	return `kbdWrapper${pill ? ' mod-pill' : ''}${skeuo ? ' mod-skeuo' : ''}`;
}
