import { Meta, Story } from '@storybook/angular';

interface GaugeBasicStory {
	palette: string;
	thin: boolean;
	vertical: boolean;
}

export default {
	title: 'Documentation/Loaders/Gauge/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'radio',
			},
		},
		thin: {
			control: {
				type: 'boolean',
			},
		},
		vertical: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: GaugeBasicStory): string {
	const classes = [args.palette].filter(Boolean).join(' ');
	const thin = args.thin ? `mod-thin` : '';
	const vertical = args.vertical ? `mod-vertical` : '';
	return `
	<div style="height: 10rem">
		<div class="gauge ${classes} ${thin} ${vertical}">
			<div class="gauge-bar" style="width:33%; height: 33%"></div>
		</div>
	</div>
	`;
}

const Template: Story<GaugeBasicStory> = (args: GaugeBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { palette: '', thin: false, vertical: false };
