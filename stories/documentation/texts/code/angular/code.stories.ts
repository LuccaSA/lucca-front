import { CodeComponent } from '@lucca-front/ng/code';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface CodeBasicStory {
	block: boolean;
	content: string;
}

export default {
	title: 'Documentation/Texts/Code/Angular/Basic',
	argTypes: {
		block: {
			type: 'boolean',
			description: 'Permet un affichage sur plusieurs lignes.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [CodeComponent],
		}),
	],
	render: (args: CodeBasicStory) => {
		const blockParam = args.block ? ` block` : ``;
		return {
			template: cleanupTemplate(`<lu-code${blockParam}>psum dolor sit</lu-code>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		block: false,
	},
};
