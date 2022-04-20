import { Meta, Story } from '@storybook/angular';

interface BoxToggleStory {
	mod: string;
}

export default {
	title: 'Documentation/Feedback/Box/Toggle',
	argTypes: {
		mod: {
			options: ['', 'mod-grey'],
			control: {
				type: 'radio',
			}
		},
	},
} as Meta;

function getTemplate(args: BoxToggleStory): string {
	const classes = [args.mod].filter(Boolean).join(' ');

	return `
	<div class="switch">
	    <input class="switch-input" type="checkbox" id="boxSwitch" checked disabled>
	    <label class="switch-label" for="boxSwitch">Switch</label>
	</div>
	<div class="box ${classes}">
	    Jujubes toppin gvueoat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll. Pie gingerbread jelly beans cotton candy tart lollipop bonbon candy. Bonbon chocolate gingerbread pastry.
	</div>
	`
}

const Template: Story<BoxToggleStory> = (args: BoxToggleStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`
		:host {
			display: block;
		}`,
		args.mod === ''
			? ':host { background-color: #F3F5FC; margin: -30px -20px; padding: 30px 20px; }'
			: ''
	],
});

export const Toggle = Template.bind({});
Toggle.args = { mod: '' };
