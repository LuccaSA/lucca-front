import { GaugeComponent } from '@lucca-front/ng/gauge';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface GaugeBasicStory {
	palette: string;
	thin: boolean;
	value: number;
}

export default {
	title: 'Documentation/Loaders/Gauge/Angular/Basic',
	argTypes: {
		palette: {
			options: ['', 'product', 'neutral', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
		},
		value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [GaugeComponent],
		}),
	],
} as Meta;

function getTemplate(args: GaugeBasicStory): string {
	const thin = args.thin ? ` thin` : ``;
	const palette = args.palette ? ` palette="${args.palette}"` : ``;
	const value = args.value !== 0 ? ` value="${args.value}"` : ``;
	return `
	<lu-gauge${thin}${palette}${value} />
	`;
}

const Template: StoryFn<GaugeBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { palette: '', thin: false, value: 33 };
