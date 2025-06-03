import { BoxComponent } from '@lucca-front/ng/box';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface BoxBasicStory {
	content: string;
	toggle: boolean;
	neutral: boolean;
	killable: boolean;
}

export default {
	title: 'Documentation/Structure/Box/Angular/Basic',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [BoxComponent],
		}),
	],
	render: (args: BoxBasicStory) => {
		const toggleParam = args.toggle ? `toggle` : ``;
		const neutralParam = args.neutral ? `neutral` : ``;
		const killableParam = args.killable ? `killable` : ``;
		return {
			template: cleanupTemplate(`<lu-box ${toggleParam} ${neutralParam} ${killableParam}>${args.content}</lu-box>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		content: 'Lorem ipsum dolor sit amet.',
		toggle: false,
		neutral: false,
		killable: false,
	},
};
