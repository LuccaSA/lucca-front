import { Meta, StoryFn } from '@storybook/angular';

interface CardsBasicStory {
	neutral: boolean;
	disabled: boolean;
	link: boolean;
}

export default {
	title: 'Documentation/Structure/Cards/Basic',
	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		link: {
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
	const neutral = args.neutral ? `mod-neutral` : ``;
	const disabled = args.disabled ? `is-disabled` : ``;
	const click = args.disabled ? `` : `onClick="console.log('action or navigation')"`;
	const linkOrButton = args.link
		? `<a href="#" class="card-title-action" onClick="event.preventDefault()">Titre de la carte</a>`
		: `<button type="button" class="card-title-action" onClick="event.preventDefault()">Titre de la carte</button>`;
	const action = args.disabled ? `Titre de la carte` : `${linkOrButton}`;
	return `<div class="card mod-action ${neutral} ${disabled}" ${click}>
	<div class="card-content">
		<h2 class="card-title">${action}</h2>
		<p>Contenu de la carte</p>
	</div>
</div>`;
}

const Template: StoryFn<CardsBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { disabled: false, neutral: false, link: false };
