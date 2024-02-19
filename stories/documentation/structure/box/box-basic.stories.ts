import { Meta, StoryFn } from '@storybook/angular';

interface BoxBasicStory {
	neutral: boolean;
}

export default {
	title: 'Documentation/Structure/Box/Basic',
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

	return `
	<div class="box ${neutral}">
	    Jujubes toppin gvueoat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll. Pie gingerbread jelly beans cotton candy tart lollipop bonbon candy. Bonbon chocolate gingerbread pastry.
	</div>
	`;
}

const Template: StoryFn<BoxBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
		}`,
		args.neutral === false ? ':host { background-color: #F3F5FC; margin: -15px -15px; padding: 15px 15px; }' : '',
	],
});

export const Basic = Template.bind({});
Basic.args = { neutral: false };
