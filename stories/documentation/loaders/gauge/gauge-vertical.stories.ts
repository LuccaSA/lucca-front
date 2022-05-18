import { Meta, Story } from '@storybook/angular';

interface GaugeVerticalStory {
	palette: string;
	thin: boolean;
}

export default {
	title: 'Documentation/Loaders/Gauge/Vertical',
	argTypes: {
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'select',
			},
		},
		thin: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: GaugeVerticalStory): string {
	const classes = [args.palette].filter(Boolean).join(' ');
	const thin = args.thin ? `mod-thin` : '';
	return `
	<div class="u-displayFlex" style="height: 100px">
		<div class="gauge mod-vertical ${classes} ${thin}">
			<div class="gauge-bar" style="height:50%"></div>
		</div>
	</div>
	`;
}

const Template: Story<GaugeVerticalStory> = (args: GaugeVerticalStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Vertical = Template.bind({});
Vertical.args = { palette: '', thin: false };
