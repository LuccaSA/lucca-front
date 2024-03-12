import { Meta, StoryFn } from '@storybook/angular';

interface CardsBasicStory {
	clickable: boolean;
	neutral: boolean;
	disabled: boolean;
	elevated: boolean;
}

export default {
	title: 'Documentation/Structure/Cards/Basic',
	argTypes: {
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
		clickable: {
			control: {
				type: 'boolean',
			},
			description: 'Deprecated 🦕',
		},
		neutral: {
			control: {
				type: 'boolean',
			},
			description: 'Deprecated 🦕',
		},
	},
} as Meta;

function getTemplate(args: CardsBasicStory): string {
	const clickable = args.clickable ? `mod-clickable` : '';
	const neutral = args.neutral ? `mod-neutral` : '';
	const disabled = args.disabled ? `is-disabled` : '';
	const elevated = args.elevated ? `mod-elevated` : '';
	return `
	<div class="card ${clickable} ${neutral} ${disabled} ${elevated}">
		<div class="card-content">
			<h2 class="card-title">Titre de la carte</h2>
			<p>Contenu de la carte</p>
		</div>
	</div>
	`;
}

const Template: StoryFn<CardsBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { disabled: false, elevated: false, clickable: false, neutral: false };
