import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Texts/Kbd/HTML&CSS/Combination',
	render: () => ({
		template: `<kbd class="kbdWrapper"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">S</kbd></kbd>`,
	}),
} as Meta;

export const Combination: StoryObj = {};
