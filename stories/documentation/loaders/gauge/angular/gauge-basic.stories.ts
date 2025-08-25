import { GaugeComponent } from '@lucca-front/ng/gauge';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface GaugeBasicStory {
	palette: string;
	thin: boolean;
	circular: boolean;
	value: number;
	alt: string;
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
	const circular = args.circular ? ` circular` : ``;
	const alt = args.alt !== '' ? ` alt="${args.alt}"` : ``;
	return `<lu-gauge${thin}${circular}${palette}${value}${alt} />`;
}

const Template: StoryFn<GaugeBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { palette: '', thin: false, circular: false, value: 33, alt: '' };
