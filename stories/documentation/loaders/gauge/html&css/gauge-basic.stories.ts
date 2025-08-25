import { Meta, StoryFn } from '@storybook/angular';

interface GaugeBasicStory {
	palette: string;
	thin: boolean;
	vertical: boolean;
	value: number;
}

export default {
	title: 'Documentation/Loaders/Gauge/HTML&CSS/Basic',
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
	const thin = args.thin ? ` mod-thin` : ``;
	const vertical = args.vertical ? ` mod-vertical` : ``;
	const palette = args.palette ? ` ${args.palette}` : ``;
	const value = args.value !== 0 ? ` [attr.style]="'--components-gauge-value: ${args.value}%'"` : ``;
	return `
	<div class="gauge${thin}${vertical}${palette}"${value}></div>
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
