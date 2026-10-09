import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Texts/Kbd/HTML&CSS/Icon key',
	render: () => ({
		template: `<span class="kbdWrapper"><kbd class="kbd"><span aria-hidden="true" class="lucca-icon icon-arrowTop mod-XXS"></span><span class="pr-u-mask">flèche haut</span></kbd></span>`,
	}),
} as Meta;

export const IconKey: StoryObj = {};
