import { BoxComponent } from '@lucca-front/ng/box';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Box/Angular/Basic',
	argTypes: {
		neutral: {
			description: 'Applique un fond gris.',
		},
		killable: {
			description: 'Ajoute un bouton de fermeture.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [BoxComponent],
		}),
	],
	render: ({ ...args }, { argTypes }) => {
		return {
			template: cleanupTemplate(`<lu-box ${generateInputs(args, argTypes)}>Lorem ipsum dolor sit amet</lu-box>`),
		};
	},
} as Meta;

export const Basic: StoryObj<BoxComponent> = {
	args: {
		neutral: false,
		killable: false,
	},
};
