import { Meta, StoryFn } from '@storybook/angular';

interface CardsBasicStory {
	clickable: boolean;
	grey: boolean;
	disabled: boolean;
	elevated: boolean;
}

export default {
	title: 'Documentation/Structure/Cards/Basic',
	clickable: {
		control: {
			type: 'boolean',
		},
	},
	grey: {
		control: {
			type: 'boolean',
		},
	},
	disabled: {
		control: {
			type: 'boolean',
		},
	},
	elevated: {
		control: {
			type: 'boolean',
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
			<h2>Titre de la carte</h2>
			<p>Contenu de la carte</p>
		</div>
	</div>
	`;
}

const Template: StoryFn<CardsBasicStory> = (args: CardsBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { clickable: false, grey: false, disabled: false, elevated: false };
