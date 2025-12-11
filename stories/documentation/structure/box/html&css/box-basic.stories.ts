import { Meta, StoryObj } from '@storybook/angular';

interface BoxBasicStory {
	neutral: boolean;
}

export default {
	title: 'Documentation/Structure/Box/HTML&CSS/Basic',
	argTypes: {
		neutral: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: BoxBasicStory): string {
	const neutral = args.neutral ? `mod-neutral` : '';

	return `<div class="box ${neutral}">
		Jujubes toppin gvueoat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll. Pie gingerbread jelly beans cotton candy tart lollipop bonbon candy. Bonbon chocolate gingerbread pastry.
</div>`;
}

const Template = (args: BoxBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<BoxBasicStory> = {
	args: { neutral: false },
	render: Template,
};
