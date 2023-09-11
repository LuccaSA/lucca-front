import { Meta, StoryFn } from '@storybook/angular';

interface BoxBasicStory {
	grey: boolean;
}

export default {
	title: 'Documentation/Feedback/Box/Basic',
	argTypes: {
		grey: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: BoxBasicStory): string {
	const grey = args.grey ? `mod-grey` : '';

	return `
	<div class="box ${grey}">
	    Jujubes toppin gvueoat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll. Pie gingerbread jelly beans cotton candy tart lollipop bonbon candy. Bonbon chocolate gingerbread pastry.
	</div>
	`;
}

const Template: StoryFn<BoxBasicStory> = (args: BoxBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
		}`,
		args.grey === false ? ':host { background-color: #F3F5FC; margin: -15px -15px; padding: 15px 15px; }' : '',
	],
});

export const Basic = Template.bind({});
Basic.args = { grey: false };
