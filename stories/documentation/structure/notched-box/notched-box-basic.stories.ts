import { Meta, Story } from '@storybook/angular';

interface NotchedBoxBasicStory {
	direction: string;
}

export default {
	title: 'Documentation/Structure/NotchedBox/Basic',
	argTypes: {
		direction: {
			options: ['mod-top', 'mod-bottom', 'mod-left', 'mod-right'],
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

function getTemplate(args: NotchedBoxBasicStory): string {
	const classes = [args.direction].filter(Boolean).join(' ');
	return `
	<div class="notchedBox ${classes}" [attr.style]="'
		--component-notchedbox-notch-position:' + notchPosition + '%;
		--component-notchedbox-notch-percent:' + notchPosition / 100 + ';
		--component-notchedbox-notch-width:' + notchWidth +'px;
		--component-notchedbox-notch-height:' + notchHeight + 'px;
		--component-notchedbox-notch-radius:' + notchOuterRadius + 'px;
		--component-notchedbox-notch-radius-inner:' + notchInnerRadius + 'px;
		--component-notchedbox-badge-width:' + badgeWidth + 'px;
		--component-notchedbox-badge-height:' + badgeHeight + 'px;
		--component-notchedbox-badge-radius:' + badgeRadius + 'px;
		--component-notchedbox-badge-offset:' + badgeOffset + 'px;
	'">
		<div class="notchedBox-badge"></div>
		<div class="notchedBox-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula lacinia nisl in maximus. Maecenas nec enim non nulla faucibus posuere.</div>
  	</div>
	`;
}

const Template: Story<NotchedBoxBasicStory> = (args: NotchedBoxBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.notchedBox {
			margin-top: 32px;
		}`,
	],
});

export const Basic = Template.bind({});
Basic.args = { direction: 'mod-top', notchPosition: 50, notchWidth: 70, notchHeight: 50, notchInnerRadius: 16, notchOuterRadius: 8, badgeWidth: 60, badgeHeight: 60, badgeRadius: 11, badgeOffset: 10 };
