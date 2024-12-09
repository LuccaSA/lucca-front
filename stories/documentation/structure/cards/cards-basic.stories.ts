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
			description: 'Deprecated 💀',
		},
	},
} as Meta;

function getTemplate(args: CardsBasicStory): string {
	const neutral = args.neutral ? `mod-neutral` : ``;
	const disabled = args.disabled ? `is-disabled` : ``;
	const click = args.disabled ? `` : `onClick="alert('action')"`;
	const propagation = args.disabled ? `` : `onClick="event.stopPropagation()"`;
	return `<div class="card mod-action ${neutral} ${disabled}" ${click}>
	<div class="card-content">
		<h2 class="card-title"><a href="#" class="card-title-action" ${propagation}>Titre de la carte</a></h2>
		<div>Contenu de la carte</div>
	</div>
</div>`;
}

const Template: StoryFn<CardsBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { disabled: false, neutral: false };
