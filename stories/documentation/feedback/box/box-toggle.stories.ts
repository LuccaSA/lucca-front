import { Meta, StoryFn } from '@storybook/angular';

interface BoxToggleStory {
	white: boolean;
}

export default {
	title: 'Documentation/Feedback/Box/Toggle',
	argTypes: {
		white: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: BoxToggleStory): string {
	const white = args.white ? `mod-white` : '';

	return `
	<div class="switch">
	    <input class="switch-input" type="checkbox" id="boxSwitch" checked disabled>
	    <label class="switch-label" for="boxSwitch">Switch</label>
	</div>
	<div class="box mod-toggle ${white}">
	    Jujubes toppin gvueoat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll. Pie gingerbread jelly beans cotton candy tart lollipop bonbon candy. Bonbon chocolate gingerbread pastry.
	</div>
	`;
}

const Template: StoryFn<BoxToggleStory> = (args: BoxToggleStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
		}`,
		args.white === false ? '' : ':host { background-color: #F3F5FC; margin: -15px -15px; padding: 15px 15px; }',
	],
});

export const Toggle = Template.bind({});
Toggle.args = { white: false };
