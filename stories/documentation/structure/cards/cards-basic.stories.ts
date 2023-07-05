import { Meta, Story } from '@storybook/angular';

interface CardsBasicStory {
	clickable: boolean;
	grey: boolean;
	disabled: boolean;
	elevated: boolean;
}

export default {
	title: 'Documentation/Structure/Cards/Basic',
		argTypes: {
			disabled: {
				control: {
					type: 'boolean',
				}
			},
			elevated: {
				control: {
					type: 'boolean',
				}
			},
			clickable: {
				control: {
					type: 'boolean',
				},
				description: 'Deprecated 🦕',
			},
			grey: {
				control: {
					type: 'boolean',
				},
				description: 'Deprecated 🦕',
			},
		},
} as Meta;

function getTemplate(args: CardsBasicStory): string {
	const clickable = args.clickable ? `mod-clickable` : '';
	const grey = args.grey ? `mod-grey` : '';
	const disabled = args.disabled ? `is-disabled` : '';
	const elevated = args.elevated ? `mod-elevated` : '';
	return `
	<div class="card ${clickable} ${grey} ${disabled} ${elevated}">
		<div class="card-content">
			<h2 class="card-title">Titre de la carte</h2>
			<p>Contenu de la carte</p>
		</div>
	</div>
	`;
}

const Template: Story<CardsBasicStory> = (args: CardsBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { disabled: false, elevated: false, clickable: false, grey: false, };
