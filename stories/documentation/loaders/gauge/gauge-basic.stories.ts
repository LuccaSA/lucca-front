import { Meta, StoryFn } from '@storybook/angular';

interface GaugeBasicStory {
	palette: string;
	thin: boolean;
	vertical: boolean;
	value: number;
}

export default {
	title: 'Documentation/Loaders/Gauge/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-product', 'palette-neutral', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'select',
			},
		},
		vertical: {
			description: 'Deprecated 💀',
		},
		value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
		},
	},
} as Meta;

function getTemplate(args: GaugeBasicStory): string {
	const classes = ' ' + [args.palette].filter(Boolean).join(' ');
	const thin = args.thin ? ` mod-thin` : '';
	const vertical = args.vertical ? ` mod-vertical` : '';
	return `
	<div class="gauge${classes}${thin}${vertical}" [attr.style]="'--components-gauge-value: ${args.value}%'">
		<div class="gauge-bar"></div>
	</div>
	`;
}

const Template: StoryFn<GaugeBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
			block-size: 4rem;
		}`,
	],
});

export const Basic = Template.bind({});
Basic.args = { palette: '', thin: false, vertical: false, value: 33 };
