import { Meta, Story } from '@storybook/angular';

interface BoxKillableStory {
	mod: string;
}

export default {
	title: 'SCSS/Box/Killable',
	argTypes: {
		mod: {
			options: ['', 'mod-grey'],
			control: {
				type: 'radio',
			}
		},
	},
} as Meta;

function getTemplate(args: BoxKillableStory): string {
	const classes = [args.mod].filter(Boolean).join(' ');

	return `
	<div class="box ${classes}">
	    <div class="box-close">
	        <button class="actionIcon">
	            <span aria-hidden="true" class="lucca-icon">cross</span>
	            <span class="u-mask">Close</span>
	        </button>
	    </div>
	    Jujubes toppin gvueoat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll. Pie gingerbread jelly beans cotton candy tart lollipop bonbon candy. Bonbon chocolate gingerbread pastry.
	</div>
	`
}

const Template: Story<BoxKillableStory> = (args: BoxKillableStory) => ({
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

export const Killable = Template.bind({});
Killable.args = { mod: '' };
