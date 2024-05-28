import { Meta, StoryFn } from '@storybook/angular';

interface NotchBoxBasicStory {
	direction: string;
}

export default {
	title: 'Documentation/Structure/NotchBox/Basic',
	argTypes: {
		direction: {
			options: ['mod-notchTop', 'mod-notchLeft', 'mod-notchBottom', 'mod-notchRight'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: NotchBoxBasicStory): string {
	const classes = [args.direction].filter(Boolean).join(' ');
	return `
	<div class="notchBox ${classes}">
		<div class="notchBox-badge"></div>
		<div class="notchBox-wrapper">
			<div class="notchBox-wrapper-content">
				<strong>Basic use of notchBox</strong><br/>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula lacinia nisl in maximus. 
				Maecenas nec enim non nulla faucibus posuere.Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
				Maecenas vehicula lacinia nisl in maximus. Maecenas nec enim non nulla faucibus posuere.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula lacinia nisl in maximus. 
				Maecenas nec enim non nulla faucibus posuere.Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
				Maecenas vehicula lacinia nisl in maximus. Maecenas nec enim non nulla faucibus posuere.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula lacinia nisl in maximus.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula lacinia nisl in maximus.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula lacinia nisl in maximus.
			</div>
		</div>
  	</div>
	`;
}

const Template: StoryFn<NotchBoxBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.notchBox {
			margin: 32px;
		}`,
	],
});

export const Basic = Template.bind({});
Basic.args = { direction: 'mod-notchTop' };
