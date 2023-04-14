import { Meta, Story } from '@storybook/angular';

interface NotchBoxAdvancedStory {
	direction: string;
}

export default {
	title: 'Documentation/Structure/NotchBox/Advanced',
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
				max: 100,
				step: 1,
			},
		},
		notchWidth: {
			control: {
				type: 'range',
				min: 0,
				max: 200,
				step: 1,
			},
		},
		notchHeight: {
			control: {
				type: 'range',
				min: 0,
				max: 200,
				step: 1,
			},
		},
		notchInnerRadius: {
			control: {
				type: 'range',
				min: 0,
				max: 32,
				step: 1,
			},
		},
		notchOuterRadius: {
			control: {
				type: 'range',
				min: 0,
				max: 32,
				step: 1,
			},
		},
		badgeWidth: {
			control: {
				type: 'range',
				min: 0,
				max: 200,
				step: 1,
			},
		},
		badgeHeight: {
			control: {
				type: 'range',
				min: 0,
				max: 200,
				step: 1,
			},
		},
		badgeRadius: {
			control: {
				type: 'range',
				min: 0,
				max: 32,
				step: 1,
			},
		},
		badgeOffset: {
			control: {
				type: 'range',
				min: 0,
				max: 100,
				step: 1,
			},
		},
	},
} as Meta;

function getTemplate(args: NotchBoxAdvancedStory): string {
	const classes = [args.direction].filter(Boolean).join(' ');
	return `
	<div class="notchBox ${classes}" [attr.style]="'
		--component-notchbox-notch-position:' + notchPosition + '%;
		--component-notchbox-notch-percent:' + notchPosition / 100 + ';
		--component-notchbox-notch-width:' + notchWidth +'px;
		--component-notchbox-notch-height:' + notchHeight + 'px;
		--component-notchbox-notch-radius:' + notchOuterRadius + 'px;
		--component-notchbox-notch-radius-inner:' + notchInnerRadius + 'px;
		--component-notchbox-badge-width:' + badgeWidth + 'px;
		--component-notchbox-badge-height:' + badgeHeight + 'px;
		--component-notchbox-badge-radius:' + badgeRadius + 'px;
		--component-notchbox-badge-offset:' + badgeOffset + 'px;
	'">
		<div class="notchBox-badge"></div>
		<div class="notchBox-wrapper">
			<div class="notchBox-wrapper-content">
				<h2 class="u-h3">Advanced use of notchBox : manual override of default(s) parameter(s)</h2>
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

const Template: Story<NotchBoxAdvancedStory> = (args: NotchBoxAdvancedStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.notchBox {
			margin: 32px;
		}`,
	],
});

export const Advanced = Template.bind({});
Advanced.args = { direction: 'mod-notchTop', notchPosition: 50, notchWidth: 56, notchHeight: 24, notchInnerRadius: 18, notchOuterRadius: 8, badgeWidth: 48, badgeHeight: 48, badgeRadius: 14, badgeOffset: 17 };
