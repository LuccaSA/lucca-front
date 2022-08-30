import { Meta, Story } from '@storybook/angular';

interface BoxKillableStory {
	grey: boolean;
}

export default {
	title: 'Documentation/Feedback/Box/Killable',
	argTypes: {
		grey: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: BoxKillableStory): string {
	const grey = args.grey ? `mod-grey` : '';

	return `
	<div class="box ${grey}">
	    <div class="box-close">
	        <button type="button" class="actionIcon">
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
		args.grey === false
			? ':host { background-color: #F3F5FC; margin: -15px -15px; padding: 15px 15px; }'
			: ''
	],
});

export const Killable = Template.bind({});
Killable.args = { grey: false };
