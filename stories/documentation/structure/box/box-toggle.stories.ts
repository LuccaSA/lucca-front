import { Meta, StoryFn } from '@storybook/angular';

interface BoxToggleStory {
	grey: boolean;
}

export default {
	title: 'Documentation/Structure/Box/Toggle',
	argTypes: {
		grey: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: BoxToggleStory): string {
	const grey = args.grey ? `mod-grey` : '';

	return `
	<div class="switch">
	    <input class="switch-input" type="checkbox" id="boxSwitch" checked disabled>
	    <label class="switch-label" for="boxSwitch">Switch</label>
	</div>
	<div class="box mod-toggle ${grey}">
	    Jujubes toppin gvueoat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll. Pie gingerbread jelly beans cotton candy tart lollipop bonbon candy. Bonbon chocolate gingerbread pastry.
	</div>
	`;
}

const Template: StoryFn<BoxToggleStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
		}`,
		args.grey === true ? ':host { background-color: white; margin: -15px -15px; padding: 15px 15px; }' : '',
	],
});

export const Toggle = Template.bind({});
Toggle.args = { grey: false };
