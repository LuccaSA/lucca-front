import { Meta, Story } from '@storybook/angular';

interface CardsActionStory {
	elevated: boolean;
}

export default {
	title: 'Documentation/Structure/Cards/Action',
	elevated: {
		control: {
			type: 'boolean',
		},
	},
} as Meta;

function getTemplate(args: CardsActionStory): string {
	const elevated = args.elevated ? `mod-elevated` : '';
	return `
	<div class="card mod-action ${elevated}">
		<div class="card-content">
			<h2 class="card-title">Titre de la carte</h2>
			<p>Contenu de la carte</p>
		</div>
		<div class="card-action">
			<button type="button" class="actionIcon" luTooltip="Modifier">
			  <span aria-hidden="true" class="lucca-icon icon-arrowRight"></span>
			  <span class="u-mask">Accéder</span>
			</button>
		</div>
	</div>
	`;
}

const Template: Story<CardsActionStory> = (args: CardsActionStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Action = Template.bind({});
Action.args = { elevated: false };
