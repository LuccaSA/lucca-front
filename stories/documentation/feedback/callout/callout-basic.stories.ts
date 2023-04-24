import { Meta, Story } from '@storybook/angular';

interface CalloutBasicStory {
	palette: string;
	s: boolean;
}

export default {
	title: 'Documentation/Feedback/Callout/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'select',
			}
		},
		s: {
			control: {
				type: 'boolean',
			},
			description: "Taille : Small",
		},
	},
} as Meta;

function getTemplate(args: CalloutBasicStory): string {
	const classes = [args.palette].filter(Boolean).join(' ');
	const s = args.s ? `mod-S` : '';
	return `
	<div class="callout ${classes} ${s}">
		<div class="callout-content">
			<strong class="callout-content-title">Feedback or informations</strong>
			<div class="callout-content-description">Caesarem fama studio memorabili ut latius abscessere amplam Nebridius equitum. <a href="#">En savoir plus</a></div>
		</div>
	</div>
	`
}

const Template: Story<CalloutBasicStory> = (args: CalloutBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { palette: '', s: false };
