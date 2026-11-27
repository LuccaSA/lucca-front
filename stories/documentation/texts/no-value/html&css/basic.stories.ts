import { Meta, StoryObj } from '@storybook/angular-vite';

interface NoValueBasicStory {}

export default {
	title: 'Documentation/Texts/NoValue/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

export const Basic: StoryObj<NoValueBasicStory> = {
	args: {},
	render: () => ({
		template: `<span aria-hidden="true" data-content-before="—"></span><span class="pr-u-mask">Non renseigné</span>`,
	}),
};
