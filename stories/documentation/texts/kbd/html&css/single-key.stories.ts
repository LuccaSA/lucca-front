import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Texts/Kbd/HTML&CSS/Single key',
	render: () => ({
		template: `<span class="kbdWrapper"><kbd class="kbd">Échap</kbd></span>`,
	}),
} as Meta;

export const SingleKey: StoryObj = {};
