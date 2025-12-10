import { Meta, StoryObj } from '@storybook/angular';

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
			description: 'Deprecated 💀',
		},
	},
} as Meta;

function getTemplate(args: CardsBasicStory): string {
	const neutral = args.neutral ? ` mod-neutral` : '';
	const disabled = args.disabled ? ` is-disabled` : '';
	return `<div class="card mod-action${neutral}${disabled}">
	<div class="card-content">
		<h3 class="card-title">Titre de la carte</h3>
		<p>Contenu de la carte</p>
	</div>
</div>`;
}

const Template = (args: CardsBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<CardsBasicStory> = {
	args: { disabled: false, neutral: false },
	render: Template,
};
