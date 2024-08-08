import { Meta, StoryFn } from '@storybook/angular';

interface CardsBasicStory {
	neutral: boolean;
	disabled: boolean;
}

export default {
	title: 'Documentation/Structure/Cards/Basic',
	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
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
	const neutral = args.neutral ? `mod-neutral` : '';
	const disabled = args.disabled ? `is-disabled` : '';
	return `
	<div class="card mod-action ${neutral} ${disabled}">
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
Basic.args = { disabled: false, neutral: false };
