import { Meta, Story } from '@storybook/angular';

interface BoxBasicStory {
	mod: string;
}

export default {
	title: 'Documentation/Feedback/Box/Basic',
	argTypes: {
		mod: {
			options: ['', 'mod-grey'],
			control: {
				type: 'radio',
			}
		},
	},
} as Meta;

function getTemplate(args: BoxBasicStory): string {
	const classes = [args.mod].filter(Boolean).join(' ');

	return `
	<div class="box ${classes}">
	    Jujubes toppin gvueoat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll. Pie gingerbread jelly beans cotton candy tart lollipop bonbon candy. Bonbon chocolate gingerbread pastry.
	</div>
	`
}

const Template: Story<BoxBasicStory> = (args: BoxBasicStory) => ({
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

export const Basic = Template.bind({});
Basic.args = { mod: '' };
