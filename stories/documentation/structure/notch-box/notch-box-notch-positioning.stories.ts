import { Meta, Story } from '@storybook/angular';

interface NotchBoxNotchPositioningStory {
	direction: string;
}

export default {
	title: 'Documentation/Structure/NotchBox/NotchPositioning',
	argTypes: {
		direction: {
			options: ['mod-notchTop', 'mod-notchLeft', 'mod-notchBottom', 'mod-notchRight'],
			control: {
				type: 'select',
			},
		},
		notchPosition: {
			control: {
				type: 'range',
				min: 0,
				max: 400,
				step: 1,
			},
		},
	},
} as Meta;

function getTemplate(args: NotchBoxNotchPositioningStory): string {
	const classes = [args.direction].filter(Boolean).join(' ');
	return `
	<div class="notchBox ${classes}" [attr.style]="'
		--component-notchbox-notch-position:' + notchPosition + 'px;
		--component-notchbox-notch-percent: unset;
	'">
		<div class="notchBox-badge"></div>
		<div class="notchBox-wrapper">
			<div class="notchBox-wrapper-content">
				<strong>Notch can be positionned by using a finite, fixed unit (px, em, rem...) instead of the default % positionning</strong><br/>
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

const Template: Story<NotchBoxNotchPositioningStory> = (args: NotchBoxNotchPositioningStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.notchBox {
			margin: 32px;
		}`,
	],
});

export const NotchPositioning = Template.bind({});
NotchPositioning.args = { direction: 'mod-notchTop', notchPosition: 60 };
